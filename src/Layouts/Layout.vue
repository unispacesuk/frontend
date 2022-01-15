<template>
  <div class="w-full flex">
    <div class="w-1/4 h-screen bg-slate-800 text-white">
      left nav
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout"
}
</script>