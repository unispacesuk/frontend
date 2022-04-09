<template>
  <Modal title="Delete article?">
    <div class="modal__content">
      <div class="modal__content_top">Do you really want to delete this article?</div>
      <div class="modal__content_buttons_row">
        <ButtonActionCancel label="Cancel" @button-click="emits('cancel-delete')" />
        <ButtonActionSecondary @button-click="emits('submit-delete')" class="flex space-x-2">
          <div>Delete</div>
<!--          <Spinner class="w-5" />-->
        </ButtonActionSecondary>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import Modal from '../Modal/Modal.vue';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const emits = defineEmits<{
    (event: 'cancel-delete'): void;
    (event: 'submit-delete'): void;
  }>();
</script>

<style scoped lang="scss">
  .modal__content {
    @apply p-3;
    &_top {
      @apply py-3;
    }

    &_buttons_row {
      @apply flex space-x-2;
    }
  }
</style>
