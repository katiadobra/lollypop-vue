<template>
  <section class="recommended" v-if="items.length">
    <div class="header">
      <h2 v-if="title">{{ title }}</h2>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    </div>
    <n-carousel
      class="carousel"
      :space-between="12"
      :slides-per-view="slidesPerView"
      :loop="carouselLoop"
      show-dots
      show-arrow
      draggable
    >
      <n-carousel-item v-for="product in items" :key="product.id">
        <div class="slide">
          <n-card hoverable :bordered="false" class="card">
            <RouterLink :to="`/product/${product.id}`" class="product-link">
              <div
                class="product-visual"
                :style="!product.mainImage ? placeholderStyle(product.id) : undefined"
                :class="{ 'with-image': !!product.mainImage }"
              >
                <img
                  v-if="product.mainImage"
                  :src="product.mainImage"
                  :alt="`${product.name} photo`"
                  loading="lazy"
                />
                <span v-else class="product-initial">{{ product.name.charAt(0) }}</span>
              </div>
              <div class="product-title">{{ product.name }}</div>
              <p class="product-description">{{ product.shortDescription }}</p>
              <div class="product-price">€{{ product.price }}</div>
            </RouterLink>
          </n-card>
        </div>
      </n-carousel-item>
    </n-carousel>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { NCard, NCarousel, NCarouselItem } from 'naive-ui';
import { useProductsStore } from '../stores/products';

const props = defineProps({
  products: {
    type: Array,
    default: null,
  },
  limit: {
    type: Number,
    default: 6,
  },
  title: {
    type: String,
    default: 'You may also like',
  },
  subtitle: {
    type: String,
    default: '',
  },
});

const productsStore = useProductsStore();
const placeholderPalette = ['#ffe5ef', '#e0f2fe', '#ecfdf3', '#fff7ed', '#ede9fe', '#fdf2f8'];

const items = computed(() => {
  const source =
    props.products && props.products.length ? props.products : productsStore.allProducts;
  return source.slice(0, props.limit);
});

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200);

const slidesPerView = computed(() => {
  const width = windowWidth.value;
  if (width >= 1100) return 4;
  if (width >= 800) return 3;
  if (width >= 600) return 2;
  return 1.1; // show a peek of the next slide on small screens
});

const carouselLoop = computed(() => items.value.length > Math.ceil(slidesPerView.value));

function handleResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

function placeholderStyle(id) {
  const index =
    Math.abs(id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) %
    placeholderPalette.length;
  return { background: placeholderPalette[index] };
}
</script>

<style scoped>
.recommended {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header h2 {
  margin: 0;
}

.subtitle {
  margin: 0;
  color: #4b5563;
  font-size: 14px;
}

.slide {
  padding: 4px;
}

.carousel :deep(.n-carousel__arrow) {
  opacity: 1;
}

.card {
  height: 100%;
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-visual {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f3f4f6;
}

.product-visual.with-image {
  padding: 0;
}

.product-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-initial {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
}

.product-title {
  font-weight: 700;
  margin: 0;
}

.product-description {
  margin: 0;
  color: #4b5563;
  font-size: 14px;
}

.product-price {
  font-weight: 700;
}
</style>
