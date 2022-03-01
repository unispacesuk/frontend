<template>
  <Transition name="modal">
    <Modal v-if="viewBoards" @close-modal="emit('close-modal', false)">
      <div class="max-h-[600px] overflow-auto">
        <div class="text-2xl px-5 border-b border-gray-200 pb-3">Boards List</div>
        <div class="p-3 flex flex-col space-y-4">
          <div v-for="(board, index) of category.boards">
            <BoardListItemCard :board="board" @delete-board="doDeleteBoard" />
          </div>
          <div v-if="category.boards.length === 0">No Boards on this Category</div>
        </div>
      </div>
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
  import { useCategories } from '../../../Stores/CategoriesStore';
  import { onBeforeMount, ref } from 'vue';
  import { ICategory } from '../../../Interfaces/Board/ICategory';
  import Modal from '../../Modal/Modal.vue';
  import BoardListItemCard from './BoardListItemCard.vue';

  const props = defineProps<{
    viewBoards: boolean;
    categoryId: number;
  }>();

  const emit = defineEmits<{
    (event: 'close-modal', value: boolean): void;
  }>();

  const { categories } = useCategories();
  const category = ref<ICategory>();

  onBeforeMount(() => {
    category.value = categories.find((c) => c.id === props.categoryId);
  });

  function doDeleteBoard(boardId: number) {
    if (category.value && category.value.boards) {
      category.value.boards = category.value.boards.filter((b) => b.id !== boardId);
    }
  }
</script>
