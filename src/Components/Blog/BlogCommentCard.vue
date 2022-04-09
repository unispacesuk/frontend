<template>
  <div class="comment_card">
    <div>{{ comment.user_id }}</div>
    <div>{{ comment.content }}</div>
    <div>{{ comment.created_at }}</div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    comment: any;
  }>();
</script>

<style scoped lang="scss">
  .comment_card {
    @apply flex;
  }
</style>
