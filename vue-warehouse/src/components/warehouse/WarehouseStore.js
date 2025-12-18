// src/stores/warehouseStore.js
import { defineStore } from 'pinia';
import api from '../api/axios'; // Import the client from step 1

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    warehouses: [],
    loading: false
  }),
  actions: {
    async fetchWarehouses() {
      this.loading = true;
      try {
        // This calls http://127.0.0.1:8000/warehouses/
        const response = await api.get('/warehouses/');
        this.warehouses = response.data; 
      } catch (error) {
        console.error("Link to backend failed:", error);
      } finally {
        this.loading = false;
      }
    },
    async createWarehouse(name) {
      try {
        const response = await api.post('/warehouses/', { name });
        this.warehouses.push(response.data);
      } catch (error) {
        console.error("Could not save warehouse:", error);
      }
    }
  }
});