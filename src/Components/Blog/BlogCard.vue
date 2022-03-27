<template>
  <div class="card smooth">
    <div class="card__title">
      <router-link :to="{ name: 'blogsArticle', params: { articleId: blog._id } }">
        {{ blog.title }}
      </router-link>
    </div>
    <div class="flex py-3">
      <div class="card__left_content">
        <BlogCardUserInfo username="ricdotnet" />
      </div>

      <div class="card__right_content" v-html="blog.content"></div>
      <!--      <BlogCardContent />-->
      <!--    </div>-->
    </div>
    <div class="card__bottom">
      <div>
        {{ new Date(blog.created_at).toDateString() }}
      </div>
      <div><Button type="primary" @button-click="handleReadMore">Read More</Button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import BlogCardUserInfo from './BlogCardUserInfo.vue';
  import BlogCardContent from './BlogCardContent.vue';
  import Button from '../Buttons/Button.vue';

  const router = useRouter();

  const props = defineProps<{
    blog: any;
  }>();

  function handleReadMore() {
    router.push({
      name: 'blogsArticle',
      params: {
        articleId: props.blog._id,
      },
    });
  }
</script>

<style scoped lang="scss">
  .card {
    @apply w-full border border-gray-200 rounded-md p-3 hover:shadow-md;

    &__title {
      @apply text-2xl pb-3 px-5 border-b border-gray-200;
    }

    &__left_content {
      @apply w-1/4;
    }

    &__right_content {
      @apply w-3/4 pl-5;
    }

    &__bottom {
      @apply flex justify-between items-center border-t border-gray-200 px-5 pt-3 text-sm text-gray-500;
    }
  }
</style>
