<template>
  <n-layout class="app-layout">
    <n-layout-header bordered>
      <header class="app-header">
        <div class="logo">Zucker</div>
        <nav class="nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/products">All products</RouterLink>
          <RouterLink to="/how-to-order">How to order</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink to="/cart">Cart</RouterLink>
          <RouterLink to="/products/:id">details</RouterLink>
          <RouterLink to="/login">login</RouterLink>
        </nav>
      </header>
    </n-layout-header>

    <n-layout-content>
      <main class="app-main">
        <RouterView />
      </main>
    </n-layout-content>

    <n-layout-footer bordered>
      <footer class="app-footer">
        © Zucker · einfach süß
      </footer>
    </n-layout-footer>
  </n-layout>
</template>

<script>
export default {};
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.app-header,
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
}

.nav {
  display: flex;
  gap: 1rem;
}

.app-main {
  padding: 1.5rem;
}
</style>
