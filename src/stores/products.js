// src/stores/products.js
import { defineStore } from 'pinia';
import { products as staticProducts } from '../data/products';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: staticProducts,
  }),

  getters: {
    allProducts(state) {
      return state.products;
    },
    getById: (state) => (id) => {
      return state.products.find((p) => p.id === id);
    },
    byType: (state) => (type) => {
      return state.products.filter((p) => p.type === type);
    },
  },
});
