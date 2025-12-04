<template>
  <div class="app-layout">
    <AnnouncementBar />
    <header class="app-header">
      <div class="header-inner">

        <div class="nav-area">
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
        </div>

        <RouterLink to="/" class="brand">{{ brand.name }}</RouterLink>

        <n-space align="center" size="small" class="header-actions">
          <n-button
            quaternary
            circle
            size="large"
            class="search-toggle desktop-only"
            aria-label="Search products"
            @click="openSearch"
          >
            <svg
              class="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15.5 15.5L21 21"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                stroke-width="1.6"
              />
            </svg>
          </n-button>
          <RouterLink to="/favorites" class="link-button desktop-only">
            <n-button size="small" secondary round>
              <HeartIcon :active="favoriteCount > 0" size="20" />
              <span class="sr-only">Favorites</span>
              <span v-if="favoriteCount" class="favorite-badge">{{ favoriteCount }}</span>
            </n-button>
          </RouterLink>
          <RouterLink to="/cart" class="link-button desktop-only">
            <n-button size="small" secondary round>
              <svg
                class="box-icon"
                viewBox="0 0 34 32"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.9971 15.9008C33.9958 15.8612 33.9915 15.8218 33.9842 15.7829C33.9813 15.7672 33.9776 15.752 33.9736 15.7362V15.7365C33.9641 15.6993 33.9517 15.6629 33.937 15.6276C33.932 15.6156 33.928 15.6034 33.9222 15.5917H33.9225C33.9009 15.5461 33.8748 15.5029 33.845 15.4627C33.8403 15.4562 33.8342 15.4507 33.8292 15.4445C33.8026 15.4113 33.7733 15.3804 33.742 15.3524C33.7365 15.3475 33.7328 15.3413 33.7272 15.3366C33.7204 15.3309 33.7125 15.3277 33.7054 15.3222C33.6766 15.3 33.6463 15.2796 33.6147 15.2619C33.6015 15.2543 33.5889 15.2462 33.5754 15.2394C33.5322 15.2179 33.4874 15.2008 33.441 15.1883L33.4368 15.1872L33.4334 15.1864L17.4936 10.9836L23.8445 4.49331L29.8217 3.61864C30.1285 3.57354 30.3759 3.33722 30.4428 3.02538C30.5095 2.71326 30.3817 2.39137 30.1216 2.21754L26.9928 0.123487C26.8458 0.0251505 26.6697 -0.0164063 26.4958 0.00586726L10.2855 2.10019C10.2755 2.10155 10.2668 2.10671 10.2568 2.10834C10.2041 2.11704 10.1527 2.13198 10.1031 2.15208C10.0913 2.15697 10.0789 2.16023 10.0673 2.16566V2.16593C10.0109 2.19282 9.95819 2.22678 9.91023 2.26752C9.89811 2.27757 9.88783 2.28925 9.8765 2.30012V2.29985C9.85621 2.3175 9.83645 2.33652 9.818 2.35635L0.183149 13.7282L0.180251 13.7328C0.17419 13.7401 0.169974 13.7483 0.164176 13.7556C0.137824 13.7898 0.114107 13.8265 0.0938136 13.8648C0.0898608 13.8719 0.0843275 13.8779 0.0806381 13.8852C0.0780029 13.8909 0.0769488 13.8971 0.0743136 13.9028C0.0513874 13.9504 0.033731 14.0004 0.0208182 14.052L0.0202911 14.0555L0.0200276 14.0582C0.0184465 14.0656 0.018183 14.0729 0.0168654 14.0799C0.00975021 14.1131 0.00474347 14.1465 0.00184465 14.1802C0.00105407 14.191 0.0026352 14.2014 0.00237169 14.212C0.00210819 14.2188 0 14.2253 0 14.2321V24.5226C0 24.842 0.192373 25.128 0.482505 25.2399L16.2732 31.3361C16.2772 31.3374 16.2811 31.338 16.2851 31.3393C16.2917 31.3418 16.2985 31.3428 16.3051 31.345C16.4337 31.3901 16.5718 31.3969 16.7041 31.3643L33.4271 27.3063C33.7628 27.2248 34 26.916 34 26.5606V15.9301C34 15.9203 33.9971 15.9105 33.9968 15.9008L33.9971 15.9008ZM4.37541 14.4918L15.4256 12.4773L15.389 18.1367L4.37541 14.4918ZM16.9118 12.5461L29.3739 15.8286L16.8733 18.466L16.9118 12.5461ZM26.4117 1.56092L27.6492 2.38941L13.3885 4.47644L12.1542 3.40289L26.4117 1.56092ZM10.6689 4.11539L12.684 5.86828V5.86855C12.8182 5.98508 12.9879 6.04892 13.1634 6.04919C13.1982 6.04892 13.2332 6.04647 13.2677 6.04158L21.3807 4.85426L15.6095 10.7521L2.92947 13.0567L10.6689 4.11539ZM15.791 29.5134L1.48644 23.9912V15.2821L15.791 20.0159V29.5134ZM32.514 25.9538L17.2771 29.6511V20.0824L32.514 16.8683V25.9538Z"
                  fill="#AE1D74"
                />
              </svg>
              <span class="sr-only">Cart</span>
              <span v-if="cartCount" class="cart-badge">{{ cartCount }}</span>
            </n-button>
          </RouterLink>
          <RouterLink to="/favorites" class="icon-button mobile-only" aria-label="Open favorites">
            <n-button quaternary circle size="medium">
              <HeartIcon :active="favoriteCount > 0" size="20" />
            </n-button>
            <span v-if="favoriteCount" class="favorite-badge-floating">{{ favoriteCount }}</span>
          </RouterLink>
          <RouterLink to="/cart" class="icon-button mobile-only" aria-label="Open cart">
            <n-button quaternary circle size="medium">
              <svg
                class="box-icon"
                viewBox="0 0 34 32"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.9971 15.9008C33.9958 15.8612 33.9915 15.8218 33.9842 15.7829C33.9813 15.7672 33.9776 15.752 33.9736 15.7362V15.7365C33.9641 15.6993 33.9517 15.6629 33.937 15.6276C33.932 15.6156 33.928 15.6034 33.9222 15.5917H33.9225C33.9009 15.5461 33.8748 15.5029 33.845 15.4627C33.8403 15.4562 33.8342 15.4507 33.8292 15.4445C33.8026 15.4113 33.7733 15.3804 33.742 15.3524C33.7365 15.3475 33.7328 15.3413 33.7272 15.3366C33.7204 15.3309 33.7125 15.3277 33.7054 15.3222C33.6766 15.3 33.6463 15.2796 33.6147 15.2619C33.6015 15.2543 33.5889 15.2462 33.5754 15.2394C33.5322 15.2179 33.4874 15.2008 33.441 15.1883L33.4368 15.1872L33.4334 15.1864L17.4936 10.9836L23.8445 4.49331L29.8217 3.61864C30.1285 3.57354 30.3759 3.33722 30.4428 3.02538C30.5095 2.71326 30.3817 2.39137 30.1216 2.21754L26.9928 0.123487C26.8458 0.0251505 26.6697 -0.0164063 26.4958 0.00586726L10.2855 2.10019C10.2755 2.10155 10.2668 2.10671 10.2568 2.10834C10.2041 2.11704 10.1527 2.13198 10.1031 2.15208C10.0913 2.15697 10.0789 2.16023 10.0673 2.16566V2.16593C10.0109 2.19282 9.95819 2.22678 9.91023 2.26752C9.89811 2.27757 9.88783 2.28925 9.8765 2.30012V2.29985C9.85621 2.3175 9.83645 2.33652 9.818 2.35635L0.183149 13.7282L0.180251 13.7328C0.17419 13.7401 0.169974 13.7483 0.164176 13.7556C0.137824 13.7898 0.114107 13.8265 0.0938136 13.8648C0.0898608 13.8719 0.0843275 13.8779 0.0806381 13.8852C0.0780029 13.8909 0.0769488 13.8971 0.0743136 13.9028C0.0513874 13.9504 0.033731 14.0004 0.0208182 14.052L0.0202911 14.0555L0.0200276 14.0582C0.0184465 14.0656 0.018183 14.0729 0.0168654 14.0799C0.00975021 14.1131 0.00474347 14.1465 0.00184465 14.1802C0.00105407 14.191 0.0026352 14.2014 0.00237169 14.212C0.00210819 14.2188 0 14.2253 0 14.2321V24.5226C0 24.842 0.192373 25.128 0.482505 25.2399L16.2732 31.3361C16.2772 31.3374 16.2811 31.338 16.2851 31.3393C16.2917 31.3418 16.2985 31.3428 16.3051 31.345C16.4337 31.3901 16.5718 31.3969 16.7041 31.3643L33.4271 27.3063C33.7628 27.2248 34 26.916 34 26.5606V15.9301C34 15.9203 33.9971 15.9105 33.9968 15.9008L33.9971 15.9008ZM4.37541 14.4918L15.4256 12.4773L15.389 18.1367L4.37541 14.4918ZM16.9118 12.5461L29.3739 15.8286L16.8733 18.466L16.9118 12.5461ZM26.4117 1.56092L27.6492 2.38941L13.3885 4.47644L12.1542 3.40289L26.4117 1.56092ZM10.6689 4.11539L12.684 5.86828V5.86855C12.8182 5.98508 12.9879 6.04892 13.1634 6.04919C13.1982 6.04892 13.2332 6.04647 13.2677 6.04158L21.3807 4.85426L15.6095 10.7521L2.92947 13.0567L10.6689 4.11539ZM15.791 29.5134L1.48644 23.9912V15.2821L15.791 20.0159V29.5134ZM32.514 25.9538L17.2771 29.6511V20.0824L32.514 16.8683V25.9538Z"
                  fill="#AE1D74"
                />
              </svg>
            </n-button>
            <span v-if="cartCount" class="cart-badge-floating">{{ cartCount }}</span>
          </RouterLink>
          <n-button
            quaternary
            circle
            size="large"
            class="menu-toggle mobile-only"
            aria-label="Open menu"
            @click="mobileMenuOpen = true"
          >
            ☰
          </n-button>
        </n-space>
      </div>
    </header>

    <div class="app-content">
      <main class="content-inner">
        <RouterView v-slot="{ Component }">
          <Transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>

    <footer class="app-footer">
      <div class="footer-inner">
        <span>© {{ brand.name }} · {{ brand.tagline }}</span>
        <div class="footer-links">
          <RouterLink to="/contact" class="footer-link">Contact Us</RouterLink>
          <RouterLink to="/impressum" class="footer-link">Impressum</RouterLink>
          <RouterLink to="/pages/terms-conditions" class="footer-link">Terms & Conditions</RouterLink>
          <RouterLink to="/pages/terms-of-use" class="footer-link">Terms of Use</RouterLink>
          <RouterLink to="/pages/privacy-policy" class="footer-link">Privacy Policy</RouterLink>
          <RouterLink to="/questions" class="footer-link">Q &amp; A</RouterLink>
        </div>
        <n-gradient-text :gradient="footerGradient" class="footer-credit">
          <a :href="brand.footerCredit.url" class="footer-link">{{ brand.footerCredit.text }}</a>
        </n-gradient-text>
      </div>
    </footer>

    <CartDrawer />
    <n-drawer v-model:show="mobileMenuOpen" placement="left" width="80vw">
      <n-drawer-content title="Menu" closable @close="mobileMenuOpen = false">
        <div class="mobile-nav">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-nav-link"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink to="/cart" class="mobile-nav-link" @click="mobileMenuOpen = false">
            Cart
            <span v-if="cartCount" class="mobile-cart-badge">{{ cartCount }}</span>
          </RouterLink>
          <button type="button" class="mobile-nav-button" @click="openSearch">
            Search
          </button>
        </div>
      </n-drawer-content>
    </n-drawer>

    <n-drawer
      v-model:show="searchOpen"
      placement="top"
      :height="420"
      :style="{ maxHeight: '80vh' }"
      trap-focus
    >
      <n-drawer-content title="Search products" closable @close="closeSearch">
        <div class="search-drawer">
          <n-input
            ref="searchInput"
            v-model:value="searchQuery"
            size="large"
            round
            clearable
            class="search-field"
            placeholder="Search products (EN/DE)..."
          />
          <p class="search-hint">Try product name, type, flavors, or allergens.</p>

          <div v-if="searchQuery && searchResults.length" class="search-results">
            <RouterLink
              v-for="product in searchResults"
              :key="product.id"
              :to="`/product/${product.id}`"
              class="search-result"
              @click="closeSearch"
            >
              <div class="result-title">{{ product.name }}</div>
              <div class="result-meta">
                <span class="result-type">{{ formatType(product.type) }}</span>
                <span class="result-price">€{{ product.price }}</span>
              </div>
              <p class="result-description">{{ product.shortDescription }}</p>
            </RouterLink>
          </div>

          <div v-else-if="searchQuery && !searchResults.length" class="empty-state">
            No products match that search.
          </div>

          <div v-else class="empty-state">Start typing to search products.</div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AnnouncementBar from './components/AnnouncementBar.vue';
