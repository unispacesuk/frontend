<template>
  <div class="px-5 py-2" v-if="boards.length === 0">There are no boards here.</div>
  <ul>
    <li v-for="board in boards">
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
        <!--        <div class="w-1/5 flex text-center items-center border-l border-slate-200">-->
        <!--          <div class="w-1/2 flex flex-shrink-0">{{ board.threads }}</div>-->
        <!--          <div class="w-1/2 flex flex-shrink-0">{{ board.replies }}</div>-->
        <!--        </div>-->
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IBoard } from '../../Interfaces/Board/IBoard';
  import BoardLastActivity from './BoardLastActivity.vue';

  export default defineComponent({
    name: 'Board',
    components: { BoardLastActivity },
    props: ['boards'],
    setup(props: any) {
      const boards: IBoard[] = props.boards;

      return {
        boards,
      };
    },
  });
</script>

<style scoped lang="scss">
  .board-card {
    @apply flex items-center pl-10 pr-5 py-2 border-b border-slate-200 rounded-md w-full;
  }
</style>
