<template>
  <div class="text-2xl">Starred Threads</div>
  <div v-if="!state.starredThreads.length">
    <Empty label="You have no starred threads." />
  </div>
  <div v-else>
    <div v-for="thread of state.starredThreads">
      <DashboardThreadListCard :thread="thread" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { getUserStarredThreads } from '../../Services/User/UserService';
  import Empty from '../../Components/Util/Empty.vue';
  import DashboardThreadListCard from '../../Components/Dashboard/DashboardStarredThreadsListCard.vue';

  onBeforeMount(() => {
    getUserStarredThreads().then((d) => {
      state.starredThreads = d.response;
    });
  });

  const state = reactive({
    starredThreads: [],
  });
</script>

<style scoped></style>
