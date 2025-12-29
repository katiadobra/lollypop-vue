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
      <div class="slide-images" aria-hidden="true">
        <img
          v-for="(img, i) in parallaxImagesFor(category.id)"
          :key="i"
          :src="img.src"
          class="parallax-img"
          :style="img.style"
          :data-speed="img.speed"
          alt=""
        />
      </div>
      <div class="slide-inner">
        <p class="slide-kicker">Collection</p>
        <h2>{{ category.label }}</h2>
        <p class="slide-copy">{{ category.copy }}</p>
        <RouterLink :to="collectionLink(category.id)" class="slide-cta">
          <n-button size="small" color="#ff69b4" round>Browse the collection</n-button>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue';
import { NButton } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { deriveCategories } from '../data/categories';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore();
const categories = computed(() => deriveCategories(productsStore.allProducts));

const collectionLink = (id) => ({ path: '/products', query: { category: id } });

const TABS_HEIGHT = 49;
const activeCategory = ref(null);
const initialized = ref(false);
// Parallax image configuration: replace the sample paths with your
// real per-slide PNGs (recommended to put them under `public/landing/`).
const PARALLAX_IMAGES = {
  cupcakes: [
    {
      src: '/landing/cupcakes-left.png',
      speed: 30,
      style: { left: '-1%', top: '28%', 'max-width': '48%' }
    },
    {
      src: '/landing/cupcakes-topright.png',
      speed: -18,
      style: { right: '-6%', top: '-6%', 'max-width': '40%' }
    },
    {
      src: '/landing/cupcakes-bottom.png',
      speed: 14,
      style: { right: '0%', bottom: '0%', 'max-width': '36%' }
    }
  ]
  ,
  cake: [
    {
      src: '/landing/cake-left.png',
      speed: 28,
      style: { left: '-6%', bottom: '1%', width: '46%' }
    },
    {
      src: '/landing/cake-slices.png',
      speed: -16,
      style: { right: '-6%', top: '-6%', width: '31%' }
    }
  ]
};

const slideImageRefs = new Map();
let parallaxTicking = false;
const slideRefs = new Map();
const tabRefs = new Map();
const tabsRef = ref(null);

watch(
  categories,
  (list) => {
    if (!list.length) return;
    const exists = list.some((category) => category.id === activeCategory.value);
    if (!exists && initialized.value) {
      // Only default to the first category after the component has mounted.
      // This prevents the first tab being marked active before the user has
      // scrolled to its slide on initial page load.
      activeCategory.value = list[0].id;
      // When categories change (slides mounted/unmounted), ensure parallax
      // images are positioned after DOM updates.
      nextTick(() => {
        // allow the browser to paint then recalculates positions
        requestAnimationFrame(() => updateParallaxPositions());
      });
    }
  }
);

const setSlideRef = (id) => (el) => {
  if (el) {
    slideRefs.set(id, el);
    // collect any parallax image elements inside the slide
    const imgs = Array.from(el.querySelectorAll('.parallax-img'));
    if (imgs && imgs.length) slideImageRefs.set(id, imgs);
    // assign baseTransform from the config (avoid reading a possibly mutated style)
    const cfgs = PARALLAX_IMAGES[id] || [];
    if (imgs && imgs.length) {
      imgs.forEach((imgEl, idx) => {
        const cfg = cfgs[idx] || {};
        const baseTransform = (cfg.style && cfg.style.transform) || '';
        imgEl.dataset.baseTransform = baseTransform;
      });
    }
  } else {
    slideRefs.delete(id);
    slideImageRefs.delete(id);
  }
};

const parallaxImagesFor = (id) => PARALLAX_IMAGES[id] || [];

function updateParallaxPositions() {
  const list = categories.value;
  if (!list.length) return;

  const vh = window.innerHeight;
  const viewportCenter = vh / 2;

  for (const category of list) {
    const el = slideRefs.get(category.id);
    const imgs = slideImageRefs.get(category.id);
    if (!el || !imgs || !imgs.length) continue;

    const rect = el.getBoundingClientRect();
    const slideCenter = rect.top + rect.height / 2;
    const diff = viewportCenter - slideCenter;
    const ratio = diff / vh;

    for (const imgEl of imgs) {
      const speed = Number(imgEl.dataset.speed) || 0;
      const translateY = Math.round(ratio * speed);
      // clamp translation to avoid large moves that might push visuals outside
      // the viewport and cause a scrollbar. Max translate is a fraction of
      // the viewport height.
      const maxTranslate = Math.round(window.innerHeight * 0.35);
      const clamped = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));
      const base = imgEl.dataset.baseTransform || '';
      imgEl.style.transform = `translate3d(0, ${clamped}px, 0) ${base}`.trim();
    }
  }
}

function onScrollParallax() {
  if (!parallaxTicking) {
    parallaxTicking = true;
    requestAnimationFrame(() => {
      updateParallaxPositions();
      parallaxTicking = false;
    });
  }
}

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
  const list = categories.value;
  if (!list.length) return;

  const marker = window.scrollY + TABS_HEIGHT + 1;
  let current = activeCategory.value;

  const firstSlide = slideRefs.get(list[0].id);
  if (firstSlide && marker < firstSlide.offsetTop) {
    // If the user has scrolled above the first slide (back into the hero),
    // clear the active category so no tab is highlighted.
    activeCategory.value = null;
    return;
  }

  for (const category of list) {
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
  // separate listener for parallax which uses rAF
  window.addEventListener('scroll', onScrollParallax, { passive: true });
  updateActiveFromScroll();
  // initial parallax placement
  updateParallaxPositions();
  initialized.value = true;
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveFromScroll);
  window.removeEventListener('scroll', onScrollParallax);
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
  position: relative; /* ensure absolute .slide-images are positioned inside the slide */
  /* overflow-x: hidden; /* hide horizontal overflow only */
  /* overflow-y: visible; allow vertical overflow if desired */
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
  align-items: center;
  position: relative;
  z-index: 2; /* keep content above parallax images */
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

.slide-cta {
  text-decoration: none;
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

/* Parallax image layer styles */
.slide-images {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: visible;
}

.parallax-img {
  position: absolute;
  will-change: transform, opacity;
  transition: transform 0.25s linear;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  max-width: 45vw;
  max-height: 60vh;
  width: auto;
  height: auto;
  transform-origin: center center;
}

@media (max-width: 639px) {
  .parallax-img {
    opacity: 0.9;
    max-width: 80%;
    max-height: 40vh;
  }
}
</style>
