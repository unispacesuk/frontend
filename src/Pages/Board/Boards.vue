<template>
  <button @click="addBoard">Add Board</button>
  <div v-if="categories.length === 0">You haven't added any categories yet.</div>

  <div v-if="categories.length > 0" v-for="category in categories">
    <Category :category="category" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAllCategories, addBoard } from '../../Services/BoardsService';
import Category from '../../Components/Board/Category.vue';

export default defineComponent({
  name: 'Boards',
  components: { Category },
  data() {
    return {
      categories: <any[]>[],
    };
  },
  beforeMount() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      getAllCategories().then((data) => {
        this.categories = data.body.categories;
      });
    },
    async addBoard() {
      const newBoard = await addBoard();
      this.categories.map((c) => {
        if (c.id === newBoard.body.board.categoryId) {
          c.boards.push(newBoard.body.board);
        }
      });
    },
  },
});
</script>
