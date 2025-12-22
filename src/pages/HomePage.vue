<template>
  <div class="home content-inner">
    <n-card class="hero" :bordered="false">
      <n-grid cols="1 900:2" x-gap="24" y-gap="24" responsive="screen">
        <n-grid-item>
          <div class="hero-copy">
            <h1 class="hero-title">Modern bakes for bright celebrations.</h1>
            <p class="hero-lead">
              Small-batch cakes, cinnamon rolls, and tarts built to travel well and stay light, so
              you can celebrate without the sugar crash.
            </p>

            <n-space size="small">
              <RouterLink to="/products" class="link-button">
                <n-button color="#ff69b4" size="large" round>Browse the menu</n-button>
              </RouterLink>
              <RouterLink to="/how-to-order" class="link-button">
                <n-button size="large" tertiary round>How to order</n-button>
              </RouterLink>
            </n-space>

          </div>
        </n-grid-item>
      </n-grid>
    </n-card>

    <section class="section">
      <div class="section-heading">
        <n-gradient-text
          class="section-kicker"
          gradient="linear-gradient(135deg, #f50640 0%, #ff8acb 100%)"
        >
          Menu at a glance
        </n-gradient-text>
        <h2>Pick your favorite format</h2>
        <p class="section-lead">
          From single rolls to celebration cakes, every piece is balanced, colorful, and ready to
          share.
        </p>
      </div>

      <n-grid cols="1 800:3" x-gap="20" y-gap="20">
        <n-grid-item v-for="type in typeCards" :key="type.type">
          <n-card class="type-card" hoverable>
            <div class="type-card__header">
              <span class="type-name">{{ type.title }}</span>
              <n-tag size="small" round :color="{ color: accentColor, textColor: '#ffffff' }">
                {{ type.count ? `${type.count} flavors` : 'Out of order' }}
              </n-tag>
            </div>
            <p class="type-description">{{ type.description }}</p>
            <div class="type-foot">
              <RouterLink to="/products" class="link-button">
                <n-button text strong>Browse {{ type.title.toLowerCase() }}</n-button>
              </RouterLink>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
      <n-divider />

      <n-space size="small">
        <RouterLink to="/cart" class="link-button">
          <n-button size="medium" color="#ff69b4" ghost round>Build my box</n-button>
        </RouterLink>
        <RouterLink to="/contact" class="link-button">
          <n-button size="medium" secondary round>Talk to the bakery</n-button>
        </RouterLink>
      </n-space>
    </section>

    <section class="section brochure">
      <n-card class="brochure-card" :bordered="false">
        <div class="brochure-grid">
          <div>
            <n-gradient-text
              class="section-kicker"
              gradient="linear-gradient(135deg, #f50640 0%, #ff69b4 100%)"
            >
              Brochure & custom orders
            </n-gradient-text>
            <h2>Planning an event?</h2>
            <p class="section-lead">
              Ask for our printable brochure with portion guides, lead times, and finishing options
              for weddings, launches, or office treats.
            </p>
            <n-space vertical size="small">
              <div v-for="item in brochurePoints" :key="item" class="brochure-point">
                • {{ item }}
              </div>
            </n-space>
          </div>
        </div>
      </n-card>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { NButton, NCard, NDivider, NGradientText, NGrid, NGridItem, NSpace, NTag } from 'naive-ui';
import { branding } from '../config/branding';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore();

const accentColor = '#ff69b4';

const typeMeta = [
  {
    type: 'cake',
    title: 'Signature cakes',
    description: 'Layered bases with fruit-forward fillings and light chantilly toppings.',
    accent: 'primary',
  },
  {
    type: 'cinnamon-roll',
    title: 'Cinnabons',
    description: 'Slow-proofed rolls with buttery spirals and bright glazes.',
    accent: 'info',
  },
  {
    type: 'tart',
    title: 'Bright tarts',
    description: 'Crisp pâte sablée with citrus curds, pralines, and roasted nuts.',
    accent: 'warning',
  },
  {
    type: 'long-cake',
    title: 'Long cakes (rolls)',
    description: 'Sliceable sponge rolls with fruit jams and light creams.',
    accent: 'warning',
  },
  {
    type: 'cookie',
    title: 'Cookies',
    description: 'Chewy rounds with chunks, spices, and toasted nuts.',
    accent: 'default',
  },
  {
    type: 'choux',
    title: 'Choux',
    description: 'Filled profiteroles and éclairs with vanilla, coffee, or praline.',
    accent: 'primary',
  },
  {
    type: 'cupcake',
    title: 'Cupcakes',
    description: 'Individual sponge bases topped with light whipped frostings.',
    accent: 'error',
  },
];

const brochurePoints = [
  'Seasonal specials for launches and weddings',
  'Personalised inscriptions, bows, and labels',
  'Coordinated delivery and setup with your venue',
];

const typeCards = computed(() =>
  typeMeta.map((meta) => ({
    ...meta,
    count: productsStore.byType(meta.type).length,
  })),
);
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero {
  background: #f8fafc;
  padding: 32px;
}

.hero :deep(.n-card__content) {
  padding: 0;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-tag {
  align-self: flex-start;
}

.hero-title {
  font-size: 2.2rem;
  line-height: 1.15;
  font-weight: 800;
  margin: 0;
}

.hero-lead {
  margin: 0;
  max-width: 560px;
  color: #475569;
}

.link-button {
  text-decoration: none;
}

.hero-highlights {
  padding: 8px 0;
}

.highlight-card {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  min-width: 180px;
}

.highlight-label {
  font-size: 0.85rem;
  color: #64748b;
}

.highlight-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

.hero-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image img {
  width: 100%;
  max-width: 520px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
}

.section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-heading h2 {
  margin: 4px 0;
  font-size: 1.6rem;
}

.section-lead {
  margin: 0;
  color: #475569;
  max-width: 720px;
}

.section-kicker {
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.type-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.type-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.type-name {
  font-weight: 700;
}

.type-description {
  margin: 0;
  color: #475569;
  min-height: 60px;
}

.type-foot {
  margin-top: auto;
}

.brochure-card {
  background: #ffe6f2;
  border: 1px solid #ffc7e6;
  padding: 20px;
}

.brochure-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}

.brochure-point {
  color: #334155;
}

.brochure-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

@media (min-width: 880px) {
  .brochure-grid {
    grid-template-columns: 2fr 1fr;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 18px;
  }
}
</style>
