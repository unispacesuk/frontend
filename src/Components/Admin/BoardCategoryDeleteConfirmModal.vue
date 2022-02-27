<template>
  <Transition name="modal">
    <Modal v-if="showDeleteDialog" @close-modal="emit('close-modal', false)">
      <div class="text-xl">Delete Category?</div>
      <div class="flex space-x-3 py-5">
        <Button type="error" @button-click="emit('close-modal', false)">Cancel</Button>
        <Button type="success" @button-click="emit('delete-confirm')">Confirm</Button>
      </div>
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
  import Modal from '../Modal/Modal.vue';
  import Button from '../Buttons/Button.vue';

  defineProps<{
    id: number;
    showDeleteDialog: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'close-modal', value: boolean): void;
    (event: 'delete-confirm'): void;
  }>();
</script>
