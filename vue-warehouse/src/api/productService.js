import apiClient from './client';

export default {
  getProducts() {
    return apiClient.get('/products/');
  },
  createProduct(data) {
    return apiClient.post('/products/', data);
  }
};