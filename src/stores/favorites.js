// src/stores/favorites.js
import { defineStore } from 'pinia';

const STORAGE_KEY = 'favorites';

function safeLoad() {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch (error) {
    console.warn('Could not load favorites from storage', error);
    return [];
  }
}

function buildMap(ids) {
  const map = {};
  ids.forEach((id) => {
    map[id] = true;
  });
  return map;
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => {
    const saved = safeLoad();
    return {
      ids: saved,
      map: buildMap(saved),
    };
  },

  getters: {
    isFavorite: (state) => (productId) => !!state.map[productId],
    count(state) {
      return state.ids.length;
    },
    allIds(state) {
      return state.ids;
    },
  },

  actions: {
    persist() {
      try {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids));
      } catch (error) {
        console.warn('Could not persist favorites to storage', error);
      }
    },

    add(productId) {
      if (this.map[productId]) return;
      this.ids.push(productId);
      this.map[productId] = true;
      this.persist();
    },

    remove(productId) {
      if (!this.map[productId]) return;
      this.ids = this.ids.filter((id) => id !== productId);
      delete this.map[productId];
      this.persist();
    },

    toggle(productId) {
      if (this.map[productId]) {
        this.remove(productId);
      } else {
        this.add(productId);
      }
    },

    clear() {
      this.ids = [];
      this.map = {};
      this.persist();
    },
  },
});
