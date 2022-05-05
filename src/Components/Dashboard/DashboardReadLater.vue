<template>
  <div class="read-later-tab">
    <div>
      <div class="text-xl mb-3 px-5">Starred Threads</div>
      <div v-if="!state.starredThreads.length">No threads to read later.</div>
      <div v-else class="flex flex-col space-y-2">
        <div v-for="(thread, index) of state.starredThreads" :key="index">
          <DashboardThreadListCard :thread="thread" @action:remove-thread="onActionRemoveThread" />
        </div>
      </div>
    </div>

    <div>
      <div class="text-xl my-3 px-5">Blog Articles</div>
      <div v-if="!state.blogArticles.length">No blog articles to read later.</div>
      <div v-else class="flex flex-col space-y-2">
        <div v-for="(article, index) of state.blogArticles" :key="index">
          <DashboardArticleReadListItem
            :article="article"
            @action:remove-article="onActionRemoveArticle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { getReadLaterList, getUserStarredThreads } from '../../Services/User/UserService';
  import DashboardThreadListCard from '../../Components/Dashboard/DashboardStarredThreadsListCard.vue';
  import DashboardArticleReadListItem from './DashboardArticleReadListItem.vue';

  onBeforeMount(() => {
    getUserStarredThreads().then((data) => {
      state.starredThreads = data.response;
    });

    getReadLaterList().then((data) => {
      state.blogArticles = data.response;
    });
  });

  const state = reactive({
    starredThreads: [],
    blogArticles: [],
  });

  function onActionRemoveThread(id: number) {
    state.starredThreads = state.starredThreads.filter((t: any) => t._id !== id);
  }

  function onActionRemoveArticle(id: number) {
    state.blogArticles = state.blogArticles.filter((b: any) => b.blog_post !== id);
  }

  defineExpose({ state, onActionRemoveThread, onActionRemoveArticle });
</script>

<style scoped lang="scss">
  .read-later-tab {
    @apply grid grid-cols-1 divide-y gap-10;
  }
</style>
