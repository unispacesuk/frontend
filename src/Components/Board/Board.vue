<template>
  <div class="px-5 py-2" v-if="boards.length === 0">You haven't added any boards here yet.</div>
  <ul>
    <li v-for="board in boards">
      <div
        class="flex pl-10 pr-5 py-2 border-b border-slate-200 rounded-md hover:bg-slate-50 transition ease-in-out duration-200"
      >
        <div class="w-4/5">
          <router-link :to="{ name: 'board', params: { id: board.id } }">
            <div class="text-md">{{ board.title }}</div>
            <div class="text-xs text-gray-600">{{ board.description }}</div>
          </router-link>
        </div>
        <div class="w-1/5 flex text-center items-center border-l border-slate-200">
          <div class="w-1/2">{{ board.threads }}</div>
          <div class="w-1/2">{{ board.replies }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Board',
  props: {
    boards: {
      type: Array,
      default: [],
    },
  },
});
</script>

<style scoped></style>
