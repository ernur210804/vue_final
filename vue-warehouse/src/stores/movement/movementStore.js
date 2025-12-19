import { defineStore } from 'pinia'
import http from '../../api/http'

export const useMovementStore = defineStore('movement', {
  state: () => ({
    balances: [],
    history: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchBalances(warehouseId) {
      this.loading = true
      try {
        const res = await http.get(`/movements/balances/${warehouseId}`)
        this.balances = res.data
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchHistory(warehouseId) {
      this.loading = true
      try {
        const res = await http.get(`/movements/history/${warehouseId}`)
        this.history = res.data
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async createIncoming(payload) {
      return await http.post('/movements/incoming', payload)
    },

    async createOutgoing(payload) {
      return await http.post('/movements/outgoing', payload)
    },

    async postMovement(id) {
      return await http.patch(`/movements/${id}/status`, {
        status: 'posted'
      })
    }
  }
})
