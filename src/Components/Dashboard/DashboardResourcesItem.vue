<template>
  <div class="resource-file-item-shadow">
    <div class="resource-file-item smooth-fast">
      <div class="name">{{ file.name }}</div>
      <div class="filename">{{ file.filename }}</div>
      <div class="date">
        <span class="date__uploaded">Uploaded on:</span>
        <span class="date__when">{{ moment(file.created_at).format('MMM Do YYYY') }}</span>
      </div>
      <div class="actions">
        <TrashIcon class="icon smooth-fast" @click="onClickDelete" />
        <ShareIcon class="icon smooth-fast" @click="onClickCopy" />
        <DownloadIcon class="icon smooth-fast" @click="onClickDownload" />
      </div>
    </div>
  </div>

  <Modal title="Delete resource" v-if="state.deleteConfirm" @close-modal="onClickDeleteCancel">
    <div class="mt-4 px-3">Do you really want to delete this resource file?</div>
    <div class="actions">
      <ButtonActionCancel @button-click="onClickDeleteCancel" :disable="state.isDeleting">
        Cancel
      </ButtonActionCancel>
      <ButtonActionPrimary @button-click="onClickConfirmDelete" :disable="state.isDeleting">
        <div>Delete</div>
        <Spinner v-if="state.isDeleting" />
      </ButtonActionPrimary>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { computed, inject, reactive } from 'vue';
  import { ShareIcon, DownloadIcon, TrashIcon } from '@heroicons/vue/solid';
  import { deleteResourceFile } from '../../Services/Resources/ResourcesService';
  import { IBus } from '../../Interfaces/IBus';
  import Modal from '../Modal/Modal.vue';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import moment from 'moment';

  const $bus = inject<IBus>('$bus');
  const resourceBase = inject('resourceBase');

  const props = defineProps<{
    file: any;
  }>();

  const state = reactive({
    file: computed(() => props.file),
    deleteConfirm: false,
    isDeleting: false,
  });

  const emits = defineEmits<{
    (event: 'action:delete', data: any): void;
  }>();

  function onClickDelete() {
    return (state.deleteConfirm = true);
  }

  function onClickDeleteCancel() {
    return (state.deleteConfirm = false);
  }

  function onClickConfirmDelete() {
    state.isDeleting = true;
    deleteResourceFile(state.file._id)
      .then(() => {
        $bus?.emit('add-toast', 'Resource file deleted.', 'success');
        state.isDeleting = false;
        onClickDeleteCancel();
        emits('action:delete', state.file._id);
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong', 'error');
      });
  }

  function onClickDownload() {
    window.open(`${resourceBase}${state.file.filename}`, '_blank');
  }

  function onClickCopy() {
    navigator.clipboard.writeText(`${resourceBase}${state.file.filename}`).then(() => {
      $bus?.emit('add-toast', 'URL copied to clipboard. Now share it.', 'success');
    });
  }

  defineExpose({ state, onClickDeleteCancel, onClickConfirmDelete, onClickDelete, onClickCopy });
</script>

<style scoped lang="scss">
  .resource-file-item-shadow {
    @apply relative bg-gray-600 rounded-md z-10 h-auto;
  }

  .resource-file-item {
    @apply w-auto bg-white border border-black rounded-md py-3 px-3 relative z-20 absolute w-full h-full flex flex-col space-y-2;

    .name {
      @apply font-bold whitespace-nowrap overflow-ellipsis overflow-hidden;
    }

    .filename {
      @apply text-sm font-light whitespace-nowrap overflow-ellipsis overflow-hidden;
    }

    .date {
      @apply flex flex-col;

      &__uploaded {
        @apply text-sm text-gray-400;
      }

      &__when {
        @apply text-sm font-bold;
      }
    }
  }

  .actions {
    @apply mt-4 flex space-x-2 px-3 justify-end;

    .icon {
      @apply bg-gray-100 px-2 py-1 w-9 rounded-md text-$accent hover:text-$action-hover cursor-pointer;
    }
  }

  .resource-file-item:hover {
    @apply transform -translate-x-1 -translate-y-1;
  }
</style>
