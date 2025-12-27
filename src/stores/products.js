import { defineStore } from 'pinia';
import { products as staticProducts } from '../data/products';

function buildIndex(products) {
  const map = {};
  for (const p of products) {
    map[p.id] = p;
  }
  return map;
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    // source array for lists, filters, etc.
    products: staticProducts,

    // fast lookup by id: productsById[id] -> product
    productsById: buildIndex(staticProducts),
  }),

  getters: {
    allProducts(state) {
      return state.products;
    },

    // fast lookup
    getById: (state) => (id) => {
      return state.productsById[id] || null;
    },

    byCategory: (state) => (category) => {
      return state.products.filter((p) => p.category === category);
    },
  },

  actions: {
    // use this if in another project you load products from API
    setProducts(newProducts) {
      this.products = newProducts;
      this.productsById = buildIndex(newProducts);
    },

    // optional: add single product (for admin-like UIs)
    addProduct(product) {
      this.products.push(product);
      this.productsById[product.id] = product;
    },

    // optional: update product
    updateProduct(updated) {
      const index = this.products.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        this.products[index] = updated;
        this.productsById[updated.id] = updated;
      }
    },
  },
});
