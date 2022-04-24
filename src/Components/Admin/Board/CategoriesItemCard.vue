<template>
  <div class="relative flex group">
    <div
      class="bg-gray-200 absolute top-0 left-0 w-full h-full rounded-md smooth z-0 group-hover:rotate-3"
    ></div>
    <div class="w-full bg-white border border-gray-200 rounded-md shadow p-3 z-10">
      <div
        class="text-md border-b border-gray-200 px-2 pb-3 font-bold cursor-pointer hover:bg-gray-50"
        @click="onClickOpenBoardsDialog"
      >
        {{ category.title }}<br />
        <div class="font-light text-sm whitespace-nowrap overflow-x-hidden truncate">
          {{ category.description }}
        </div>
      </div>
      <div>
        <div v-if="state.isLoadingStats">Loading Stats...</div>

        <div v-else class="flex space-x-4 p-5 text-sm">
          <div>Boards: {{ state.stats.board_count }}</div>
          <div>Threads: {{ state.stats.thread_count }}</div>
          <div>Replies: {{ state.stats.reply_count }}</div>
        </div>
      </div>
      <div class="flex space-x-2 justify-end">
        <ButtonActionCancel
          label="Delete"
          @button-click="onClickOpenDeleteCategoryDialog"
        ></ButtonActionCancel>
        <ButtonActionSecondary
          label="Edit"
          @button-click="state.action = 'editing'"
        ></ButtonActionSecondary>
        <ButtonActionPrimary
          label="Add Board"
          @button-click="emit('add-board')"
        ></ButtonActionPrimary>
      </div>
    </div>
  </div>

  <AddNewCategory
    @close-modal="state.action = ''"
    :action="state.action"
    :id="category.id"
    :title="category.title"
    :description="category.description"
  />

  <BoardCategoryDeleteConfirmModal
    :id="category.id"
    :show-delete-dialog="state.isDeleteDialogOpen"
    @close-modal="onCloseDeleteCategoryDialog"
    @delete-confirm="doDeleteCategory"
  />

  <BoardList
    v-if="state.isBoardsDialogOpen"
    :view-boards="state.isBoardsDialogOpen"
    :category-id="category.id"
    @close-modal="onCloseBoardsDialog"
  />
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { deleteCategory, duplicateCategory } from '../../../Services/Board/BoardsService';
  import { getCategoryStats } from '../../../Services/Statistics/StatisticsService';
  import { ICategory } from '../../../Interfaces/Board/ICategory';
  import { IBus } from '../../../Interfaces/IBus';
  import AddNewCategory from './AddNewCategory.vue';
  import BoardCategoryDeleteConfirmModal from './CategoryDeleteConfirmModal.vue';
  import BoardList from './BoardList.vue';
  import ButtonActionCancel from '../../Buttons/ButtonActionCancel.vue';
  import ButtonActionSecondary from '../../Buttons/ButtonActionSecondary.vue';
  import ButtonActionPrimary from '../../Buttons/ButtonActionPrimary.vue';

  const $bus = inject<IBus>('$bus');

  const props = defineProps<{
    category: ICategory;
  }>();

  const emit = defineEmits<{
    (event: 'add-board'): void;
    (event: 'view-boards', value: boolean): void;
  }>();

  // temp interface
  interface ICatStats {
    board_count: number;
    thread_count: number;
    reply_count: number;
  }

  const state = reactive({
    action: '',
    isDeleteDialogOpen: false,
    isBoardsDialogOpen: false,
    isLoadingStats: true,
    stats: <ICatStats>{},
  });

  getCategoryStats(props.category.id).then((data) => {
    state.stats = data.response[0];
    state.isLoadingStats = false;
  });

  function doDeleteCategory() {
    deleteCategory(props.category.id)
      .then(() => {
        $bus?.emit('add-toast', 'Category Deleted.', 'success');
        $bus?.emit('refresh-categories');
        onCloseDeleteCategoryDialog();
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function doDuplicateCategory() {
    duplicateCategory(props.category.id)
      .then(() => {
        $bus?.emit('add-toast', 'Category Duplicated.', 'success');
        $bus?.emit('refresh-categories');
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function onClickOpenBoardsDialog() {
    state.isBoardsDialogOpen = true;
  }

  function onCloseBoardsDialog() {
    state.isBoardsDialogOpen = false;
  }

  function onClickOpenDeleteCategoryDialog() {
    state.isDeleteDialogOpen = true;
  }

  function onCloseDeleteCategoryDialog() {
    state.isDeleteDialogOpen = false;
  }

  defineExpose({
    state,
    onClickOpenBoardsDialog,
    onCloseBoardsDialog,
    onClickOpenDeleteCategoryDialog,
    onCloseDeleteCategoryDialog,
  });
</script>
