import { beforeEach, describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import LandingPage from '../src/pages/LandingPage.vue';
import { useProductsStore } from '../src/stores/products';

const RouterLinkStub = {
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
};

const ButtonStub = {
  template: '<button><slot /></button>',
};

describe('LandingPage', () => {
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders hero and category tabs from products', () => {
    const store = useProductsStore();
    // set a small controlled product list so deriveCategories returns predictable categories
    store.setProducts([
      { id: 'p-cinn', category: 'cinnamon-roll', name: 'Cinna Roll' },
      { id: 'p-cookie', category: 'cookie', name: 'Choco Cookie' },
    ]);

    const wrapper = mount(LandingPage, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
          'n-button': ButtonStub,
        },
      },
    });

    // hero title exists
    expect(wrapper.find('.hero-title').exists()).toBe(true);
    // tabs for both categories are rendered
    const tabs = wrapper.findAll('.tab');
    const labels = tabs.map((t) => t.text());
    expect(labels).toEqual(expect.arrayContaining(['Cinnabons', 'Cookies']));
  });

  it('renders parallax images for a category slide', async () => {
    const store = useProductsStore();
    store.setProducts([
      { id: 'p-cup', category: 'cupcakes', name: 'Cupcake' },
    ]);

    const wrapper = mount(LandingPage, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
          'n-button': ButtonStub,
        },
      },
    });

    // find the cupcakes slide and check it has parallax images
    const slide = wrapper.find('#cupcakes');
    expect(slide.exists()).toBe(true);
    const imgs = slide.findAll('img.parallax-img');
    expect(imgs.length).toBeGreaterThan(0);

    // ensure image srcs reference the landing folder (BASE prefix may be present)
    const srcs = imgs.map((i) => i.attributes('src'));
    expect(srcs.some((s) => s && s.includes('landing/cupcakes-left'))).toBe(true);
  });
});
