// src/api/client.js
import axios from 'axios';
import { useAuthStore } from '../stores/auth/authStore.js';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Update this to your FastAPI server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add Bearer Token to all requests
apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export default apiClient;