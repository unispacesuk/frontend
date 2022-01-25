<template>
  <!--  <button @click="addingBoard = true">Add Board</button>-->
  <div v-if="data.categories.length === 0">You haven't added any categories yet.</div>

  <div v-if="data.categories.length > 0" v-for="category in data.categories">
    <Category :category="category" @add-board="newBoard" />
  </div>

  <div v-if="addingBoard">
    <Modal @close-modal="closeModal">
      <AddBoard :category="selectedCategory" @submit-board="addBoard" />
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { getAllCategories, addBoard } from '../../Services/Board/BoardsService';
import Category from '../../Components/Board/Category.vue';
import Modal from '../../Components/Modal/Modal.vue';
import AddBoard from '../../Components/Board/Forms/AddBoard.vue';
import { ICategory } from '../../Interfaces/Board/ICategory';

export default defineComponent({
  name: 'Boards',
  components: { AddBoard, Category, Modal },
  setup() {
    // const categories = ref<ICategory[]>([]);
    const data = reactive({
      categories: [],
    });
    const addingBoard = ref<boolean>(false);
    const selectedCategory = ref<ICategory>();

    return {
      data,
      addingBoard,
      selectedCategory,
    };
  },
  beforeMount() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      getAllCategories().then((data) => {
        this.data.categories = data.body.categories;
      });
    },
    async addBoard(body: any) {
      // const newBoard = await addBoard();
      const newBoard = await addBoard(body)
      this.closeModal();
      this.data.categories.map((c: any) => {
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
