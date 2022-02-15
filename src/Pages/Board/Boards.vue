<template>
  <!--  <button @click="addingBoard = true">Add Board</button>-->
  <div v-if="loading">
    <BoardsSkeleton />
    <BoardsSkeleton />
  </div>
  <div v-if="!loading">
    <div v-if="categories.length === 0">You haven't added any categories yet.</div>

    <div v-if="categories.length > 0" v-for="category in categories">
      <Category :category="category" @add-board="newBoard" />
    </div>

    <div v-if="addingBoard">
      <Modal @close-modal="closeModal">
        <AddBoard :category="selectedCategory" @submit-board="addBoard" />
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { getAllCategories, addBoard } from '../../Services/Board/BoardsService';
import Category from '../../Components/Board/Category.vue';
import Modal from '../../Components/Modal/Modal.vue';
import AddBoard from '../../Components/Board/Forms/AddBoard.vue';
import { ICategory } from '../../Interfaces/Board/ICategory';
import BoardsSkeleton from '../../Components/Skeletons/BoardsSkeleton.vue';

export default defineComponent({
  name: 'Boards',
  components: { BoardsSkeleton, AddBoard, Category, Modal },
  setup() {
    const categories = ref<any[]>([]);
    const addingBoard = ref<boolean>(false);
    const selectedCategory = ref<ICategory>();
    const loading = ref<boolean>(true);

    onBeforeMount(async () => {
      getAllCategories().then((data) => {
        categories.value = data.body.categories;
        loading.value = false;
      });
    });

    return {
      categories,
      addingBoard,
      selectedCategory,
      loading,
    };
  },
  methods: {
    async addBoard(body: any) {
      // const newBoard = await addBoard();
      const newBoard = await addBoard(body);
      this.closeModal();
      this.categories.map((c: any) => {
        if (c.id === newBoard.body.board.categoryId) {
          c.boards.push(newBoard.body.board);
        }
      });
    },
    newBoard(data: ICategory) {
      this.selectedCategory = data;
      this.addingBoard = true;
    },
    closeModal() {
      this.addingBoard = false;
      this.selectedCategory = undefined;
    },
  },
});
</script>
