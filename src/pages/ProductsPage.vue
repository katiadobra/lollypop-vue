<template>
  <section class="products-page content-inner">
    <header class="page-header">
      <h1>Products Collection</h1>
      <div class="header-subtext">
        <p class="page-lead">Explore everything we bake, ready to add to your box.</p>
      </div>
      <n-space size="small" wrap class="filters">
        <n-button
          v-for="category in categoryFilters"
          :key="category"
          size="small"
          round
          :type="isActive(category) ? 'primary' : 'tertiary'"
          :color="isActive(category) ? '#ff69b4' : undefined"
          @click="selectCategory(category)"
        >
          {{ category === 'all' ? 'All' : formatCategoryLabel(category) }}
        </n-button>
      </n-space>
    </header>

    <n-grid cols="1 700:2 1100:3" x-gap="16" y-gap="16">
      <n-grid-item v-for="product in filteredProducts" :key="product.id">
        <n-card hoverable :bordered="false" class="product-card">
          <button
            class="favorite-toggle"
            type="button"
            :aria-pressed="isFavorite(product.id)"
            @click.stop="toggleFavorite(product)"
          >
            <HeartIcon :active="isFavorite(product.id)" size="18" />
          </button>
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
          </RouterLink>

          <div class="product-footer">
            <span class="product-price">€{{ product.price }}</span>
            <n-button size="small" color="#ff69b4" round @click.stop="handleAddToCart(product)">
              Add to cart
            </n-button>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { NButton, NCard, NGrid, NGridItem, NSpace } from 'naive-ui';
import { deriveCategories, formatCategoryId } from '../data/categories';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import { useUiStore } from '../stores/ui';
import { useFavoritesStore } from '../stores/favorites';
import { useRoute, useRouter } from 'vue-router';
import HeartIcon from '../components/HeartIcon.vue';

const productsStore = useProductsStore();
const cartStore = useCartStore();
const uiStore = useUiStore();
const favoritesStore = useFavoritesStore();

const products = computed(() => productsStore.allProducts);

const categories = computed(() => deriveCategories(products.value));
const categoryFilters = computed(() => ['all', ...categories.value.map((category) => category.id)]);

const route = useRoute();
const router = useRouter();
const selectedCategory = ref('all');

watch(
  () => route.query.category,
  (category) => {
    const value = typeof category === 'string' ? category : 'all';
    selectedCategory.value = categoryFilters.value.includes(value) ? value : 'all';
  },
  { immediate: true }
);

watch(categoryFilters, (filters) => {
  if (!filters.includes(selectedCategory.value)) {
    selectedCategory.value = 'all';
  }
});

watch(selectedCategory, (category) => {
  const nextQuery = { ...route.query };
  if (category === 'all') {
    delete nextQuery.category;
  } else {
    nextQuery.category = category;
  }
  router.replace({ query: nextQuery });
});

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products.value;
  return products.value.filter((p) => p.category === selectedCategory.value);
});

function handleAddToCart(product) {
  cartStore.addItem(product.id, product.price);
  uiStore.openCartDrawer();
}

function toggleFavorite(product) {
  favoritesStore.toggle(product.id);
}

function isFavorite(productId) {
  return favoritesStore.isFavorite(productId);
}

function selectCategory(category) {
  selectedCategory.value = category;
}

function isActive(category) {
  return selectedCategory.value === category;
}

function formatCategoryLabel(type) {
  const meta = categories.value.find((category) => category.id === type);
  return meta?.label || formatCategoryId(type);
}

const placeholderPalette = ['#ffe5ef', '#e0f2fe', '#ecfdf3', '#fff7ed', '#ede9fe', '#fdf2f8'];

function placeholderStyle(id) {
  const index =
    Math.abs(id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) %
    placeholderPalette.length;
  return { background: placeholderPalette[index] };
}
</script>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 0px;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;
}

.page-lead {
  margin: 0;
  color: #4b5563;
}

.filters {
  margin-top: 4px;
}

.product-card {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.favorite-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.favorite-toggle:hover {
  transform: translateY(-1px);
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 12px;
}

.product-visual {
  width: 100%;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow: hidden;
  background: #f3f4f6;
}

.product-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-visual.with-image {
  padding: 0;
}

.product-initial {
  font-size: 40px;
  font-weight: 700;
  color: #111827;
}

.product-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.product-description {
  margin: 0;
  color: #4b5563;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.product-price {
  font-weight: 600;
}
</style>
