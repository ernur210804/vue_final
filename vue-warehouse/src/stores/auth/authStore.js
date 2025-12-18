import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),
  getters: {
    getUser: (state) => state.user,
    getError: (state) => state.error
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        // Mock API call
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', credentials);
        this.user = { email: credentials.email }; // Simulate user
        this.isAuthenticated = true;
      } catch (err) {
        this.error = 'Login failed';
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});