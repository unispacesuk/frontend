<template>
  <div class="comment_card">
    <div class="comment_card__left">
      <div>
        <UserAvatar :user="{username: 'ricdotnet'}" size="sm" />
      </div>
    </div>
    <div class="comment_card__right">
      <div class="__content">{{ comment.content }}</div>
      <div class="__bottom">
        <div class="__date">{{ moment().endOf('minute').to(comment.created_at) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import moment from 'moment';
  import UserAvatar from '../User/UserAvatar.vue';

  type Comment = {
    user_id: number;
    content: string;
    created_at: Date;
  };

  const props = defineProps<{
    comment: Comment;
  }>();
</script>

<style scoped lang="scss">
  .comment_card {
    @apply flex px-5 py-3 border border-gray-200 rounded-md items-center;

    &__left {
      @apply px-3 py-2;
    }

    &__right {
      .__content {
        @apply flex;
      }

      .__bottom {
        @apply flex justify-between;

        .__date {
          @apply text-gray-500 text-sm;
        }
      }
    }
  }
</style>
