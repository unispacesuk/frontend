<template>
  <div class="card">
    <div class="card__title">{{ thread.title }}</div>
    <div class="card__date">{{ new Date(thread.created_at).toDateString() }}</div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    thread: null;
  }>();
</script>

<style scoped lang="scss">
  .card {
    @apply py-3;

    &__title {
      @apply text-lg;
    }

    &__date {
      @apply text-sm text-gray-500;
    }
  }
</style>
