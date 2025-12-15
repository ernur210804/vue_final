import { defineStore } from 'pinia'
import axios from 'axios'

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),
  getters: {
    totalProducts: (state) => state.products.length
  },
  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const res = await axios.get('https://fakestoreapi.com/products')
        this.products = res.data
      } catch (e) {
        this.error = 'Failed to load products'
      } finally {
        this.loading = false
      }
    },
    addProduct(product) {
      this.products.push(product)
    }
  }
})
