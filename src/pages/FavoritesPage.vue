<template>
  <section class="favorites-page">
    <header class="page-header">
      <h1>Favorites</h1>
      <p class="page-lead">Save the bakes you love and add them to your next box.</p>
    </header>

    <div v-if="favoriteProducts.length">
      <n-grid cols="1 700:2 1100:3" x-gap="16" y-gap="16">
        <n-grid-item v-for="product in favoriteProducts" :key="product.id">
          <n-card hoverable class="product-card">
            <button
              class="favorite-toggle"
              type="button"
              :aria-pressed="isFavorite(product.id)"
              @click.stop="toggleFavorite(product.id)"
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
              <n-space size="small">
                <n-button size="small" round color="#ff69b4" @click.stop="handleAddToCart(product)">
                  Add to cart
                </n-button>
                <n-button size="small" round tertiary @click.stop="toggleFavorite(product.id)">
                  Remove
                </n-button>
              </n-space>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>

    <div v-else class="empty-state">
      <div class="empty-card">
        <h3>No favorites yet</h3>
        <p>Tap the heart on a product to save it for later.</p>
        <RouterLink to="/products" class="link-button">
          <n-button round color="#ff69b4">Browse products</n-button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '../stores/favorites';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import { useUiStore } from '../stores/ui';
import HeartIcon from '../components/HeartIcon.vue';

const favoritesStore = useFavoritesStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const uiStore = useUiStore();

const favoriteProducts = computed(() =>
  favoritesStore.allIds
    .map((id) => productsStore.getById(id))
    .filter((product) => !!product),
);

const placeholderPalette = ['#ffe5ef', '#e0f2fe', '#ecfdf3', '#fff7ed', '#ede9fe', '#fdf2f8'];

function placeholderStyle(id) {
  const index = Math.abs(id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % placeholderPalette.length;
  return { background: placeholderPalette[index] };
}

function toggleFavorite(productId) {
  favoritesStore.toggle(productId);
}

function isFavorite(productId) {
  return favoritesStore.isFavorite(productId);
}

function handleAddToCart(product) {
  cartStore.addItem(product.id, product.price);
  uiStore.openCartDrawer();
}
</script>

<style scoped>
.favorites-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 4px;
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
  border-radius: 12px;
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

.empty-state {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.empty-card {
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  max-width: 420px;
  width: 100%;
  background: #fff;
}

.empty-card h3 {
  margin: 0 0 8px;
}

.empty-card p {
  margin: 0 0 12px;
  color: #4b5563;
}

.link-button {
  text-decoration: none;
  color: inherit;
}
</style>
