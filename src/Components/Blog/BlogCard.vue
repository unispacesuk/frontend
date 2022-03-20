<template>
  <div class="card smooth">
    <div class="card__left_content">
      <BlogCardUserInfo username="ricdotnet" />
    </div>

    <div class="card__right_content">
      <BlogCardContent />
    </div>
  </div>
</template>

<script setup lang="ts">
  import BlogCardUserInfo from './BlogCardUserInfo.vue';
  import BlogCardContent from './BlogCardContent.vue';
</script>

<style scoped lang="scss">
  .card {
    @apply w-full flex border border-gray-200 rounded-md p-3 hover:shadow-md;

    &__left_content {
      @apply w-1/4;
    }

    &__right_content {
      @apply w-3/4 pl-5;
    }
  }
</style>
