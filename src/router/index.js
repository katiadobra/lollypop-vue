// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import Cart from '../pages/Cart.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Login from '../pages/Register.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/products/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
