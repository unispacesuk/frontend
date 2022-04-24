<template>
  <div class="px-5 py-2" v-if="boards.length === 0">There are no boards here.</div>
  <ul>
    <li v-for="board in state.boards">
      <div class="board-card table-hover">
        <div class="pr-5 w-3/5">
          <router-link :to="{ name: 'board', params: { boardId: board.id } }">
            <div class="text-md truncate">{{ board.title }}</div>
            <div class="text-xs text-gray-600 truncate">{{ board.description }}</div>
          </router-link>
        </div>
        <div class="hidden md:block w-1/5">
          <BoardLastActivity :board-id="board.id" />
        </div>
        <div class="flex flex-col text-sm text-right w-2/5 md:w-1/5">
          <div>Threads: {{ board.threads }}</div>
          <div>Replies: {{ board.replies }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import { IBoard } from '../../Interfaces/Board/IBoard';
  import BoardLastActivity from './BoardLastActivity.vue';

  const props = defineProps<{
    boards: IBoard[];
  }>();

  const { currentUser } = useUser();

  const state = reactive({
    boards: computed(() => {
      // this will filter through and return an array of what boards the current user is allowed to view
      // if the user is not an admin filter out the admin boards
      if (currentUser.roleId !== 1) {
        return props.boards.filter((board) => board.access === 'all');
      }

      return props.boards;
    }),
  });
</script>

<style scoped lang="scss">
  .board-card {
    @apply flex items-center pl-10 pr-5 py-2 border-b border-slate-200 rounded-md w-full;
  }
</style>
