<!-- src/pages/ProductDetail.vue -->
<template>
  <div class="product-detail" v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" alt="Product image" style="max-width: 300px;" />
    <p>{{ product.description }}</p>
    <p>Ціна: {{ product.price }} грн</p>
    <button @click="addToCart">Додати в кошик</button>
  </div>

  <div v-else>
    Завантаження...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

// Для стейту
const product = ref(null)

// Для доступу до параметрів маршруту
const route = useRoute()

// Функція для додавання в кошик (поки локально)
const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  cart.push(product.value)
  localStorage.setItem('cart', JSON.stringify(cart))
  alert('Додано до кошика!')
}

onMounted(async () => {
  const productId = route.params.id
  const docRef = doc(db, 'products', productId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    product.value = docSnap.data()
  } else {
    console.error('Товар не знайдено!')
  }
})
</script>

<style scoped>
.product-detail {
  padding: 2rem;
}
</style>
