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
      <div class="flex justify-between pt-3">
        <div class="text-sm flex space-x-2 items-center">
          <div class="flex">All&nbsp;<span class="hidden md:block">Users</span></div>
          <Toggle :checked="state.isAdminOnly" @toggle-change="onToggleChange" />
          <div class="flex">Admins&nbsp;<span class="hidden md:block">Only</span></div>
        </div>

        <div class="flex space-x-2">
          <div v-if="!editBoardAskConfirm">
            <div v-if="!deleteBoardAskConfirm">
              <ButtonActionCancel
                label="Delete"
                @button-click="handleDeleteBoard"
              ></ButtonActionCancel>
            </div>
            <div v-if="deleteBoardAskConfirm" class="flex space-x-2">
              <ButtonActionCancel
                label="Cancel"
                @button-click="deleteBoardAskConfirm = false"
              ></ButtonActionCancel>
              <ButtonActionPrimary @button-click="handleDeleteBoardConfirm">
                <div>Confirm</div>
                <Spinner class="w-5" v-if="deleteLoading" />
              </ButtonActionPrimary>
            </div>
          </div>
          <div v-if="!deleteBoardAskConfirm">
            <div v-if="!editBoardAskConfirm">
              <ButtonActionPrimary
                label="Edit"
                @button-click="handleEditBoard"
              ></ButtonActionPrimary>
            </div>
            <div v-if="editBoardAskConfirm" class="flex space-x-2">
              <ButtonActionCancel
                label="Cancel"
                v-if="!editLoading"
                @button-click="editBoardAskConfirm = false"
              ></ButtonActionCancel>
              <ButtonActionPrimary class="flex space-x-2" @button-click="handleEditBoardConfirm">
                <div>Confirm</div>
                <Spinner v-if="editLoading" class="w-5" />
              </ButtonActionPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { inject, reactive, ref, computed } from 'vue';
  import { deleteBoard, editBoard, updateAccess } from '../../../Services/Board/BoardsService';
  import { IBoard } from '../../../Interfaces/Board/IBoard';
  import { IBus } from '../../../Interfaces/IBus';
  import Spinner from '../../../Icons/Util/Spinner.vue';
  import Input from '../../Form/Input.vue';
  import ButtonActionPrimary from '../../Buttons/ButtonActionPrimary.vue';
  import ButtonActionCancel from '../../Buttons/ButtonActionCancel.vue';
  import Toggle from '../../Buttons/Toggle.vue';

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

  const newTitle = ref<string>(props.board.title);
  const newDescription = ref<string>(props.board.description);

  const state = reactive({
    isAdminOnly: computed(() => props.board.access === 'admin'),
  });

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
  }

  function handleEditBoard() {
    editBoardAskConfirm.value = true;
  }

  async function onToggleChange(value: boolean) {
    const data = {
      access: value ? 'admin' : 'all',
    };

    await updateAccess(data);
  }
</script>
