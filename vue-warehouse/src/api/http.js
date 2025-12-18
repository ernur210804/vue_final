import axios from 'axios';

// Axios wrapper for common config
const http = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Real backend
  headers: { 'Content-Type': 'application/json' }
});

export default http;