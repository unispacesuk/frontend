<template>
  <div class="px-5 py-2" v-if="boards.length === 0">There are no boards here.</div>
  <ul>
    <li v-for="board in boards">
      <div class="flex pl-10 pr-5 py-2 border-b border-slate-200 rounded-md table-hover">
        <div class="w-4/5 pr-5">
          <router-link :to="{ name: 'board', params: { boardId: board.id } }">
            <div class="text-md truncate">{{ board.title }}</div>
            <div class="text-xs text-gray-600 truncate">{{ board.description }}</div>
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
  import { IBoard } from '../../Interfaces/Board/IBoard';

  export default defineComponent({
    name: 'Board',
    props: ['boards'],
    setup(props: any) {
      const boards: IBoard[] = props.boards;

      return {
        boards,
      };
    },
  });
</script>

<style scoped></style>
