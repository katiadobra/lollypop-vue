// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import Products from '../pages/ProductsPage.vue'
import Cart from '../pages/CartPage.vue'
import ProductDetail from '../pages/ProductDetailPage.vue'
import Login from '../pages/Register.vue'
import Contact from '../pages/ContactPage.vue'
import HowToOrder from '../pages/HowToOrderPage.vue'
import NotFound from '../pages/NotFoundPage.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/product/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  { path: '/login', component: Login },
  { path: '/contact', component: Contact },
  { path: '/how-to-order', component: HowToOrder },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
