<template>
  <button
    class="px-4 py-2 bg-green-400 hover:bg-green-500 active:bg-green-300 text-white font-bold rounded-md shadow-sm outline-none disabled:bg-blue-200"
    @click.prevent="$emit(`button-click`)"
    :disabled="disabled"
  >
    {{ label }}
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonSuccess',
  props: {
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['button-click'],
});
</script>
