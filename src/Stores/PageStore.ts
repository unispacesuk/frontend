import { defineStore } from 'pinia';

export const usePage = defineStore('pageStore', {
  state: () => ({
    loading: <boolean>true,
    layout: 'layout',
  }),
  getters: {
    loadingState(): boolean {
      return this.loading;
    },
    getPageLayout(): string {
      return this.layout;
    },
  },
  actions: {
    setPageLoading(v: boolean) {
      this.loading = v;
    },
    setPageLayout(v: string) {
      this.layout = v;
    },
  },
});
