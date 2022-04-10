<template>
  <div class="comment_card">
    <div class="comment_card__left">
      <div>
        <UserAvatar :user="user" size="sm" />
      </div>
    </div>
    <div class="comment_card__right">
      <div class="__content">{{ comment.comment.content }}</div>
      <div class="__bottom">
        <div>{{ comment.username }}</div>
        <div class="__date">{{ moment().endOf('minute').to(comment.comment.created_at) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import moment from 'moment';
  import UserAvatar from '../User/UserAvatar.vue';

  type Comment = {
    avatar: string;
    username: string;
    comment: {
      [key: string]: any;
    };
  };

  const props = defineProps<{
    comment: Comment;
  }>();

  const user = {
    username: props.comment.username,
    avatar: props.comment.avatar,
  };
</script>

<style scoped lang="scss">
  .comment_card {
    @apply flex px-5 py-3 border border-gray-200 rounded-md items-center;

    &__left {
      @apply px-3 py-2;
    }

    &__right {
      @apply flex flex-col space-y-2;

      .__content {
        @apply flex;
      }

      .__bottom {
        @apply flex justify-between items-baseline space-x-3;

        .__date {
          @apply text-gray-500 text-sm;
        }
      }
    }
  }
</style>
