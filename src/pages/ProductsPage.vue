<!-- src/pages/ProductsPage.vue (або Products.vue) -->
<template>
  <div class="products">
    <h1>All products 🍬</h1>

    <div class="product-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }} €</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { products } from '../data/products';
</script>
