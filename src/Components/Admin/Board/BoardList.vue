<template>
  <Transition name="modal">
    <Modal v-if="viewBoards" @close-modal="emit('close-modal', false)">
      <div class="text-2xl px-5 border-b border-gray-200 pb-3">Boards List</div>
      <div class="p-3 flex flex-col space-y-4">
        <div v-for="(board, index) of category.boards">
          <BoardListItemCard
            :board="board"
            @delete-board="doDeleteBoard"
            @edit-board="doEditBoard"
          />
        </div>
        <div v-if="category.boards.length === 0">No Boards on this Category</div>
      </div>
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
  import { useCategories } from '../../../Stores/CategoriesStore';
  import { onBeforeMount, ref } from 'vue';
  import { ICategory } from '../../../Interfaces/Board/ICategory';
  import { IBoard } from '../../../Interfaces/Board/IBoard';
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

  function doEditBoard(board: IBoard) {
    if (category.value && category.value.boards) {
      category.value.boards.forEach((b) => {
        if (b.id === board.id) {
          b.title = board.title;
          b.description = board.description;
        }
      });
    }
  }
</script>
