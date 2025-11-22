// src/stores/cart.js

// cart item structure:
// {
//   id: string (product id)
//   variantId: string | null (variant id , e.g. '1kg', 'vegan' or null)
//   quantity: number 
//   unitPrice: number (snapshot of price at the moment of adding to cart)
// }

import { defineStore } from 'pinia';

function makeKey(productId, variantId) {
  return variantId ? `${productId}::${variantId}` : productId;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    // array for rendering
    items: [],
    // map for scalable lookup by product + variant
    itemsByKey: {}, // key -> item
  }),

  getters: {
    itemCount(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    cartTotal(state) {
      return state.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
    },
    hasItems(state) {
      return state.items.length > 0;
    },
  },

  actions: {
    addItem(productId, unitPrice, options = {}) {
      const variantId = options.variantId || null;
      const key = makeKey(productId, variantId);

      const existing = this.itemsByKey[key];
      if (existing) {
        existing.quantity += options.quantity || 1;
      } else {
        const item = {
          id: productId,
          variantId,
          quantity: options.quantity || 1,
          unitPrice,
        };
        this.items.push(item);
        this.itemsByKey[key] = item;
      }
    },

    setQuantity(productId, variantId, quantity) {
      const key = makeKey(productId, variantId || null);
      const item = this.itemsByKey[key];
      if (!item) return;

      if (quantity <= 0) {
        this.removeItem(productId, variantId);
      } else {
        item.quantity = quantity;
      }
    },

    removeItem(productId, variantId) {
      const key = makeKey(productId, variantId || null);
      const item = this.itemsByKey[key];
      if (!item) return;

      // remove from array
      this.items = this.items.filter((i) => i !== item);
      // remove from map
      delete this.itemsByKey[key];
    },

    clearCart() {
      this.items = [];
      this.itemsByKey = {};
    },
  },
});
