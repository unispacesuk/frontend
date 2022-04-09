<template>
  <button class="reaction_button smooth" @click.prevent="emits('button-click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  const emits = defineEmits(['button-click']);
</script>

<style scoped lang="scss">
  .reaction_button {
    @apply border border-gray-800 rounded text-sm py-1 px-2 flex space-x-2 hover:bg-gray-100 active:bg-blue-300 outline-none;
  }
</style>
