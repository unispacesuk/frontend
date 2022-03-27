<template>
  <div>{{ blog }}</div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { inject, onBeforeMount, ref } from 'vue';
  import { getBlogArticle } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';

  const route = useRoute();
  const articleId = route.params.articleId;

  const $bus = inject<IBus>('$bus');
  const blog = ref<{}>({});

  onBeforeMount(() => {
    getBlogArticle(articleId)
      .then((d) => {
        blog.value = d.response;
      })
      .catch((error) => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  });
</script>

<style scoped></style>
