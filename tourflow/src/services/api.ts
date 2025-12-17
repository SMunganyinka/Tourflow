// src/services/api.ts

import axios from 'axios';
// Import authService so the interceptor can call the logout method
import { authService } from './authService'; 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is a 401, it means the token is bad.
    if (error.response?.status === 401) {
      console.log('401 Unauthorized: Clearing local token.');
      // Call the centralized logout function to clear storage
      authService.logout(); 
    }
    // IMPORTANT: Always reject the promise so the .catch() block in AuthContext can handle it.
    return Promise.reject(error);
  }
);

export default api;