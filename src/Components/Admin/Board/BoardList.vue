<template>
  <Transition name="modal">
    <Modal title="Boards List" v-if="viewBoards" @close-modal="emit('close-modal', false)">
      <template v-if="state.isLoading"> Loading ... </template>

      <template v-else>
        <div class="p-3 flex flex-col space-y-4">
          <div v-for="(board, index) of state.boards">
            <BoardListItemCard
              :board="board"
              @delete-board="doDeleteBoard"
              @edit-board="doEditBoard"
            />
          </div>
          <div v-if="!state.boards">No Boards on this Category</div>
        </div>
      </template>
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { getAllBoards } from '../../../Services/Board/BoardsService';
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

  const state = reactive({
    isLoading: true,
    boards: <IBoard[]>[],
  });

  onBeforeMount(() => {
    // category.value = categories.find((c) => c.id === props.categoryId);
    getAllBoards(props.categoryId)
      .then((res) => {
        state.boards = res.boards;
        state.isLoading = false;
      })
      .catch((error) => {
        console.error(error);
        state.isLoading = false;
      });
  });

  function doDeleteBoard(boardId: number) {
    if (state.boards) {
      state.boards = state.boards.filter((b) => b.id !== boardId);
    }
  }

  function doEditBoard(board: IBoard) {
    if (state.boards) {
      state.boards.forEach((b) => {
        if (b.id === board.id) {
          b.title = board.title;
          b.description = board.description;
        }
      });
    }
  }
</script>
