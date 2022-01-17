<template>
  <div
    class="w-[250px] mt-2 text-center text-green-700 bg-white px-10 py-3 rounded-lg shadow-sm z-10 cursor-pointer border border-slate-300"
    @click="$emit('toast-close')"
  >
    <div class="flex items-center space-x-2">
      <!--      <CheckIcon />-->
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Toast',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      handleClose: () => setTimeout(this.close, 70000),
    };
  },
  emits: ['toast-close'],
  created() {
    this.handleClose();
  },
  methods: {
    close() {
      this.$emit('toast-close');
    },
  },
});
</script>

<style scoped></style>