import CartDrawer from './components/CartDrawer.vue';
import HeartIcon from './components/HeartIcon.vue';
import { branding } from './config/branding';
import { useCartStore } from './stores/cart';
import { useFavoritesStore } from './stores/favorites';
import { useProductsStore } from './stores/products';

const footerGradient = 'linear-gradient(90deg, #ff80b5 0%, #9089fc 50%, #22d3ee 100%)';
const brand = branding;

const navLinks = [
  { label: 'All products', to: '/products' },
  { label: 'How to order', to: '/how-to-order' },
  { label: 'Contact', to: '/contact' },
];

const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const productsStore = useProductsStore();
const cartCount = computed(() => cartStore.itemCount);
const favoriteCount = computed(() => favoritesStore.count);
const mobileMenuOpen = ref(false);
const searchOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
    searchOpen.value = false;
  },
);

watch(searchOpen, (open) => {
  if (!open) {
    searchQuery.value = '';
  }
});

const products = computed(() => productsStore.allProducts);

const searchResults = computed(() => {
  const query = normalize(searchQuery.value);
  if (!query) return [];

  return products.value
    .map((p) => ({
      product: p,
      haystack: normalize(
        [
          p.name,
          p.shortDescription,
          p.type,
          ...(p.flavors || []),
          ...(p.allergens || []),
        ]
          .filter(Boolean)
          .join(' '),
      ),
    }))
    .filter((entry) => entry.haystack.includes(query))
    .map((entry) => entry.product);
});

