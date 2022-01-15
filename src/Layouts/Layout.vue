<template>
  <div class="w-full flex">
    <div class="w-[220px] h-screen bg-slate-800 text-white">
      <LeftNav />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import LeftNav from "../Components/LeftNav.vue";
export default {
  name: "Layout",
  components: {LeftNav}
}
</script>