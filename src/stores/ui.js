import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    cartDrawerOpen: false,
  }),
  actions: {
    openCartDrawer() {
      this.cartDrawerOpen = true;
    },
    closeCartDrawer() {
      this.cartDrawerOpen = false;
    },
    toggleCartDrawer() {
      this.cartDrawerOpen = !this.cartDrawerOpen;
    },
  },
});
