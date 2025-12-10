import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useFavoritesStore } from '../src/stores/favorites';

function createStore() {
  setActivePinia(createPinia());
  return useFavoritesStore();
}

describe('useFavoritesStore', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('adds favorites and persists to storage', () => {
    const store = useFavoritesStore();
    store.add('p1');

    expect(store.ids).toEqual(['p1']);
    expect(store.map).toMatchObject({ p1: true });
    expect(store.count).toBe(1);
    expect(JSON.parse(localStorage.getItem('favorites') || '[]')).toEqual(['p1']);
  });

  it('does not add duplicates', () => {
    const store = useFavoritesStore();
    store.add('p1');
    store.add('p1');

    expect(store.ids).toEqual(['p1']);
    expect(store.count).toBe(1);
  });

  it('toggles items on and off', () => {
    const store = useFavoritesStore();
    store.toggle('p1');
    expect(store.isFavorite('p1')).toBe(true);

    store.toggle('p1');
    expect(store.isFavorite('p1')).toBe(false);
    expect(store.count).toBe(0);
  });

  it('removes existing item and ignores missing ones', () => {
    const store = useFavoritesStore();
    store.add('p1');
    store.remove('p1');
    store.remove('p1'); // should be noop

    expect(store.ids).toHaveLength(0);
    expect(store.map).toEqual({});
  });

  it('hydrates from localStorage on creation', () => {
    localStorage.setItem('favorites', JSON.stringify(['p1', 'p2']));
    const store = createStore();

    expect(store.ids).toEqual(['p1', 'p2']);
    expect(store.isFavorite('p1')).toBe(true);
    expect(store.isFavorite('p2')).toBe(true);
    expect(store.count).toBe(2);
  });

  it('clears favorites and storage', () => {
    const store = useFavoritesStore();
    store.add('p1');
    store.add('p2');

    store.clear();
    expect(store.ids).toEqual([]);
    expect(store.map).toEqual({});
    expect(JSON.parse(localStorage.getItem('favorites') || '[]')).toEqual([]);
  });
});
