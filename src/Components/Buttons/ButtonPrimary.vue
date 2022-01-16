<template>
  <button
    class="px-4 py-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-300 text-white font-bold rounded-md shadow-sm"
    @click.prevent="$emit(`button-click`)"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonPrimary',
  props: {
    label: {
      type: String,
      default: 'ButtonPrimary',
    },
  },
  emits: ['button-click'],
});
</script>
