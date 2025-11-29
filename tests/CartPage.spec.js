import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CartPage from '../src/pages/CartPage.vue';
import { useCartStore } from '../src/stores/cart';
import { useProductsStore } from '../src/stores/products';

const ButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

const CardStub = { template: '<div><slot /></div>' };
const InputStub = { template: '<input />' };
const SelectStub = { template: '<select><slot /></select>' };
const DatePickerStub = { template: '<input />' };
const CheckboxStub = { template: '<input type="checkbox" />' };
const DividerStub = { template: '<hr />' };
const AlertStub = { template: '<div><slot /></div>' };

function mountCartPage() {
  setActivePinia(createPinia());
  const productsStore = useProductsStore();
  productsStore.setProducts([
    {
      id: 'cake-1',
      name: 'Test Cake',
      price: 10,
      shortDescription: 'Short desc',
      flavors: [],
      allergens: [],
      quantities: [],
      mainImage: null,
    },
  ]);

  const cartStore = useCartStore();
  cartStore.clearCart();
  cartStore.addItem('cake-1', 10, { quantity: 1 });

  const wrapper = mount(CartPage, {
    global: {
      stubs: {
        RouterLink: { template: '<a><slot /></a>' },
        'n-button': ButtonStub,
        'n-card': CardStub,
        'n-input': InputStub,
        'n-select': SelectStub,
        'n-date-picker': DatePickerStub,
        'n-checkbox': CheckboxStub,
        'n-divider': DividerStub,
        'n-alert': AlertStub,
        'n-tag': CardStub,
        'n-space': CardStub,
        'n-grid': CardStub,
        'n-grid-item': CardStub,
      },
    },
  });

  return { wrapper, cartStore };
}

function findButtonByText(wrapper, text) {
  return wrapper.findAll('button').find((btn) => btn.text() === text);
}

describe('CartPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('increments quantity when + is clicked', async () => {
    const { wrapper, cartStore } = mountCartPage();
    expect(cartStore.items[0].quantity).toBe(1);

    const plusBtn = findButtonByText(wrapper, '+');
    expect(plusBtn).toBeTruthy();
    await plusBtn.trigger('click');

    expect(cartStore.items[0].quantity).toBe(2);
    const qtyText = wrapper.find('.qty-value').text();
    expect(qtyText).toBe('2');
  });

  it('removes item when remove button is clicked', async () => {
    const { wrapper, cartStore } = mountCartPage();
    expect(cartStore.items.length).toBe(1);

    const removeBtn = findButtonByText(wrapper, '✕');
    expect(removeBtn).toBeTruthy();
    await removeBtn.trigger('click');

    expect(cartStore.items.length).toBe(0);
  });
});
