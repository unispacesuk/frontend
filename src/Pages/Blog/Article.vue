<template>
  <template v-if="state.isLoading"> Loading... </template>

  <template v-else>
    <div class="article_container">
      <div class="article_container__top">
        <div class="article_container__top_title">{{ blog.title }}</div>
        <div class="article_container__top_date">{{ new Date(blog.createdAt).toDateString() }}</div>
      </div>

      <div class="article_container__middle">
        <div class="article_container__middle_user_info">
          <BlogCardUserInfo :article-id="blog.id" :user="blog.user" :votes="blog.votes" />
        </div>
        <div class="article_container__middle_content" v-html="blog.content"></div>
      </div>
    </div>

    <template v-if="state.comments[0] === null">
      <Empty label="No comments yet. Be the first." />
    </template>
    <template v-if="state.comments[0] !== null">
      <div v-for="(comment, index) of state.comments" :key="index">
        <BlogCommentCard :comment="comment" />
      </div>
    </template>

    <BlogCommentForm @submitComment="handleSubmitComment" />
  </template>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { inject, onBeforeMount, reactive, ref } from 'vue';
  import { getBlogArticle } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';
  import BlogCardUserInfo from '../../Components/Blog/BlogCardUserInfo.vue';
  import BlogCommentForm from '../../Components/Blog/BlogCommentForm.vue';
  import BlogCommentCard from '../../Components/Blog/BlogCommentCard.vue';
  import Empty from '../../Components/Util/Empty.vue';

  const route = useRoute();
  const articleId = route.params.articleId;

  const $bus = inject<IBus>('$bus');
  const blog = ref<any>({});

  onBeforeMount(() => {
    getBlogArticle(articleId)
      .then((d) => {
        blog.value = d.response;
        state.comments = blog.value.comments;
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
  });

  function handleSubmitComment(value: any) {
    if (state.comments[0] === null) state.comments.pop();
    state.comments.push(value);
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
</style>
