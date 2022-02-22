import { defineStore } from 'pinia';

export const usePage = defineStore('pageStore', {
  state: () => ({
    loading: <boolean>true,
  }),
  getters: {
    loadingState(): boolean {
      return this.loading;
    }
  },
  actions: {
    setPageLoading(v: boolean) {
      this.loading = v;
    }
  }
});
