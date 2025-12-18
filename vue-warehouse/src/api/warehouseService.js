import apiClient from './client';

export default {
  getWarehouses() {
    return apiClient.get('/warehouses/'); // Matches your GET /warehouses/
  },
  createWarehouse(data) {
    return apiClient.post('/warehouses/', data);
  },
  getBalances(id) {
    return apiClient.get(`/movements/balances/${id}`);
  }
};