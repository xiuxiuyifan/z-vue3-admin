import { createRouter, createWebHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
