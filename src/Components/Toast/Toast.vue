<template>
  <div
    class="w-[250px] mt-2 text-center bg-white px-10 py-3 rounded-lg shadow-sm z-10 cursor-pointer border border-slate-300"
    :class="{
      'text-green-700': toast.type === 'success',
      'text-red-700': toast.type === 'error',
      'text-yellow-700': toast.type === 'warning',
    }"
    @click="$emit('close-toast')"
  >
    <div class="flex items-center space-x-2">
      <!--      <CheckIcon />-->
      <div class="text-sm">{{ toast.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IToast } from '../../Interfaces/Toast/IToast';

export default defineComponent({
  name: 'Toast',
  props: ['toast'],
  setup(props: any) {
    const toast: IToast = props.toast;
    return {
      toast,
    };
  },
  data() {
    return {
      handleClose: () => setTimeout(this.close, 7000),
    };
  },
  emits: ['close-toast'],
  created() {
    this.handleClose();
  },
  methods: {
    close() {
      this.$emit('close-toast');
    },
  },
});
</script>

<style scoped></style>
