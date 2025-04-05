import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',  // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
