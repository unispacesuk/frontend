<template>
  <Modal
    :title="'Editing: ' + state.room.title"
    @close-modal="onModalClose"
    class="edit-room-modal"
  >
    <div class="form-row mt-3">
      <Label label="Room Title" />
      <Input :input-value="state.room.title" @input-change="onInputChange" />
    </div>

    <div class="form-row mt-3">
      <div class="flex space-x-2 items-center" v-if="state.room.permission !== 'admin'">
        <div>Private room?</div>
        <Toggle :checked="state.isPrivate" @toggle-change="onToggleChange" />
      </div>
    </div>

    <div class="actions mt-3">
      <ButtonActionCancel @button-click="onClickDelete" :disabled="state.isSaving">
        Delete
      </ButtonActionCancel>
      <div class="flex space-x-2">
        <ButtonActionCancel @button-click="onModalClose" :disabled="state.isSaving">
          Cancel
        </ButtonActionCancel>
        <ButtonActionPrimary
          @button-click="onClickSave"
          :disabled="state.isSaving"
          class="flex space-x-2"
        >
          <div>Submit</div>
          <Spinner v-if="state.isSaving" class="w-5" />
        </ButtonActionPrimary>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { computed, inject, reactive } from 'vue';
  import { updateRoom } from '../../Services/Rooms/RoomsService';
  import { useRouter } from 'vue-router';
  import { IBus } from '../../Interfaces/IBus';
  import Modal from '../Modal/Modal.vue';
  import Label from '../Form/Label.vue';
  import Input from '../Form/Input.vue';
  import Toggle from '../Buttons/Toggle.vue';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const router = useRouter();
  const $bus = inject<IBus>('$bus');

  const props = defineProps<{
    room: any;
  }>();

  const emits = defineEmits<{
    (event: 'action:close'): void;
    (event: 'action:delete'): void;
    (event: 'action:update', data: string): void;
  }>();

  const state: any = reactive({
    room: computed(() => props.room),
    isPrivate: computed(() => state.room.status === 'private'),
    isUpdating: false,
    newRoomData: {
      title: '',
      status: false,
    },
  });

  function onModalClose() {
    return emits('action:close');
  }

  function onInputChange(value: string) {
    state.newRoomData.title = value;
  }

  function onToggleChange(value: boolean) {
    state.newRoomData.status = value ? 'private' : 'public';
  }

  function onClickDelete() {
    return emits('action:delete');
  }

  function onClickSave() {
    state.isSaving = true;

    const data = {
      title: state.newRoomData.title || state.room.title,
      status: state.newRoomData.status || state.room.status,
    };

    updateRoom(state.room.id, data)
      .then(() => {
        $bus?.emit('add-toast', 'Room updated.', 'success');
        state.isSaving = false;
        state.room.title = data.title;
        state.room.status = data.status;
        return emits('action:update', data.status);
      })
      .catch(() => {
        state.isSaving = false;
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  defineExpose({ state, onModalClose, onInputChange, onToggleChange, onClickDelete, onClickSave });
</script>

<style scoped lang="scss">
  .edit-room-modal {
    .form-row {
      @apply flex flex-col;
    }

    .actions {
      @apply flex justify-between;
    }
  }
</style>
