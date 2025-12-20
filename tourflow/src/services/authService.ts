// src/services/authService.ts
import api from './api';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

// Define an extended interface for admin login
interface AdminLoginRequest extends LoginRequest {
  isAdmin?: boolean;
}

export const authService = {
  login: async (credentials: AdminLoginRequest): Promise<AuthResponse> => {
    try {
      // If this is an admin login, add a special header
      const headers = credentials.isAdmin ? { 'X-Admin-Login': 'true' } : {};
      
      const response = await api.post('/auth/login', credentials, { headers });
      
      // Store the token with consistent key
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      
      // Create a proper AuthResponse object
      const authResponse: AuthResponse = {
        access_token: response.data.access_token,
        token_type: response.data.token_type,
        user: null 
      };
      
      return authResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
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
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};