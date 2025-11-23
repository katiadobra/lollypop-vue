<template>
  <section class="products-page">
    <header class="page-header">
      <h1>Products Collection</h1>
      <p class="page-lead">Explore everything we bake, ready to add to your box.</p>
      <n-space size="small" wrap class="filters">
        <n-button
          v-for="category in categories"
          :key="category"
          size="small"
          round
          :type="isActive(category) ? 'primary' : 'tertiary'"
          :color="isActive(category) ? '#ff69b4' : undefined"
          @click="selectCategory(category)"
        >
          {{ category === 'all' ? 'All' : formatType(category) }}
        </n-button>
      </n-space>
    </header>

    <n-grid cols="1 700:2 1100:3" x-gap="16" y-gap="16">
      <n-grid-item v-for="product in filteredProducts" :key="product.id">
        <n-card hoverable class="product-card">
          <RouterLink :to="`/product/${product.id}`" class="product-link">
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
import { computed, ref } from 'vue';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const products = computed(() => productsStore.allProducts);

const categories = computed(() => {
  const types = new Set(products.value.map((p) => p.type));
  return ['all', ...types];
});

const selectedType = ref('all');

const filteredProducts = computed(() => {
  if (selectedType.value === 'all') return products.value;
  return products.value.filter((p) => p.type === selectedType.value);
});

function handleAddToCart(product) {
  cartStore.addItem(product.id, product.price);
}

function selectCategory(category) {
  selectedType.value = category;
}

function isActive(category) {
  return selectedType.value === category;
}

function formatType(type) {
  return type
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
</script>

<style scoped>
.products-page {
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

.filters {
  margin-top: 4px;
}

.product-card {
  height: 100%;
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 12px;
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
