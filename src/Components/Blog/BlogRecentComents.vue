<template>
  <template v-if="state.isLoading">
    <BlogRecentCommentsSkeleton />
  </template>
  <template v-else>
    <template v-if="!state.recentComments.length">
      <div>No recent activity.</div>
    </template>

    <template v-else>
      <div class="recent_comments_container">
        <div>Recent activity:</div>
        <div class="recent_comments_container__right">
          <div v-for="(user, index) of state.recentComments" :key="index">
            <UserAvatar :user="user" size="xs" class="__item" />
          </div>
        </div>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { getRecentActivity } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';
  import UserAvatar from '../User/UserAvatar.vue';
  import BlogRecentCommentsSkeleton from '../Skeletons/BlogRecentCommentsSkeleton.vue';

  const props = defineProps<{
    articleId: number;
  }>();

  const state = reactive({
    recentComments: <any[]>[],
    isLoading: true,
  });

  const $bus = inject<IBus>('$bus');

  getRecentActivity(props.articleId)
    .then((data) => {
      state.recentComments = data.response;
      state.isLoading = false;
    })
    .catch((error) => {
      // console.log(error);
      $bus?.emit('add-toast', 'Something went wrong.', 'error');
      state.isLoading = false;
    });
</script>

<style scoped lang="scss">
  .recent_comments_container {
    @apply flex items-center space-x-3;

    &__right {
      @apply flex -space-x-3;

      .__item {
        @apply border-2 border-white rounded-full bg-white;
      }
    }
  }
</style>
