import { defineStore } from 'pinia';
import { ICategory } from '../Interfaces/Board/ICategory';

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
  },
});
