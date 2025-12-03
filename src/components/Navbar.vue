<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/cart">Box</router-link>

  </nav>
</template>

<script setup>
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
</style>
