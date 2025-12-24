<template>
  <div class="landing">
    <section class="landing-hero">
      <div class="hero-frame">
        <h1 class="hero-title">{ Always bake-to-order }</h1>
        <div class="hero-image-wrap">
          <div class="hero-image-glow"></div>
          <img src="/hero-img.png" alt="Always bake-to-order" class="hero-image" />
        </div>
        <p class="hero-price">Handmade cakes & sweets</p>
        <p class="hero-note">*Browse the collections below</p>
      </div>
    </section>

    <nav class="category-tabs">
      <div class="tabs-inner content-inner" ref="tabsRef">
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
      </div>
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
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px 32px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.hero-frame {
  width: min(1120px, 100%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 105, 180, 0.1);
  color: #c40068;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  font-size: 12px;
}

.hero-kicker {
  margin: 0;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #94a3b8;
  font-size: 12px;
}

.hero-title {
  margin: 0 0 20px;
  font-size: clamp(16px, 4vw, 20px);
  letter-spacing: 6px;
  color: #829399;
  font-weight: 600;
}

.hero-image-wrap {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 8px auto 0;
  overflow: hidden;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.1);
}

.hero-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  background: #fff;
  position: relative;
  z-index: 1;
}

.hero-image-glow {
  position: absolute;
  inset: 0;
  background: none;
  filter: blur(30px);
  z-index: 0;
  pointer-events: none;
  display: none;
}

.hero-price {
  margin: 18px 0 0;
  font-size: clamp(20px, 2.6vw, 26px);
  letter-spacing: 4px;
  color: #7a8c92;
}

.hero-note {
  margin: 4px 0 0;
  letter-spacing: 3px;
  color: #9ca3af;
  font-size: 14px;
}

.category-tabs {
  position: sticky;
  top: 0;
  z-index: 25;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.tabs-inner {
  display: flex;
  gap: 0;
  padding: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs-inner::-webkit-scrollbar {
  display: none;
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
    box-shadow: inset 0px 0px 20px -5px rgba(255, 105, 180, 0.3);
  border-bottom: 1px solid #ffe5f3;
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

@media (max-width: 639px) {
  .landing-hero {
    height: min(64vh, calc(100vh - var(--header-height) - var(--announcement-height) - var(--tabs-height)));
    padding: 28px 12px 18px;
  }

  .hero-title {
    letter-spacing: 3px;
  }
}

@media (min-width: 640px) {
  .tabs-inner {
    justify-content: space-between;
    overflow-x: initial;
  }

  .tab {
    width: 100%;
    padding: 12px 16px;
  }
}
</style>
