<!-- src/pages/ProductDetail.vue -->
<template>
  <section v-if="product">
    <h1>{{ product.name }}</h1>

    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }} €</p>
    <p v-if="product.servings">Servings: {{ product.servings }}</p>
    <p v-if="product.weight">Weight: {{ product.weight }} g</p>
    <p v-if="product.ingredients">Ingredients: {{ product.ingredients }}</p>

    <div>
      <button @click="quantity = Math.max(1, quantity - 1)">-</button>
      <span>{{ quantity }}</span>
      <button @click="quantity = quantity + 1">+</button>
    </div>

    <button @click="addCurrentToCart">
      Add to cart
    </button>
  
    <RouterLink to="/products">← Back to products</RouterLink>
  </section>

  <section v-else>
    <p>Product not found.</p>
    <RouterLink to="/products">Back to products</RouterLink>
  </section>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { ref, computed } from 'vue';
  import { useProductsStore } from '../stores/products';
  import { useCartStore } from '../stores/cart';

  const route = useRoute();
  const productsStore = useProductsStore();
  const cartStore = useCartStore();

  const product = computed(() => productsStore.getById(route.params.id));

  const quantity = ref(1);

  function addCurrentToCart() {
    if (!product.value) return;
    cartStore.addItem(product.value.id, product.value.price, {
      quantity: quantity.value,
    });
  }
</script>