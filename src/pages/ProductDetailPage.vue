<!-- src/pages/ProductDetail.vue -->
<template>
  <section v-if="product">
    <h1>{{ product.name }}</h1>

    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }} €</p>
    <p v-if="product.servings">Servings: {{ product.servings }}</p>
    <p v-if="product.weight">Weight: {{ product.weight }} g</p>
    <p v-if="product.ingredients">Ingredients: {{ product.ingredients }}</p>  
  
    <RouterLink to="/products">← Back to products</RouterLink>
  </section>
  <section v-else>
    <p>Product not found.</p>
    <RouterLink to="/products">Back to products</RouterLink>
  </section>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { useProductsStore } from '../stores/products';

  const route = useRoute();
  const productsStore = useProductsStore();

  const productId = computed(() => route.params.id);
  const product = computed(() => productsStore.getById(productId.value));
</script>