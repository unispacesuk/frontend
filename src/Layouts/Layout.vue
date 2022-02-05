<template>
  <div class="w-full flex">
    <div class="min-w-[220px] hidden lg:block h-screen bg-slate-800 text-white fixed overflow-auto">
      <LeftNav />
    </div>
    <div class="w-full lg:ml-[220px] p-10">
      <div class="w-full bg-white p-3 rounded-md shadow-sm">
        <slot></slot>
      </div>
    </div>
    <Toasts />
  </div>
</template>

<script lang="ts">
import LeftNav from '../Components/Nav/LeftNav.vue';
import Toasts from '../Components/Toast/Toasts.vue';

export default {
  name: 'Layout',
  components: { Toasts, LeftNav },
};
</script>
