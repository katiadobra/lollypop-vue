import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ImpressumPage from '../src/pages/ImpressumPage.vue';
import PrivacyPolicyPage from '../src/pages/PrivacyPolicyPage.vue';
import TermsConditionsPage from '../src/pages/TermsConditionsPage.vue';
import TermsOfUsePage from '../src/pages/TermsOfUsePage.vue';
import NotFoundPage from '../src/pages/NotFoundPage.vue';

const RouterLinkStub = {
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
};

const ResultStub = {
  template: `
    <div class="result-stub">
      <slot name="icon"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  `,
};

const ButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

describe('Static pages', () => {
  it('renders key Impressum content', () => {
    const wrapper = mount(ImpressumPage);
    expect(wrapper.find('h1').text()).toContain('IMPRESSUM');
    expect(wrapper.text()).toContain('Datenschutzerklärung');
    expect(wrapper.text()).toContain('Wünsdorf');
  });

  it('renders Privacy Policy essentials', () => {
    const wrapper = mount(PrivacyPolicyPage);
    expect(wrapper.find('h1').text()).toBe('Privacy Policy');
    expect(wrapper.text()).toContain('What we collect');
    expect(wrapper.text()).toContain('Your rights');
  });

  it('renders Terms Conditions page', () => {
    const wrapper = mount(TermsConditionsPage);
    expect(wrapper.find('h1').text()).toBe('Terms & Conditions');
    expect(wrapper.text()).toContain('Lead times');
    expect(wrapper.text()).toContain('Payment');
  });

  it('renders Terms of Use page', () => {
    const wrapper = mount(TermsOfUsePage);
    expect(wrapper.find('h1').text()).toBe('Terms Of Use');
    expect(wrapper.text()).toContain('Orders & lead times');
    expect(wrapper.text()).toContain('Allergies');
  });

  it('renders 404 page with navigation back to products', () => {
    const wrapper = mount(NotFoundPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          'n-result': ResultStub,
          'n-button': ButtonStub,
        },
      },
    });

    expect(wrapper.text()).toContain('404 Page Not Found');
    const cta = wrapper.find('a[href="/products"]');
    expect(cta.exists()).toBe(true);
    expect(cta.text()).toContain('Find Some Treats');
  });
});
