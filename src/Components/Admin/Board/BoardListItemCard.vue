<template>
  <Transition name="modal">
    <div class="border border-gray-200 rounded-md p-3 shadow-md">
      <div class="flex flex-col border-b border-gray-200 px-3">
        <div class="text-xl">
          {{ board.title }}
        </div>
        <div class="font-light pb-3">
          {{ board.description }}
        </div>
      </div>
      <div class="flex space-x-2 justify-end pt-3">
        <div v-if="!deleteBoardAskConfirm">
          <Button type="error" @button-click="handleDeleteBoard">Delete</Button>
        </div>
        <div v-if="deleteBoardAskConfirm" class="flex space-x-2">
          <Button v-if="!deleteLoading" type="error" @button-click="deleteBoardAskConfirm = false">
            Cancel
          </Button>
          <Button type="success" @button-click="handleDeleteBoardConfirm" class="flex space-x-2">
            <div>Confirm</div>
            <Spinner v-if="deleteLoading" class="w-5" />
          </Button>
        </div>
        <Button type="primary">Edit</Button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { IBoard } from '../../../Interfaces/Board/IBoard';
  import Button from '../../Buttons/Button.vue';
  import Spinner from '../../../Icons/Util/Spinner.vue';

  const props = defineProps<{
    board: IBoard;
  }>();

  const emit = defineEmits<{
    (event: 'delete-board', boardId: number): void;
  }>();

  const deleteLoading = ref<boolean>(false);
  const deleteBoardAskConfirm = ref<boolean>(false);

  function handleDeleteBoardConfirm() {
    deleteLoading.value = true;

    // TODO: Connect with backend
    setTimeout(() => {
      emit('delete-board', props.board.id);
      deleteBoardAskConfirm.value = false;
      deleteLoading.value = false;
    }, 3000);
  }

  function handleDeleteBoard() {
    deleteBoardAskConfirm.value = true;
  }
</script>
