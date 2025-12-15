import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue') },
  { path: '/products', component: () => import('../pages/Products.vue') },
  {
    path: '/products/:id',
    component: () => import('../pages/ProductDetails.vue')
  },
  { path: '/dashboard', component: () => import('../pages/Dashboard.vue') },
  {
    path: '/admin',
    component: () => import('../pages/Admin.vue'),
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', component: () => import('../pages/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem('admin')) {
    return '/'
  }
})

export default router
