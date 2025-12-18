import { defineStore } from 'pinia';
import axios from 'axios';

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    warehouses: [],
    selectedWarehouse: null,
    loading: false,
    error: null
  }),
  getters: {
    getWarehouses: (state) => state.warehouses,
    getSelected: (state) => state.selectedWarehouse
  },
  actions: {
    async fetchWarehouses() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.warehouses = response.data.slice(0, 5).map((item, index) => ({ id: index + 1, name: `Warehouse ${index + 1}`, location: item.title })); // Mock data
      } catch (err) {
        this.error = 'Failed to fetch warehouses';
      } finally {
        this.loading = false;
      }
    },
    async fetchWarehouseById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        this.selectedWarehouse = { id, name: 'Warehouse Details', details: response.data.body }; // Mock
      } catch (err) {
        this.error = 'Failed to fetch warehouse';
      } finally {
        this.loading = false;
      }
    }
  }
});