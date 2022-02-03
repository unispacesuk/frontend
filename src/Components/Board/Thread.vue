<template>
  <div class="flex p-2 mb-3 border-b border-gray-300 rounded-md table-hover space-x-5 items-center">
    <div>
      <div class="w-12 h-12 bg-red-300 rounded-full"></div>
    </div>
    <div>
      <div class="text-lg">{{ thread.title }}</div>
      <div class="text-xs text-gray-400">{{ new Date(thread.createdAt).toLocaleString() }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IThread } from '../../Interfaces/Board/IThread';
export default defineComponent({
  name: 'Thread',
  props: ['thread'],
  setup(props: any) {
    const thread: IThread = props.thread;

    return {
      thread,
    };
  },
});
</script>

<style scoped></style>
