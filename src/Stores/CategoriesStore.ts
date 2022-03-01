import { defineStore } from 'pinia';
import { ICategory } from '../Interfaces/Board/ICategory';
import { IBoard } from '../Interfaces/Board/IBoard';

export const useCategories = defineStore('categoriesStore', {
  state: () => ({
    categories: <ICategory[]>[],
  }),
  getters: {
    getCategories(state): ICategory[] {
      return state.categories;
    },
  },
  actions: {
    setCategories(value: ICategory[]) {
      this.categories = value;
    },
    updateCategoryBoards(category: number, board: IBoard) {
      const cat = this.categories.find((c) => c.id === category);
      if (cat) cat.boards.push(board);
    },
  },
});
