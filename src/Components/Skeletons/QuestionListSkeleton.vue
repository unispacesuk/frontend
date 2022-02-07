<template>
  <div class="w-full border border-slate-200 rounded-md p-3 flex">
    <div class="flex-col space-y-2 px-10">
      <!-- user info -->
      <div class="w-[70px] h-[70px] skeleton-item"></div>
      <div class="w-full h-3 skeleton-item"></div>
    </div>

    <div class="w-full flex-col space-y-2 relative">
      <div class="w-1/2 h-5 skeleton-item"></div>
      <div class="w-1/3 h-5 skeleton-item"></div>
      <div class="flex space-x-2 absolute bottom-0">
        <div class="w-[50px] h-5 skeleton-item"></div>
        <div class="w-[50px] h-5 skeleton-item"></div>
        <div class="w-[50px] h-5 skeleton-item"></div>
        <div class="w-[50px] h-5 skeleton-item"></div>
        <div class="w-[50px] h-5 skeleton-item"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuestionListSkeleton',
});
</script>
