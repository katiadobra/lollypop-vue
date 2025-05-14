<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
/* Базові стилі */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background: #fff8f0;
}
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
