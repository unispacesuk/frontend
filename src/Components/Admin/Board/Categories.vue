<template>
  <div class="border-b border-gray-200">
    <div class="flex items-center justify-between px-5 py-3">
      <div class="text-lg">Board Categories</div>
      <div>
        <Button type="primary" @button-click="addingCategory = !addingCategory">
          Add New Category
        </Button>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center">
      <Spinner class="w-5" />
    </div>

    <div v-if="!loading">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        <div v-for="(category, index) of cats" :key="index">
          <BoardCategoriesItemCard
            :category="category"
            @add-board="handleAddNewBoard(category.id)"
          />
        </div>
        <div v-if="cats.length === 0">No categories added yet.</div>
      </div>
      <Pagination
        :pages="pages"
        :show-numbers="true"
        :current-page="currentPage"
        @next-page="nextPage"
        @prev-page="previousPage"
        @go-to="goToPage"
      />
    </div>

    <AddNewCategory :adding-category="addingCategory" @close-modal="handleCloseModal" />
    <AddNewBoard
      :adding-board="addingBoard"
      :category-id="addingBoardCatId"
      @close-modal="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCategories } from '../../../Stores/CategoriesStore';
  import { fetchAllCategories } from '../Helpers';
  import { ICategory } from '../../../Interfaces/Board/ICategory';
  import { IBus } from '../../../Interfaces/IBus';
  import Button from '../../Buttons/Button.vue';
  import AddNewCategory from './AddNewCategory.vue';
  import BoardCategoriesItemCard from './CategoriesItemCard.vue';
  import Pagination from '../../Pagination/Pagination.vue';
  import Spinner from '../../../Icons/Util/Spinner.vue';
  import AddNewBoard from './AddNewBoard.vue';
  import { getAllCategories } from '../../../Services/Board/BoardsService';

  const categoriesStore = useCategories();
  const { categories, getCategories } = storeToRefs(useCategories());

  const $bus = inject<IBus>('$bus');
  const addingCategory = ref<boolean>(false);
  const addingBoard = ref<boolean>(false);
  const addingBoardCatId = ref<number>(0);

  const cats = ref<ICategory[]>([]);
  const currentPage = ref<number>(0);
  const pages = ref<number>(0);

  const loading = ref<boolean>(true);

  onBeforeMount(async () => {
    await handleAllCategories();
    $bus?.listen('refresh-categories', handleAllCategories);
    currentPage.value = 1;
  });

  watch(getCategories, () => {
    cats.value = getCategories.value.slice(0, 6);
    pages.value = Math.ceil(getCategories.value.length / 6);
    loading.value = false;
  });

  async function handleAllCategories() {
    getAllCategories()
      .then((d) => {
        categoriesStore.setCategories(d.categories);
      })
      .catch((e) => {
        if (e.response) {
          const error = e.response.data.error;
          console.log(error);
          $bus?.emit('add-toast', error, 'error');
        }
      });
    // await fetchAllCategories(categoriesStore, $bus);
  }

  function handleCloseModal(value: boolean) {
    if (addingCategory.value) return (addingCategory.value = value);
    if (addingBoard.value) return (addingBoard.value = value);
  }

  function handleAddNewBoard(id: number) {
    addingBoard.value = true;
    addingBoardCatId.value = id;
  }

  function nextPage() {
    if (currentPage.value < pages.value) {
      currentPage.value++;
      cats.value = getCategories.value.slice((currentPage.value - 1) * 6, currentPage.value * 6);
    }
  }

  function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
      cats.value = getCategories.value.slice((currentPage.value - 1) * 6, currentPage.value * 6);
    }
  }

  function goToPage(page: number) {
    currentPage.value = page;
    cats.value = getCategories.value.slice((currentPage.value - 1) * 6, currentPage.value * 6);
  }
</script>
