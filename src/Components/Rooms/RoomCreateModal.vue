<template>
  <Modal class="create-room" title="Create a new Private Room" @close-modal="onCloseModal">
    <div class="form-row mt-3">
      <Label label="Room Name" />
      <Input @input-change="onInputChange" />
    </div>

    <div class="form-row mt-3">
      <div class="flex space-x-2 items-center">
        <div>Private room?</div>
        <Toggle :checked="state.isPrivate" @toggle-change="onToggleChange" />
      </div>
    </div>

    <div class="actions">
      <ButtonActionCancel v-if="!state.isSubmitting" @button-click="onCloseModal">
        Cancel
      </ButtonActionCancel>
      <ButtonActionPrimary
        class="flex space-x-2"
        :disabled="state.isSubmitting"
        @button-click="onSubmitClick"
      >
        <div>Submit</div>
        <Spinner v-if="state.isSubmitting" class="w-5" />
      </ButtonActionPrimary>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { createRoom } from '../../Services/Rooms/RoomsService';
  import { IBus } from '../../Interfaces/IBus';
  import Modal from '../Modal/Modal.vue';
  import Input from '../Form/Input.vue';
  import Label from '../Form/Label.vue';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import Toggle from '../Buttons/Toggle.vue';

  const $bus = inject<IBus>('$bus');

  const state = reactive({
    isSubmitting: false,
    title: '',
    isPrivate: false,
  });

  const emits = defineEmits<{
    (event: 'action:close'): void;
    (event: 'action:create', data: any): void;
  }>();

  function onCloseModal() {
    // run some reset stuff in here...
    return emits('action:close');
  }

  function onInputChange(value: string) {
    state.title = value;
  }

  function onSubmitClick() {
    if (!state.title) return;

    state.isSubmitting = true;

    const data = {
      title: state.title,
      status: state.isPrivate ? 'private' : 'public',
    };

    createRoom(data)
      .then((data) => {
        state.isSubmitting = false;
        emits('action:create', data.response);
        return onCloseModal();
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        state.isSubmitting = false;
      });
  }

  function onToggleChange(value: boolean) {
    console.log(value);
    return (state.isPrivate = value);
  }

  defineExpose({ state, onCloseModal, onSubmitClick, onToggleChange });
</script>

<style scoped lang="scss">
  .create-room {
    .form-row {
      @apply flex flex-col;
    }

    .actions {
      @apply flex space-x-2 justify-end mt-3;
    }
  }
</style>
