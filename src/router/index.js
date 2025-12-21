// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  { path: '/landing', component: () => import('../pages/LandingPage.vue') },
  { path: '/products', component: () => import('../pages/ProductsPage.vue') },
  { path: '/product/:id', component: () => import('../pages/ProductDetailPage.vue') },
  { path: '/favorites', component: () => import('../pages/FavoritesPage.vue') },
  { path: '/cart', component: () => import('../pages/CartPage.vue') },
  { path: '/contact', component: () => import('../pages/ContactPage.vue') },
  { path: '/impressum', component: () => import('../pages/ImpressumPage.vue') },
  { path: '/how-to-order', component: () => import('../pages/HowToOrderPage.vue') },
  { path: '/questions', component: () => import('../pages/QuestionsPage.vue') },
  { path: '/ingredients', component: () => import('../pages/IngredientsPage.vue') },
  { path: '/flavors', component: () => import('../pages/FlavorPage.vue') },
  { path: '/care', component: () => import('../pages/CarePage.vue') },
  { path: '/pages/terms-conditions', component: () => import('../pages/TermsConditionsPage.vue') },
  { path: '/pages/terms-of-use', component: () => import('../pages/TermsOfUsePage.vue') },
  { path: '/pages/privacy-policy', component: () => import('../pages/PrivacyPolicyPage.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('../pages/NotFoundPage.vue') },
];

// Prevent the browser from restoring scroll on reload/back so the page always starts at the top.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, left: 0 };
  },
});

export default router;
