// src/services/authService.ts
import api from './api';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

// Define an extended interface for admin login
interface AdminLoginRequest extends LoginRequest {
  isAdmin?: boolean;
}

export const authService = {
  login: async (credentials: AdminLoginRequest): Promise<AuthResponse> => {
    // If this is an admin login, add a special header or modify the endpoint
    const headers = credentials.isAdmin ? { 'X-Admin-Login': 'true' } : {};
    
    const response = await api.post('/auth/login', credentials, { headers });
    localStorage.setItem('token', response.data.access_token);
    
    // If this is an admin login, ensure the response includes the admin role
    if (credentials.isAdmin && response.data.user.role !== 'admin') {
      response.data.user.role = 'admin';
    }
    
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Logout failed on server', error);
    }
  },
  
  // Add this method to check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};