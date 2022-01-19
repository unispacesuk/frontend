<template>
  <input
    type="text"
    class="border border-slate-300 rounded-md px-5 py-2 outline-none shadow-sm focus:border-slate-500"
    :placeholder="placeholder"
    v-model="value"
    @keyup="emitValue"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  data() {
    return {
      value: '',
    };
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['input-change'],
  beforeMount() {
    this.$bus.subscribe('input-reset', this.reset);
  },
  beforeUnmount() {
    this.$bus.unsubscribe('input-reset', this.reset);
  },
  methods: {
    emitValue() {
      if (this.value.trim() !== '') {
        this.$emit('input-change', this.value.trim());
      }
    },
    reset() {
      this.value = '';
    }
  },
});
</script>
