import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '../src/stores/cart';

function createCartStore() {
  setActivePinia(createPinia());
  return useCartStore();
}

describe('useCartStore', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('adds items and persists them to localStorage', () => {
    const cart = useCartStore();
    cart.addItem('p1', 5);

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toMatchObject({ id: 'p1', quantity: 1, unitPrice: 5, variantId: null });
    expect(JSON.parse(localStorage.getItem('cart') || '[]')).toHaveLength(1);

    // new store instance should hydrate from saved cart
    const hydrated = createCartStore();
    expect(hydrated.items).toHaveLength(1);
    expect(hydrated.itemsByKey['p1']).toBeDefined();
  });

  it('increments quantity when adding the same product/variant', () => {
    const cart = useCartStore();
    cart.addItem('p1', 5);
    cart.addItem('p1', 5, { quantity: 2 });

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(3);
  });

  it('stores variants separately', () => {
    const cart = useCartStore();
    cart.addItem('p1', 5, { variantId: 'v1' });
    cart.addItem('p1', 5, { variantId: 'v2' });

    expect(cart.items).toHaveLength(2);
    expect(cart.itemsByKey['p1::v1'].variantId).toBe('v1');
    expect(cart.itemsByKey['p1::v2'].variantId).toBe('v2');
  });

  it('sets quantity and removes item when quantity <= 0', () => {
    const cart = useCartStore();
    cart.addItem('p1', 5);

    cart.setQuantity('p1', null, 5);
    expect(cart.items[0].quantity).toBe(5);

    cart.setQuantity('p1', null, 0);
    expect(cart.items).toHaveLength(0);
  });

  it('computes itemCount and cartTotal', () => {
    const cart = useCartStore();
    cart.addItem('p1', 5, { quantity: 2 });
    cart.addItem('p2', 10, { quantity: 1 });

    expect(cart.itemCount).toBe(3);
    expect(cart.cartTotal).toBe(20);
  });

  it('clears cart and storage', () => {
    const cart = useCartStore();
    cart.addItem('p1', 5);
    expect(cart.items).not.toHaveLength(0);

    cart.clearCart();
    expect(cart.items).toHaveLength(0);
    expect(cart.itemsByKey).toEqual({});
    expect(JSON.parse(localStorage.getItem('cart') || '[]')).toHaveLength(0);
  });
});
