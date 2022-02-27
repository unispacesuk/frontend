<template>
  <div>
    <div class="flex items-center justify-between px-5 py-3">
      <div class="text-lg">Board Categories</div>
      <div>
        <Button type="primary" @button-click="addingCategory = !addingCategory">
          Add New Category
        </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
      <div v-for="(category, index) of getCategories" :key="index">
        <BoardCategoriesItemCard :category="category" />
      </div>
    </div>

    <AddNewCategory :adding-category="addingCategory" @close-modal="doCloseModal" />
  </div>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Button from '../Buttons/Button.vue';
  import AddNewCategory from './AddNewCategory.vue';
  import { IBus } from '../../Interfaces/IBus';

  import { useCategories } from '../../Stores/CategoriesStore';
  import BoardCategoriesItemCard from './BoardCategoriesItemCard.vue';
  import { fetchAllCategories } from './Helpers';
  const categoriesStore = useCategories();
  const { categories, getCategories } = storeToRefs(useCategories());

  const $bus = inject<IBus>('$bus');
  const addingCategory = ref<boolean>(false);

  onBeforeMount(async () => {
    await handleAllCategories();
    $bus?.listen('refresh-categories', handleAllCategories);
  });

  async function handleAllCategories() {
    await fetchAllCategories(categoriesStore, $bus);
  }

  function doCloseModal(value: boolean) {
    addingCategory.value = value;
  }
</script>
