<template>
  <n-layout class="app-layout">
    <n-layout-header bordered class="app-header">
      <header class="header-inner">
        <RouterLink to="/" class="brand">Zucker</RouterLink>

        <n-space size="large" align="center" class="nav" wrap>
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
          >
            {{ link.label }}
          </RouterLink>
        </n-space>

        <n-space align="center" size="small" class="header-actions">
          <RouterLink to="/cart" class="link-button">
            <n-button size="small" secondary round>Cart</n-button>
          </RouterLink>
          <RouterLink to="/login" class="link-button">
            <n-button size="small" quaternary round>Login</n-button>
          </RouterLink>
        </n-space>
      </header>
    </n-layout-header>

    <n-layout-content class="app-content">
      <main class="content-inner">
        <RouterView />
      </main>
    </n-layout-content>

    <n-layout-footer bordered class="app-footer">
      <footer class="footer-inner">
        <span>© Zucker · einfach süß</span>
        <RouterLink to="/contact" class="footer-link">Contact</RouterLink>
      </footer>
    </n-layout-footer>
  </n-layout>
</template>

<script setup>
const navLinks = [
  { label: 'All products', to: '/products' },
  { label: 'How to order', to: '/how-to-order' },
  { label: 'Contact', to: '/contact' },
];
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.app-header,
.app-footer {
  padding: 0.75rem 1.5rem;
}

.header-inner,
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}

.nav {
  flex: 1;
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.header-actions {
  display: flex;
}

.link-button {
  text-decoration: none;
}

.app-content {
  padding: 1.5rem;
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-link {
  text-decoration: none;
  color: inherit;
}
</style>
