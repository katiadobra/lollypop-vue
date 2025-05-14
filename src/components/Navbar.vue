<template>
  <nav class="navbar">
    <router-link to="/">Головна</router-link>
    <router-link to="/products">Цукерки</router-link>
    <router-link to="/cart">Кошик</router-link>

    <div class="auth-links">
      <template v-if="user">
        <span>Вітаємо, {{ user.displayName || user.email }}</span>
        <button @click="logout">Вийти</button>
      </template>
      <template v-else>
        <router-link to="/login">Вхід</router-link>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()

// Автоматичне визначення залогіненого користувача
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
})

const logout = async () => {
  await signOut(auth)
  user.value = null
  router.push('/')
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #ffe6e6;
  border-radius: 10px;
  margin-bottom: 2rem;
}
.navbar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.navbar a.router-link-active {
  color: #ff66b2;
}
.auth-links {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.auth-links button {
  background-color: transparent;
  border: none;
  color: #ff66b2;
  font-weight: bold;
  cursor: pointer;
}
.auth-links button:hover {
  text-decoration: underline;
}
</style>
