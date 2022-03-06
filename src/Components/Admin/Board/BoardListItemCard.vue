<template>
  <Transition name="modal">
    <div class="border border-gray-200 rounded-md p-3 shadow-md smooth">
      <div class="flex flex-col border-b border-gray-200 px-3 space-y-2">
        <div>
          <span class="text-xl" v-if="!editBoardAskConfirm">{{ board.title }}</span>
          <Input
            class="w-full"
            v-if="editBoardAskConfirm"
            :input-value="board.title"
            @input-change="(v) => (newTitle = v)"
          />
        </div>
        <div class="pb-3">
          <span class="font-light" v-if="!editBoardAskConfirm">{{ board.description }}</span>
          <Input
            class="w-full"
            v-if="editBoardAskConfirm"
            :input-value="board.description"
            @input-change="(v) => (newDescription = v)"
          />
        </div>
      </div>
      <div class="flex space-x-2 justify-end pt-3">
        <div v-if="!editBoardAskConfirm">
          <div v-if="!deleteBoardAskConfirm">
            <Button type="error" @button-click="handleDeleteBoard">Delete</Button>
          </div>
          <div v-if="deleteBoardAskConfirm" class="flex space-x-2">
            <Button
              v-if="!deleteLoading"
              type="error"
              @button-click="deleteBoardAskConfirm = false"
            >
              Cancel
            </Button>
            <Button type="success" @button-click="handleDeleteBoardConfirm" class="flex space-x-2">
              <div>Confirm</div>
              <Spinner v-if="deleteLoading" class="w-5" />
            </Button>
          </div>
        </div>
        <div v-if="!deleteBoardAskConfirm">
          <div v-if="!editBoardAskConfirm">
            <Button type="primary" @button-click="handleEditBoard">Edit</Button>
          </div>
          <div v-if="editBoardAskConfirm" class="flex space-x-2">
            <Button type="error" v-if="!editLoading" @button-click="editBoardAskConfirm = false">
              Cancel
            </Button>
            <Button type="success" @button-click="handleEditBoardConfirm" class="flex space-x-2">
              <div>Confirm</div>
              <Spinner v-if="editLoading" class="w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { deleteBoard, editBoard } from '../../../Services/Board/BoardsService';
  import { IBoard } from '../../../Interfaces/Board/IBoard';
  import { IBus } from '../../../Interfaces/IBus';
  import Button from '../../Buttons/Button.vue';
  import Spinner from '../../../Icons/Util/Spinner.vue';
  import Input from '../../Form/Input.vue';

  const props = defineProps<{
    board: IBoard;
  }>();

  const emit = defineEmits<{
    (event: 'delete-board', boardId: number): void;
    (event: 'edit-board', board: IBoard): void;
  }>();

  const $bus = inject<IBus>('$bus');
  const deleteLoading = ref<boolean>(false);
  const deleteBoardAskConfirm = ref<boolean>(false);

  const editLoading = ref<boolean>(false);
  const editBoardAskConfirm = ref<boolean>(false);

  const newTitle = ref<string>('');
  const newDescription = ref<string>('');

  function handleDeleteBoardConfirm() {
    deleteLoading.value = true;

    deleteBoard(props.board.id)
      .then(() => {
        emit('delete-board', props.board.id);
        deleteBoardAskConfirm.value = false;
        deleteLoading.value = false;
        $bus?.emit('add-toast', 'Board deleted.', 'success');
      })
      .catch((error) => {
        console.log(error.response);
        deleteBoardAskConfirm.value = false;
        deleteLoading.value = false;
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function handleDeleteBoard() {
    deleteBoardAskConfirm.value = true;
  }

  function handleEditBoardConfirm() {
    editLoading.value = true;

    if (!newTitle.value && !newDescription.value) {
      editLoading.value = false;
      // editBoardAskConfirm.value = false;
      return $bus?.emit('add-toast', 'Nothing changed.', 'error');
    }

    if (!newTitle.value) {
      editLoading.value = false;
      return $bus?.emit('add-toast', 'The title cannot be empty.', 'error');
    }

    if (!newDescription.value) {
      editLoading.value = false;
      return $bus?.emit('add-toast', 'The description cannot be empty.', 'error');
    }

    editBoard(props.board.id, {
      title: newTitle.value,
      description: newDescription.value,
    })
      .then((d) => {
        editBoardAskConfirm.value = false;
        editLoading.value = false;
        newDescription.value = '';
        newTitle.value = '';
        emit('edit-board', d.response);
        $bus?.emit('add-toast', 'Board updated.', 'success');
      })
      .catch((e) => {
        console.log(e.response);
        editBoardAskConfirm.value = false;
        editLoading.value = false;
        newDescription.value = '';
        newTitle.value = '';
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });

    // setTimeout(() => {
    //   editBoardAskConfirm.value = false;
    //   editLoading.value = false;
    //   newDescription.value = '';
    //   newTitle.value = '';
    // }, 1000);
  }

  function handleEditBoard() {
    editBoardAskConfirm.value = true;
  }
</script>
