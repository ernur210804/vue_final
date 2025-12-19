import { defineStore } from 'pinia'
import http from '../../api/http'

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    warehouses: [],
    history: [],
    loading: false,
    error: null
  }),

  getters: {
    getWarehouses: (state) => state.warehouses,
    getHistory: (state) => state.history
  },

  actions: {
    async fetchWarehouses() {
      this.loading = true
      this.error = null

      try {
        const res = await http.get('/warehouses/')
        this.warehouses = res.data
      } catch (err) {
        this.error = err
        console.error('fetchWarehouses error:', err)
      } finally {
        this.loading = false
      }
    },

    async createWarehouse(name) {
      try {
        const res = await http.post('/warehouses/', { name })
        this.warehouses.push(res.data)
      } catch (err) {
        console.error('createWarehouse error:', err)
        throw err
      }
    },

    async fetchHistory(warehouseId) {
      this.loading = true
      this.error = null

      try {
        const res = await http.get(`/movements/history/${warehouseId}`)
        this.history = res.data
      } catch (err) {
        this.error = err
        console.error('fetchHistory error:', err)
      } finally {
        this.loading = false
      }
    }
  }
})