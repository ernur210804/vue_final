<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isAuth = computed(() => authStore.isAuthenticated);

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <nav :class="{ 'nav-auth': isAuth }">
    <ul>
      <li v-if="isAuth"><router-link to="/warehouses">Warehouses</router-link></li>
      <li v-if="isAuth"><router-link to="/products">Products</router-link></li>
      <li v-if="isAuth"><router-link to="/reports">Reports</router-link></li>
      <li v-if="isAuth"><a @click="logout">Logout</a></li>
      <li v-else><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
nav { background: #333; color: white; padding: 10px; }
ul { display: flex; list-style: none; }
li { margin-right: 20px; }
a { color: white; text-decoration: none; cursor: pointer; }
.nav-auth { background: #444; } /* Dynamic class */
@media (max-width: 768px) { ul { flex-direction: column; } }
</style>