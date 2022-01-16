<template>
  <input
    type="text"
    class="border border-slate-300 rounded-md px-5 py-2 outline-none"
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
  created() {
    this.$event.on('reset', () => {
      this.reset();
    })
  },
  beforeUnmount() {
    this.$event.off('reset');
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
