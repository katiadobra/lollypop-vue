// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import Products from '../pages/ProductsPage.vue'
import Cart from '../pages/CartPage.vue'
import ProductDetail from '../pages/ProductDetailPage.vue'
// import Login from '../pages/Register.vue'
import Contact from '../pages/ContactPage.vue'
import HowToOrder from '../pages/HowToOrderPage.vue'
import TermsOfUse from '../pages/TermsOfUsePage.vue'
import TermsConditions from '../pages/TermsConditionsPage.vue'
import PrivacyPolicy from '../pages/PrivacyPolicyPage.vue'
import Impressum from '../pages/ImpressumPage.vue'
import Questions from '../pages/QuestionsPage.vue'
import Ingredients from '../pages/IngredientsPage.vue'
import Flavor from '../pages/FlavorPage.vue'
import NotFound from '../pages/NotFoundPage.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/product/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  { path: '/contact', component: Contact },
  { path: '/impressum', component: Impressum },
  { path: '/how-to-order', component: HowToOrder },
  { path: '/questions', component: Questions },
  { path: '/ingredients', component: Ingredients },
  { path: '/flavors', component: Flavor },
  { path: '/pages/terms-conditions', component: TermsConditions },
  { path: '/pages/terms-of-use', component: TermsOfUse },
  { path: '/pages/privacy-policy', component: PrivacyPolicy },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
