import axios from 'axios';

// Axios wrapper for common config
const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Mock base
  headers: { 'Content-Type': 'application/json' }
});

export default http;