<template>
  <button class="button_action_primary" @click.prevent="emit('button-click')" :disabled="disabled">
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
  .button_action_primary {
    @apply bg-$action hover:bg-$action-hover active:bg-$action text-white px-3 py-2 rounded-md uppercase text-sm font-bold outline-none;
  }
</style>
