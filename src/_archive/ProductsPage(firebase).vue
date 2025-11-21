<!-- src/pages/Products.vue -->
<template>
    <div class="products">
      <h1>All products 🍬</h1>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p>Price: {{ product.price }} €</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { collection, getDocs } from 'firebase/firestore'
  import { db } from '../firebase'
  
  const products = ref([])
  
  onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'products'))
    products.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
  </script>
  
  <style scoped>
  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .product-card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  