import { defineStore } from 'pinia';
import axios from 'axios';

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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.products = response.data.slice(0, 5).map((item, index) => ({ id: index + 1, name: `Product ${index + 1}`, description: item.title })); // Mock
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
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        this.selectedProduct = { id, name: 'Product Details', details: response.data.body }; // Mock
      } catch (err) {
        this.error = 'Failed to fetch product';
      } finally {
        this.loading = false;
      }
    }
  }
});