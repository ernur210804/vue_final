import { defineStore } from 'pinia';
import axios from '../../api/http.js';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
  }),
  getters: {
    getProducts: (state) => state.products,
    getSelected: (state) => state.selectedProduct
  },
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/products');
        this.products = response.data;
      } catch (err) {
        this.error = 'Failed to fetch products';
      } finally {
        this.loading = false;
      }
    },
    async fetchProductById(id) {
      this.loading = true;
      this.error = null;
      try {
        await this.fetchProducts();
        this.selectedProduct = this.products.find(p => p.id === parseInt(id));
      } catch (err) {
        this.error = 'Failed to fetch product';
      } finally {
        this.loading = false;
      }
    }
  }
});