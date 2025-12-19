import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth/authStore.js';

// Lazy loading with dynamic imports
const Login = () => import('../pages/Login.vue');
const Home = () => import('../pages/Home.vue');
const Warehouses = () => import('../pages/Warehouses.vue');
const WarehouseDetails = () => import('../pages/WarehouseDetails.vue');
const Products = () => import('../pages/Products.vue');
const ProductDetails = () => import('../pages/ProductDetails.vue');
const Reports = () => import('../pages/Reports.vue');
const Departments = () => import('../pages/Departments.vue');
const RawOrders = () => import('../pages/RawOrders.vue');
const TimeTracking = () => import('../pages/TimeTracking.vue');
const Settings = () => import('../pages/Settings.vue');
const NotFound = () => import('../pages/NotFound.vue');

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/warehouses', component: Warehouses, meta: { requiresAuth: true } },
  { path: '/warehouses/:id', component: WarehouseDetails, meta: { requiresAuth: true } },
  { path: '/products', component: Products, meta: { requiresAuth: true } },
  { path: '/products/:id', component: ProductDetails, meta: { requiresAuth: true } },
  { path: '/reports', component: Reports, meta: { requiresAuth: true } },
  { path: '/departments', component: Departments, meta: { requiresAuth: true } },
  { path: '/raw-orders', component: RawOrders, meta: { requiresAuth: true } },
  { path: '/timetracking', component: TimeTracking, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard for auth check
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;