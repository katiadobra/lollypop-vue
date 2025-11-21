<!-- src/pages/ProductsPage.vue -->
<template>
  <section class="products">
    <h1>All products</h1>

    <div class="product-list">
      <RouterLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="product-card"
      >
        <h2>{{ product.name }}</h2>
        <p>{{ product.shortDescription }}</p>
        <p>Price: {{ product.price }} €</p>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue';
  import { useProductsStore } from '../stores/products';

  const productsStore = useProductsStore();
  const products = computed(() => productsStore.allProducts);
</script>
