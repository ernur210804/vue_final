// src/api/axios.js
import axios from 'axios';
import { useAuthStore } from '../stores/auth/authStore.js';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Update to your backend URL
  headers: { 'Content-Type': 'application/json' }
});

// Automatically add the Auth Token to every request
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export default api;