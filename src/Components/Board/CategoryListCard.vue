<template>
  <div class="w-full flex flex-col p-2 rounded-md">
    <div class="flex px-5 py-2 border-b border-slate-200 bg-gray-100 rounded-md">
      <div class="w-4/5 flex flex-col pr-5">
        <div class="text-lg truncate">{{ category.title }}</div>
        <div class="text-sm text-gray-600 truncate">{{ category.description }}</div>
      </div>
      <div class="w-1/5 text-center">
        <div class="text-lg">Stats</div>
        <div class="text-sm text-gray-600 flex">
          <div class="w-1/2">Threads</div>
          <div class="w-1/2">Replies</div>
        </div>
      </div>
    </div>
    <Board :boards="category.boards" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ICategory } from '../../Interfaces/Board/ICategory';
import Board from './BoardListCard.vue';

export default defineComponent({
  name: 'Category',
  components: { Board },
  props: ['category'],
  emits: ['add-board'],
  setup(props) {
    const category: ICategory = props.category;

    return {
      category,
    };
  },
});
</script>
