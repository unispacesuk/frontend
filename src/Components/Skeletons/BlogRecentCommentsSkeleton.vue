<template>
  <div class="last_comments_skeleton_container">
    <div class="__item"></div>
    <div class="__item"></div>
    <div class="__item"></div>
    <div class="__item"></div>
    <div class="__item"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .last_comments_skeleton_container {
    @apply flex -space-x-3 animate-pulse;

    .__item {
      @apply bg-gray-400 w-[30px] h-[30px] rounded-full border-2 border-white;
    }
  }
</style>