function openSearch() {
  mobileMenuOpen.value = false;
  searchOpen.value = true;
  nextTick(() => {
    if (searchInput.value) searchInput.value.focus();
  });
}

function openSearchFromMenu() {
  openSearch();
}

function closeSearch() {
  searchOpen.value = false;
}

function normalize(value) {
  if (!value) return '';
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ß/g, 'ss')
    .toLocaleLowerCase('de-DE');
}

function formatType(type) {
  return type
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
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
  position: relative;
}

.nav-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-self: start;
  grid-column: 1;
}

.menu-toggle {
  display: none;
  font-size: 26px;
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
  grid-column: 2;
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
  align-items: center;
  gap: 0.5rem;
  grid-column: 3;
}

.link-button {
  text-decoration: none;
}

.box-icon {
  width: 26px;
  height: 26px;
}

.search-toggle {
  color: #111827;
}

.search-icon {
  width: 22px;
  height: 22px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

.favorite-badge {
  margin-left: 6px;
  background: #ff69b4;
  color: #fff;
  border-radius: 999px;
  padding: 2px 6px;
  font-size: 12px;
  line-height: 1;
}

.icon-button {
  position: relative;
}

.icon-button :deep(.n-button) {
  min-width: unset;
}

.favorite-badge-floating,
.cart-badge-floating {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff69b4;
  color: #fff;
  border-radius: 999px;
  padding: 2px 6px;
  font-size: 12px;
  line-height: 1;
}

.search-drawer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-field {
  width: 100%;
}

.search-hint {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 50vh;
  overflow: auto;
}

.search-result {
  display: block;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.search-result:hover {
  border-color: #ff69b4;
  transform: translateY(-1px);
}

.result-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.result-meta {
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: #6b7280;
}

.result-price {
  font-weight: 600;
  color: #111827;
}

.result-description {
  margin: 6px 0 0;
  color: #4b5563;
  font-size: 14px;
}

.empty-state {
  color: #6b7280;
  padding: 8px 0;
}

.mobile-only {
  display: none;
}

.desktop-only {
  display: inline-flex;
}

@media (max-width: 780px) {
  .header-inner {
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }

  .brand {
    font-size: 24px;
    justify-self: center;
  }

  .header-actions {
    gap: 8px;
  }

  .nav {
    display: none;
  }

  .nav-area {
    display: none;
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: inline-flex;
  }

  .menu-toggle.mobile-only {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
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

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-nav-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  padding: 6px 0;
  border-bottom: 1px solid #f3f4f6;
}

.mobile-nav-button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  padding: 6px 0;
  border: none;
  background: transparent;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

.mobile-nav-button:hover {
  background: #f4f4f5;
}

.mobile-cart-badge {
  margin-left: 8px;
  background: #ff69b4;
  color: #fff;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 12px;
  line-height: 1;
}

@media (min-width: 780px) {
  .footer-inner {
    flex-direction: row;
  }
}
</style>
