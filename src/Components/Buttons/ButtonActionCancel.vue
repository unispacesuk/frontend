<template>
  <button class="button_action_cancel" @click.prevent="emit('button-click')" :disabled="disabled">
    {{ label }}
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label?: string;
    disabled?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'button-click'): void;
  }>();
</script>

<style scoped>
  .button_action_cancel {
    @apply bg-gray-100 hover:bg-gray-200 active:bg-gray-100 text-red-600 px-3 py-2 rounded-md uppercase text-sm font-bold outline-none;
  }
</style>
