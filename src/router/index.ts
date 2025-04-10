import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomePage.vue'
import RelustPage from '@/views/ResultPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/results',
    name: 'results',
    component: RelustPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(), // Використовує # у URL
  routes,
})

export default router
