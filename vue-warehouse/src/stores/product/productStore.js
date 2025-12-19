import { defineStore } from 'pinia'
import http from '../../api/http'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const res = await http.get('/products/')
        this.products = res.data
      } catch (e) {
        this.error = e.response?.data || e.message
      } finally {
        this.loading = false
      }
    },

    async createProduct(payload) {
      const res = await http.post('/products/', payload)
      this.products.push(res.data)
    }
  }
})
