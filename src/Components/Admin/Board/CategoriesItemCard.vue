<template>
  <div class="relative flex group">
    <div
      class="bg-gray-200 absolute top-0 left-0 w-full h-full rounded-md smooth z-0 group-hover:rotate-3"
    ></div>
    <div class="w-full bg-white border border-gray-200 rounded-md shadow p-3 z-10">
      <div
        class="text-md border-b border-gray-200 px-2 pb-3 font-bold cursor-pointer hover:bg-gray-50"
        @click="handleViewBoards"
      >
        {{ category.title }}<br />
        <div class="font-light text-sm whitespace-nowrap overflow-x-hidden truncate">
          {{ category.description }}
        </div>
      </div>
      <div class="p-5">
        <div>Boards: {{ category.boards.length }}</div>
        <!--        <div>Threads: 15</div>-->
      </div>
      <div class="flex space-x-2 justify-end">
        <Button type="success" @button-click="emit('add-board')">Add Board</Button>
        <!--        <Button type="plain" @button-click="doDuplicateCategory">Duplicate</Button>-->
        <Button type="error" @button-click="showDeleteDialog = true">Delete</Button>
        <Button type="primary" @button-click="editingCategory = true">Edit</Button>
      </div>
      <!--          <div>{{ category.description }}</div>-->
    </div>
  </div>

  <AddNewCategory
    :adding-category="editingCategory"
    @close-modal="editingCategory = false"
    :id="category.id"
    :title="category.title"
    :description="category.description"
    :is-editing="true"
  />

  <BoardCategoryDeleteConfirmModal
    :id="category.id"
    :show-delete-dialog="showDeleteDialog"
    @close-modal="showDeleteDialog = false"
    @delete-confirm="doDeleteCategory"
  />

  <BoardList
    v-if="viewBoards"
    :view-boards="viewBoards"
    :category-id="category.id"
    @close-modal="handleCloseViewBoards"
  />
</template>

<script setup lang="ts">
  import { ref, inject } from 'vue';
  import { deleteCategory, duplicateCategory } from '../../../Services/Board/BoardsService';
  import { ICategory } from '../../../Interfaces/Board/ICategory';
  import { IBus } from '../../../Interfaces/IBus';
  import Button from '../../Buttons/Button.vue';
  import AddNewCategory from './AddNewCategory.vue';
  import BoardCategoryDeleteConfirmModal from './CategoryDeleteConfirmModal.vue';
  import BoardList from './BoardList.vue';

  const props = defineProps<{
    category: ICategory;
  }>();

  const emit = defineEmits<{
    (event: 'add-board'): void;
    (event: 'view-boards', value: boolean): void;
  }>();

  const $bus = inject<IBus>('$bus');
  const editingCategory = ref<boolean>(false);
  const showDeleteDialog = ref<boolean>(false);
  const viewBoards = ref<boolean>(false);

  function doDeleteCategory() {
    deleteCategory(props.category.id)
      .then((d) => {
        $bus?.emit('add-toast', 'Category Deleted.', 'success');
        showDeleteDialog.value = false;
        $bus?.emit('refresh-categories');
      })
      .catch((e) => {
        if (e.response) {
          const error = e.response.data.error;
          console.log(error);
          $bus?.emit('add-toast', error, 'error');
        }
      });
  }

  function doDuplicateCategory() {
    duplicateCategory(props.category.id)
      .then((d) => {
        $bus?.emit('add-toast', 'Category Duplicated.', 'success');
        $bus?.emit('refresh-categories');
      })
      .catch((e) => {
        if (e.response) {
          const error = e.response.data.error;
          console.log(error);
          $bus?.emit('add-toast', error, 'error');
        }
      });
  }

  function handleViewBoards() {
    viewBoards.value = true;
  }

  function handleCloseViewBoards() {
    viewBoards.value = false;
  }
</script>
