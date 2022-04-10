<template>
  <select
    class="select"
    @change="emits('selection-change', state.selection)"
    v-model="state.selection" :selected="state.selected">
    <slot></slot>
  </select>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const props = defineProps<{
    selected: number;
  }>();

  const emits = defineEmits<{
    (event: 'selection-change', data: number): void;
  }>();

  const state = reactive({
    selection: props.selected,
  });
</script>

<style scoped lang="scss">
  .select {
    @apply px-3 py-2 outline-none border border-black rounded-md;
  }
</style>
