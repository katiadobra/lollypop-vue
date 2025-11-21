<!-- src/pages/ProductDetail.vue -->
<template>
  <div class="product-detail" v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" alt="Product image" style="max-width: 300px;" />
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }} euro</p>
    <button @click="addToCart">Add to cart</button>
  </div>

  <div v-else>
    Loading...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

// For the state
const product = ref(null)

// To access route options
const route = useRoute()

// Add to cart feature (local for now)
const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  cart.push(product.value)
  localStorage.setItem('cart', JSON.stringify(cart))
  alert('Added to cart!')
}

onMounted(async () => {
  const productId = route.params.id
  const docRef = doc(db, 'products', productId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    product.value = docSnap.data()
  } else {
    console.error('Product not found!')
  }
})
</script>

<style scoped>
.product-detail {
  padding: 2rem;
}
</style>
