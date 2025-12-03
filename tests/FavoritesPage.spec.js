import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import FavoritesPage from '../src/pages/FavoritesPage.vue';
import { useFavoritesStore } from '../src/stores/favorites';
import { useProductsStore } from '../src/stores/products';
import { useCartStore } from '../src/stores/cart';
import { useUiStore } from '../src/stores/ui';

const ButtonStub = {
  // Provide the native event so Vue's @click.stop modifier can call stopPropagation.
  template: '<button @click="$emit(\'click\', $event)"><slot /></button>',
};
const CardStub = { template: '<div><slot /></div>' };

const globalStubs = {
  RouterLink: { template: '<a><slot /></a>' },
  'n-button': ButtonStub,
  'n-space': CardStub,
  'n-card': CardStub,
  'n-grid': CardStub,
  'n-grid-item': CardStub,
  HeartIcon: { template: '<span class="heart-icon-stub"></span>' },
};

function findButtonByText(wrapper, text) {
  return wrapper.findAll('button').find((btn) => btn.text() === text);
}

function mountFavoritesPage() {
  setActivePinia(createPinia());
  const productsStore = useProductsStore();
  const favoritesStore = useFavoritesStore();
  const cartStore = useCartStore();
  const uiStore = useUiStore();

  const sampleProduct = {
    id: 'cake-1',
    name: 'Test Cake',
    shortDescription: 'Tasty',
    price: 12,
    mainImage: null,
  };

  productsStore.setProducts([sampleProduct]);
  favoritesStore.clear();
  favoritesStore.add(sampleProduct.id);
  cartStore.clearCart();

  const wrapper = mount(FavoritesPage, {
    global: {
      stubs: globalStubs,
    },
  });

  return { wrapper, favoritesStore, cartStore, uiStore, sampleProduct };
}

describe('FavoritesPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows empty state when no favorites', () => {
    setActivePinia(createPinia());
    useFavoritesStore().clear();
    useProductsStore().setProducts([]);

    const wrapper = mount(FavoritesPage, {
      global: { stubs: globalStubs },
    });

    expect(wrapper.text()).toContain('No favorites yet');
    expect(wrapper.find('.empty-card').exists()).toBe(true);
  });

  it('renders favorite products and removes on click', async () => {
    const { wrapper, favoritesStore, sampleProduct } = mountFavoritesPage();

    expect(wrapper.text()).toContain(sampleProduct.name);
    expect(favoritesStore.count).toBe(1);

    const removeBtn = findButtonByText(wrapper, 'Remove');
    expect(removeBtn).toBeTruthy();
    await removeBtn.trigger('click');
    await wrapper.vm.$nextTick();

    expect(favoritesStore.count).toBe(0);
    expect(wrapper.text()).toContain('No favorites yet');
  });

  it('adds product to cart and opens drawer', async () => {
    const { wrapper, cartStore, uiStore } = mountFavoritesPage();

    const addBtn = findButtonByText(wrapper, 'Add to cart');
    expect(addBtn).toBeTruthy();
    await addBtn.trigger('click');

    expect(cartStore.items).toHaveLength(1);
    expect(uiStore.cartDrawerOpen).toBe(true);
  });
});
