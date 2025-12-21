<template>
  <div class="landing">
    <section class="landing-hero">
      <div class="hero-content">
        <p class="hero-kicker">Zucker · Wünsdorf</p>
        <h1>Einfach süß, crafted to delight.</h1>
        <p class="hero-lead">
          Fresh cakes, rolls, and tarts balanced with fruit-first fillings and airy creams. Built to
          stay light, look bold, and arrive party-ready.
        </p>
        <div class="hero-actions">
          <RouterLink to="/products" class="link-button">
            <n-button size="large" round color="#ff69b4">Browse menu</n-button>
          </RouterLink>
          <RouterLink to="/how-to-order" class="link-button">
            <n-button size="large" tertiary round>How to order</n-button>
          </RouterLink>
        </div>
      </div>
    </section>

<nav class="category-tabs" ref="tabsRef">
  <a
    v-for="category in categories"
    :key="category.id"
    class="tab"
    :class="{ 'tab--active': activeCategory === category.id }"
    :ref="setTabRef(category.id)"
    href="#"
    @click.prevent="scrollToCategory(category.id)"
  >
    {{ category.label }}
  </a>
</nav>

    <section
      v-for="category in categories"
      :key="category.id"
      :id="category.id"
      :ref="setSlideRef(category.id)"
      class="category-slide"
      :class="{ 'category-slide--active': activeCategory === category.id }"
    >
      <div class="slide-inner">
        <p class="slide-kicker">Collection</p>
        <h2>{{ category.label }}</h2>
        <p class="slide-copy">{{ category.copy }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { NButton } from 'naive-ui';
import { RouterLink } from 'vue-router';

const categories = [
  {
    id: 'cake',
    label: 'Signature cakes',
    copy: 'Layered bases with fruit-first fillings and light chantilly for centrepiece celebrations.',
  },
  {
    id: 'cinnamon-roll',
    label: 'Cinnabons',
    copy: 'Slow-proofed rolls with buttery spirals and bright glazes that stay soft for hours.',
  },
  {
    id: 'tart',
    label: 'Bright tarts',
    copy: 'Crisp pâte sablée shells with citrus curds, pralines, and roasted nuts.',
  },
  {
    id: 'long-cake',
    label: 'Long cakes',
    copy: 'Sliceable sponge rolls with fruit jams and light creams, ready to portion and share.',
  },
  {
    id: 'cookie',
    label: 'Cookies',
    copy: 'Chewy rounds with toasted nuts, spice, and big chocolate chunks.',
  },
  {
    id: 'choux',
    label: 'Choux',
    copy: 'Filled profiteroles and éclairs with vanilla, coffee, or praline finishes.',
  },
  {
    id: 'cupcake',
    label: 'Cupcakes',
    copy: 'Individual sponge bases topped with light whipped frostings.',
  },
];

const TABS_HEIGHT = 49;
const activeCategory = ref(null);
const slideRefs = new Map();
const tabRefs = new Map();
const tabsRef = ref(null);

const setSlideRef = (id) => (el) => {
  if (el) {
    slideRefs.set(id, el);
  } else {
    slideRefs.delete(id);
  }
};

const setTabRef = (id) => (el) => {
  if (el) {
    tabRefs.set(id, el);
  } else {
    tabRefs.delete(id);
  }
};

function scrollToCategory(id) {
  const el = slideRefs.get(id);
  if (!el) return;
  const targetTop = el.getBoundingClientRect().top + window.scrollY - TABS_HEIGHT;
  activeCategory.value = id;
  window.scrollTo({ top: targetTop, behavior: 'smooth' });
}

function scrollActiveTabIntoView(id) {
  if (!id) return;
  const tabEl = tabRefs.get(id);
  const container = tabsRef.value;
  if (!tabEl || !container) return;
  tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function updateActiveFromScroll() {
  const marker = window.scrollY + TABS_HEIGHT + 1;
  let current = activeCategory.value;

  const firstSlide = slideRefs.get(categories[0].id);
  if (firstSlide && marker < firstSlide.offsetTop) {
    activeCategory.value = current;
    return;
  }

  for (const category of categories) {
    const el = slideRefs.get(category.id);
    if (!el) continue;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (marker >= top && marker < bottom) {
      current = category.id;
      break;
    }
  }

  activeCategory.value = current;
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
  updateActiveFromScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveFromScroll);
});

watch(activeCategory, (id) => {
  scrollActiveTabIntoView(id);
});
</script>

<style scoped>
:global(:root) {
  --header-height: 80px;
  --announcement-height: 32px;
  --tabs-height: 49px;
}

.landing {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.landing-hero {
  height: calc(100vh - var(--header-height) - var(--announcement-height) - var(--tabs-height));
  width: 100%;
  background: radial-gradient(circle at 20% 20%, #ffe6f2 0%, #ffffff 55%), #fff5fb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  box-sizing: border-box;
}

.hero-content {
  width: min(680px, 100%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  margin: 0 auto;
}

.hero-kicker {
  margin: 0;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ff69b4;
  font-size: 12px;
}

.hero-lead {
  margin: 0;
  color: #4b5563;
  font-size: 18px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.category-tabs {
  position: sticky;
  top: 0;
  z-index: 25;
  display: flex;
  gap: 0;
  padding: 0;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.tab {
  border: none;
  background: transparent;
  padding: 10px 12px;
  font-size: 15px;
  cursor: pointer;
  color: #111827;
  transition: background-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;
  text-decoration: none;
}

.tab:hover {
  background: rgb(255, 230, 242);
  color: rgb(255, 105, 180);
}

.tab--active {
  background: rgb(255, 230, 242);
  color: rgb(255, 105, 180);
}

.category-slide {
  height: calc(100vh - var(--tabs-height));
  padding: 0;
  background: #fff;
  transition: background-color 0.2s ease;
  box-shadow: inset 0 0 0 2px rgba(255, 105, 180, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-slide--active {
  background: #fff;
}

.slide-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px 16px 48px;
}

.slide-kicker {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  color: #9ca3af;
}

.slide-copy {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

.link-button {
  text-decoration: none;
}

@media (min-width: 640px) {
  .category-tabs {
    justify-content: space-between;
    overflow-x: initial;
  }

  .tab {
    width: 100%;
    padding: 12px 16px;
  }
}
</style>
