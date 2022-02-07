<template>
  <button
    class="px-4 py-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-300 text-white font-bold rounded-md shadow-sm outline-none disabled:bg-blue-200"
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
  name: 'ButtonPrimary',
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
