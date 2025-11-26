<template>
    <div class="register">
      <h1>Sign in or sign up with Google</h1>
  
      <button @click="handleGoogleLogin" class="google-btn">
        Sign in with Google
      </button>
  
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { auth } from '../firebase'
  import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  
  const error = ref(null)
  const router = useRouter()
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/')
    } catch (err) {
      error.value = 'Google login error: ' + err.message
    }
  }
  </script>
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  .google-btn {
    background-color: #4285F4;
    color: white;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border: none;
    border-radius: 5px;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>
  