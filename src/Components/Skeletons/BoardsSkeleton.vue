<template>
  <div class="w-full flex flex-col p-2 rounded-md">
    <div
      class="flex px-5 py-3 border-b border-slate-200 bg-gray-100 rounded-md flex flex-col space-y-2"
    >
      <div class="w-[150px] h-5 skeleton-item"></div>
      <div class="w-[200px] h-5 skeleton-item"></div>
    </div>
    <div class="flex pl-10 pr-5 py-2 border-b border-slate-200 rounded-md table-hover">
      <div class="w-4/5 space-y-2">
        <div class="w-[150px] h-5 skeleton-item"></div>
        <div class="w-[200px] h-5 skeleton-item"></div>
      </div>
      <div class="w-1/5 flex text-center items-center border-l border-slate-200">
        <div class="w-1/2">
          <div class="w-5 h-5 m-auto skeleton-item"></div>
        </div>
        <div class="w-1/2">
          <div class="w-5 h-5 m-auto skeleton-item"></div>
        </div>
      </div>
    </div>
    <div class="flex pl-10 pr-5 py-2 border-b border-slate-200 rounded-md table-hover">
      <div class="w-4/5 space-y-2">
        <div class="w-[150px] h-5 skeleton-item"></div>
        <div class="w-[200px] h-5 skeleton-item"></div>
      </div>
      <div class="w-1/5 flex text-center items-center border-l border-slate-200">
        <div class="w-1/2">
          <div class="w-5 h-5 m-auto skeleton-item"></div>
        </div>
        <div class="w-1/2">
          <div class="w-5 h-5 m-auto skeleton-item"></div>
        </div>
      </div>
    </div>
    <div class="flex pl-10 pr-5 py-2 border-b border-slate-200 rounded-md table-hover">
      <div class="w-4/5 space-y-2">
        <div class="w-[150px] h-5 skeleton-item"></div>
        <div class="w-[200px] h-5 skeleton-item"></div>
      </div>
      <div class="w-1/5 flex text-center items-center border-l border-slate-200">
        <div class="w-1/2">
          <div class="w-5 h-5 m-auto skeleton-item"></div>
        </div>
        <div class="w-1/2">
          <div class="w-5 h-5 m-auto skeleton-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BoardsSkeleton',
});
</script>

<style scoped></style>
