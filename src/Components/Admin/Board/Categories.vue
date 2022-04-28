<template>
  <div>
    <div class="flex items-center justify-between px-5 py-3">
      <div class="text-lg">Board Categories</div>
      <div>
        <ButtonActionPrimary
          label="Add New Category"
          @button-click="action = 'adding'"
        ></ButtonActionPrimary>
      </div>
    </div>
    <div v-if="state.isLoadingCats" class="flex justify-center">
      <Spinner class="w-5" />
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-5">
        <div v-for="(category, index) of cats" :key="index">
          <CategoriesItemCard :category="category" @add-board="handleAddNewBoard(category.id)" />
        </div>
        <div v-if="!cats.length">No categories added yet.</div>
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

    <AddNewCategory :action="action" @close-modal="handleCloseModal" />
    <AddNewBoard
      :adding-board="addingBoard"
      :category-id="addingBoardCatId"
      @close-modal="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, reactive, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCategories } from '../../../Stores/CategoriesStore';
  import { ICategory } from '../../../Interfaces/Board/ICategory';
  import { IBus } from '../../../Interfaces/IBus';
  import AddNewCategory from './AddNewCategory.vue';
  import CategoriesItemCard from './CategoriesItemCard.vue';
  import Pagination from '../../Pagination/Pagination.vue';
  import Spinner from '../../../Icons/Util/Spinner.vue';
  import AddNewBoard from './AddNewBoard.vue';
  import ButtonActionPrimary from '../../Buttons/ButtonActionPrimary.vue';
  import { getAllCategories } from '../../../Services/Board/BoardsService';

  const categoriesStore = useCategories();
  const { getCategories } = storeToRefs(useCategories());

  const $bus = inject<IBus>('$bus');
  const action = ref<string>('');
  const addingBoard = ref<boolean>(false);
  const addingBoardCatId = ref<number>(0);

  const cats = ref<ICategory[]>([]);
  const currentPage = ref<number>(0);
  const pages = ref<number>(0);

  const state = reactive({
    isLoadingCats: false,
  });

  onBeforeMount(async () => {
    await handleAllCategories();
    $bus?.listen('refresh-categories', handleAllCategories);
    currentPage.value = 1;
  });

  watch(getCategories, () => {
    cats.value = getCategories.value.slice(0, 6);
    pages.value = Math.ceil(getCategories.value.length / 6);
    state.isLoadingCats = false;
  });

  // TODO: stats route is broken because it only works if we have boards....
  async function handleAllCategories() {
    getAllCategories()
      .then((d) => {
        categoriesStore.setCategories(d.categories);
      })
      .catch((e) => {
        if (e.response) {
          const error = e.response.data.error;
          // console.log(error);
          $bus?.emit('add-toast', 'Something went wrong.', 'error');
        }
      });
  }

  function handleCloseModal(value: boolean) {
    if (action.value) return (action.value = '');
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
