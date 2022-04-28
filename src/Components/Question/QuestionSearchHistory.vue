<template>
  <div class="search-history-container">
    <template v-if="!state.searchHistory.length">No search history.</template>
    <template v-else>
      <div v-for="(keyword, index) of state.searchHistory" :key="index">
        <div class="py-1">{{ keyword }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, reactive, onBeforeUnmount } from 'vue';
  import { IBus } from '../../Interfaces/IBus';

  const $bus = inject<IBus>('$bus');
  $bus?.listen('new-search', onSearch);

  onBeforeUnmount(() => {
    $bus?.forget('new-search');
  });

  const state = reactive({
    searchHistory: computed(() => {
      const history = localStorage.getItem('question-history');
      if (history) return JSON.parse(history);
      return [];
    }),
  });

  function onSearch(query) {
    if (!state.searchHistory.includes(query)) {
      state.searchHistory.push(query);
    }

    localStorage.setItem('question-history', JSON.stringify(state.searchHistory));
  }

  defineExpose({ state, onSearch });
</script>

<style scoped lang="scss">
  .search-history-container {
    @apply absolute top-12 bg-white rounded-md shadow w-[170px] z-10 text-center text-gray-600 py-4;
  }
</style>
