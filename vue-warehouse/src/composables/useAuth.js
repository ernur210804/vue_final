import { computed } from 'vue';
import { useAuthStore } from '../stores/auth/authStore.js';

export default function useAuth() {
  const store = useAuthStore();
  const isAuthenticated = computed(() => store.isAuthenticated);

  const login = (credentials) => store.login(credentials);
  const logout = () => store.logout();

  return { isAuthenticated, login, logout };
}