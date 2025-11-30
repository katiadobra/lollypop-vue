import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ProductDetailPage from '../src/pages/ProductDetailPage.vue';
import { useProductsStore } from '../src/stores/products';
import { useCartStore } from '../src/stores/cart';
import { useUiStore } from '../src/stores/ui';

const routeParams = { id: 'test-product' };

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: routeParams,
  }),
}));

const ButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

const SelectStub = {
  props: ['value', 'options'],
  emits: ['update:value'],
  template: `
    <select :value="value" @change="$emit('update:value', $event.target.value)">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
  `,
};

const TagStub = { template: '<span><slot /></span>' };
const RecommendedStub = { template: '<div class="recommended-products-stub"></div>' };

const globalStubs = {
  RouterLink: { template: '<a><slot /></a>' },
  'n-button': ButtonStub,
  'n-select': SelectStub,
  'n-tag': TagStub,
  RecommendedProducts: RecommendedStub,
};

function findButtonByText(wrapper, text) {
  return wrapper.findAll('button').find((btn) => btn.text() === text);
}

function buildProduct(overrides = {}) {
  return {
    id: 'test-product',
    name: 'Test Product',
    description: 'Tasty treat',
    price: 7,
    type: 'cupcake',
    flavors: ['Vanilla', 'Chocolate'],
    allergens: ['Dairy'],
    quantities: [6, 12],
    mainImage: null,
    gallery: [],
    ...overrides,
  };
}

function mountProductDetail(productOverrides = {}) {
  setActivePinia(createPinia());
  const productsStore = useProductsStore();
  const cartStore = useCartStore();
  const uiStore = useUiStore();

  const product = buildProduct(productOverrides);
  routeParams.id = product.id;
  productsStore.setProducts([product]);
  cartStore.clearCart();

  const wrapper = mount(ProductDetailPage, {
    global: {
      stubs: globalStubs,
    },
  });

  return { wrapper, product, cartStore, uiStore };
}

describe('ProductDetailPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders product information and updates total when quantity changes', async () => {
    const { wrapper } = mountProductDetail({ price: 5 });

    expect(wrapper.find('.title').text()).toBe('Test Product');
    expect(wrapper.find('.price-value').text()).toContain('5');
    expect(wrapper.find('.total-value').text()).toContain('5');

    expect(findButtonByText(wrapper, '+')).toBeTruthy();
    expect(wrapper.vm.quantity).toBe(1);

    wrapper.vm.increment();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.quantity-value').text()).toBe('2');
    expect(wrapper.find('.total-value').text()).toContain('10');
  });

  it('uses selected flavor and box size when adding to cart', async () => {
    const { wrapper, product, cartStore, uiStore } = mountProductDetail();

    expect(wrapper.vm.selectedFlavor).toBe(product.flavors[0]);
    expect(wrapper.vm.selectedBoxQuantity).toBe(product.quantities[0]);

    wrapper.vm.selectedFlavor = 'Chocolate';
    wrapper.vm.selectedBoxQuantity = 12;
    wrapper.vm.quantity = 2;
    await wrapper.vm.$nextTick();

    expect(findButtonByText(wrapper, 'Add to cart')).toBeTruthy();
    await wrapper.vm.addCurrentToCart();

    expect(cartStore.items).toHaveLength(1);
    expect(cartStore.items[0]).toMatchObject({
      id: product.id,
      quantity: 2,
      variantId: 'flavor:Chocolate|box:12',
      unitPrice: product.price,
    });
    expect(uiStore.cartDrawerOpen).toBe(true);
  });

  it('shows not found state when product is missing', () => {
    setActivePinia(createPinia());
    const productsStore = useProductsStore();
    useCartStore().clearCart();
    routeParams.id = 'missing-product';
    productsStore.setProducts([]);

    const wrapper = mount(ProductDetailPage, {
      global: { stubs: globalStubs },
    });

    expect(wrapper.text()).toContain('Product not found');
    expect(wrapper.find('.purchase').exists()).toBe(false);
  });
});
