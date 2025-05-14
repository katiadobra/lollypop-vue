<!-- src/pages/Login.vue -->
<template>
    <div class="login">
      <h1>Вхід у магазин 🍭</h1>
  
      <form @submit.prevent="handleLogin">
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>
  
        <div>
          <label>Пароль:</label>
          <input type="password" v-model="password" required />
        </div>
  
        <button type="submit">Увійти</button>
      </form>
  
      <p>Ще не маєш акаунта?</p>
      <button @click="handleRegister">Зареєструватися</button>
  
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { auth } from '../firebase'
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  const router = useRouter()
  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      router.push('/')
    } catch (err) {
      error.value = 'Помилка входу: ' + err.message
    }
  }
  
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      router.push('/')
    } catch (err) {
      error.value = 'Помилка реєстрації: ' + err.message
    }
  }
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  form div {
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    margin: 0.5rem;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>
  