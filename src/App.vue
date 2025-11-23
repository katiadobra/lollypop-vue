<template>
  <n-layout class="app-layout">
    <n-layout-header bordered class="app-header">
      <header class="header-inner">

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

        <RouterLink to="/" class="brand">ZUCKER.</RouterLink>

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
        <RouterLink to="/impressum" class="footer-link">Impressum</RouterLink>
        <RouterLink to="/pages/terms-conditions" class="footer-link">Terms & Conditions</RouterLink>
        <RouterLink to="/pages/terms-of-use" class="footer-link">Terms of Use</RouterLink>
        <RouterLink to="/pages/privacy-policy" class="footer-link">Privacy Policy</RouterLink>
        <span>© 2025 All Rights Reserved. 
          <n-gradient-text gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
            Made with ♥ in Berlin by <a href="https://github.com/katiadobra">Katiadobra</a>
          </n-gradient-text></span>
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

.header-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

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
  text-align: center;
  justify-self: center;
  font-size: 30px;
}

.nav {
  display: flex;
  justify-content: flex-start;
  justify-self: start;
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.header-actions {
  display: flex;
  justify-content: flex-end;
  justify-self: end;
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
