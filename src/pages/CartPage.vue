<!-- src/pages/Cart.vue -->
<template>
    <div class="cart">
      <h1>Cart</h1>
  
      <div v-if="cart.length > 0">
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <h2>{{ item.name }}</h2>
          <p>Price: {{ item.price }} €</p>
          <button @click="removeFromCart(index)">Delete</button>
        </div>
  
        <h3>Total: {{ totalPrice }} €</h3>
      </div>
      <div v-else>
        The cart is empty.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const cart = ref([])
  
  onMounted(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    cart.value = savedCart
  })
  
  const removeFromCart = (index) => {
    cart.value.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }
  
  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => acc + (item.price || 0), 0)
  })
  </script>
  
  <style scoped>
  .cart {
    padding: 2rem;
  }
  .cart-item {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  