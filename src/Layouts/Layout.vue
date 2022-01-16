<template>
  <div class="w-full flex relative">
    <div class="min-w-[220px] h-screen bg-slate-800 text-white fixed">
      <LeftNav />
    </div>
    <div class="w-full ml-[220px] p-10">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import LeftNav from '../Components/LeftNav.vue';
export default {
  name: 'Layout',
  components: { LeftNav },
};
</script>
