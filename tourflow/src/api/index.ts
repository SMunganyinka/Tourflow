// src/api/axios.ts

import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: Attach the auth token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors (e.g., no network connection)
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle common responses and errors globally
api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // We can do something with the response here if needed, like logging
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    // We can handle global errors here

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;

      switch (status) {
        case 401: // Unauthorized
          // This means the token is expired or invalid.
          toast.error('Your session has expired. Please log in again.');
          localStorage.removeItem('token');
          // Use a timeout to allow the user to see the message before redirecting
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
          break;

        case 403: // Forbidden
          // The user is authenticated but doesn't have permission to perform this action.
          toast.error('You do not have permission to perform this action.');
          break;

        case 404: // Not Found
          // The requested resource could not be found.
          toast.error('The requested resource was not found.');
          break;

        case 422: // Unprocessable Entity
          // Validation errors from the server (e.g., missing required fields)
          // Display the specific error message from the backend if available
          const errorMessage = data?.detail || 'Invalid data provided.';
          toast.error(errorMessage);
          break;

        case 500: // Internal Server Error
        case 502: // Bad Gateway
        case 503: // Service Unavailable
          // Something went wrong on the server
          toast.error('A server error occurred. Please try again later.');
          break;

        default:
          // Handle any other errors
          toast.error(`An error occurred: ${data?.detail || error.message}`);
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      toast.error('Network error. Please check your connection and try again.');
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error('An unexpected error occurred. Please try again.');
    }

    // IMPORTANT: Always reject the promise so the calling code's .catch() block still runs
    return Promise.reject(error);
  }
);

export default api;