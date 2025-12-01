<template>
  <div class="app-layout">
    <AnnouncementBar />
    <header class="app-header">
      <div class="header-inner">

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
            <n-button size="small" secondary round>
              Cart
              <span v-if="cartCount" class="cart-badge">{{ cartCount }}</span>
            </n-button>
          </RouterLink>
        </n-space>
      </div>
    </header>

    <div class="app-content">
      <main class="content-inner">
        <Transition name="fade-slide" mode="out-in">
          <RouterView />
        </Transition>
      </main>
    </div>

    <footer class="app-footer">
      <div class="footer-inner">
        <span>© ZUCKER. · einfach süß</span>
        <div class="footer-links">
          <RouterLink to="/contact" class="footer-link">Contact Us</RouterLink>
          <RouterLink to="/impressum" class="footer-link">Impressum</RouterLink>
          <RouterLink to="/pages/terms-conditions" class="footer-link">Terms & Conditions</RouterLink>
          <RouterLink to="/pages/terms-of-use" class="footer-link">Terms of Use</RouterLink>
          <RouterLink to="/pages/privacy-policy" class="footer-link">Privacy Policy</RouterLink>
          <RouterLink to="/questions" class="footer-link">Q &amp; A</RouterLink>
        </div>
        <n-gradient-text :gradient="footerGradient" class="footer-credit">
          <a href="https://github.com/katiadobra" class="footer-link">Made with ♥ in Berlin</a>
        </n-gradient-text>
      </div>
    </footer>

    <CartDrawer />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AnnouncementBar from './components/AnnouncementBar.vue';
import CartDrawer from './components/CartDrawer.vue';
import { useCartStore } from './stores/cart';

const footerGradient = 'linear-gradient(90deg, #ff80b5 0%, #9089fc 50%, #22d3ee 100%)';

const navLinks = [
  { label: 'All products', to: '/products' },
  { label: 'How to order', to: '/how-to-order' },
  { label: 'Contact', to: '/contact' },
];

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.itemCount);
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.app-header,
.app-footer {
  padding: 0.75rem 1.5rem;
  background: #fff;
  border-color: #e5e7eb;
}

.app-header {
  border-bottom: 1px solid #e5e7eb;
}

.app-footer {
  border-top: 1px solid #e5e7eb;
}

.header-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

.footer-inner {
  display: flex;
  flex-direction: column;
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

.cart-badge {
  margin-left: 6px;
  background: #ff69b4;
  color: #fff;
  border-radius: 999px;
  padding: 2px 6px;
  font-size: 12px;
  line-height: 1;
}

@media (max-width: 780px) {
  .header-inner {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    gap: 0.75rem;
  }

  .nav {
    justify-content: center;
    flex-wrap: wrap;
  }

  .header-actions {
    justify-content: center;
  }

  .app-content {
    padding: 1rem;
  }
}

.app-content {
  padding: 1.5rem;
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 400ms ease, transform 400ms ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.footer-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.footer-link {
  text-decoration: none;
  color: inherit;
}

.footer-credit {
  display: flex;
  gap: 0.35rem;
  align-items: center;
  flex-wrap: wrap;
}

@media (min-width: 780px) {
  .footer-inner {
    flex-direction: row;
  }
}
</style>
