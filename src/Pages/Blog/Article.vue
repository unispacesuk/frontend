<template>
  <template v-if="state.isLoading"> Loading... </template>

  <template v-else>
    <div class="article_container">
      <div class="article_container__top">
        <div class="article_container__top_title">{{ state.blog.title }}</div>
        <div class="article_container__top_date">
          {{ new Date(state.blog.createdAt).toDateString() }}
        </div>
      </div>

      <div class="article_container__middle">
        <div class="article_container__middle_user_info">
          <BlogCardUserInfo
            :article-id="state.blog.id"
            :user="state.blog.user"
            :user-id="state.blog.userId"
            :votes="state.blog.votes"
          />
        </div>
        <div class="article_container__middle_content" v-html="state.blog.content"></div>
      </div>
    </div>

    <div class="__comments">
      <BlogCommentForm @submitComment="handleSubmitComment" />

      <template v-if="!state.comments.length">
        <Empty label="No comments yet. Be the first." />
      </template>
      <template v-if="state.comments[0] !== null">
        <div v-for="(comment, index) of state.comments" :key="index">
          <BlogCommentCard :comment="comment" />
        </div>
      </template>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { inject, onBeforeMount, reactive } from 'vue';
  import { getBlogArticle } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';
  import BlogCardUserInfo from '../../Components/Blog/BlogCardUserInfo.vue';
  import BlogCommentForm from '../../Components/Blog/BlogCommentForm.vue';
  import BlogCommentCard from '../../Components/Blog/BlogCommentCard.vue';
  import Empty from '../../Components/Util/Empty.vue';

  const route = useRoute();
  const articleId = route.params.articleId;

  const $bus = inject<IBus>('$bus');

  onBeforeMount(() => {
    getBlogArticle(articleId)
      .then((d) => {
        state.blog = d.response;
        state.comments = sortComments(state.blog.comments);
        state.isLoading = false;
      })
      .catch((error) => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        state.isLoading = false;
      });
  });

  const state = reactive({
    isLoading: true,
    comments: <any>[],
    blog: <any>{},
    commentsPage: 1,
  });

  function handleSubmitComment(value: any) {
    if (state.comments[0] === null) state.comments.pop();
    state.comments.unshift(value);
  }

  function sortComments(comments: any[]) {
    if (comments[0].comment === null) return [];
    return comments.sort((a, b) => b.comment._id - a.comment._id);
  }
</script>

<style scoped lang="scss">
  .article_container {
    @apply border-b border-gray-200 mb-5;

    &__top {
      @apply flex justify-between items-center px-5 pb-3 border-b border-gray-200;

      &_title {
        @apply text-xl;
      }

      &_date {
        @apply text-sm text-gray-500;
      }
    }

    &__middle {
      @apply flex space-x-3;

      &_user_info {
        @apply w-1/4 py-5;
      }

      &_content {
        @apply py-5;
      }
    }
  }

  .__comments {
    @apply flex flex-col space-y-2;
  }
</style>
