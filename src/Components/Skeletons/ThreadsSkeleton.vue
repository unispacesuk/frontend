<template>
  <div class="flex p-2 mb-3 border-b border-gray-300 rounded-md table-hover space-x-5 items-center">
    <div>
      <div class="w-12 h-12 skeleton-item"></div>
    </div>
    <div class="flex-col space-y-2">
      <div class="text-lg">
        <div class="w-[200px] h-5 skeleton-item"></div>
      </div>
      <div class="text-xs text-gray-400">
        <div class="w-[300px] h-3 skeleton-item"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThreadsSkeleton',
});
</script>

<style scoped></style>
