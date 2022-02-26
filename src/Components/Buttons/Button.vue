<template>
  <button
    class="text-white text-sm px-3 py-1 rounded-sm shadow-sm text-shadow"
    :class="{
      'bg-$error hover:bg-$error-hover active:bg-$error-active': type === 'error',
      'bg-$success hover:bg-$success-hover active:bg-$success-active': type === 'success',
      'bg-$primary hover:bg-$primary-hover active:bg-$primary-active': type === 'primary',
      'bg-$plain hover:bg-$plain-hover active:bg-$plain-active': type === 'plain',
    }"
    @click.prevent="emit('button-click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const { type } = defineProps<{
  type: String;
}>();

const emit = defineEmits<{
  (event: 'button-click'): void;
}>();
</script>
