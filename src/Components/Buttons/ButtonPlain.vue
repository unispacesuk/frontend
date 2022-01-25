<template>
  <button
    class="px-4 py-2 bg-gray-400 hover:bg-gray-500 active:bg-gray-300 text-white font-bold rounded-md shadow-sm outline-none"
    @click.prevent="$emit(`button-click`)"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonPlain',
  props: {
    label: {
      type: String,
      default: 'ButtonPlain',
    },
  },
  emits: ['button-click'],
});
</script>
