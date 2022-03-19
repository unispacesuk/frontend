<template>
  <template v-if="!state.starredThreads.length">
    <Empty label="You have no starred threads." />
  </template>
  <template v-else>
    <div v-for="thread of state.starredThreads">
      {{ thread }}
    </div>
  </template>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { getUserStarredThreads } from '../../Services/User/UserService';
  import Empty from '../../Components/Util/Empty.vue';

  onBeforeMount(() => {
    getUserStarredThreads().then((d) => {
      state.starredThreads = d.response;
    });
  });

  const state = reactive({
    starredThreads: [],
  });
</script>
