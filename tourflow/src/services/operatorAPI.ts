// src/services/operatorAPI.ts
import api from './api';
import type { DashboardStats, Booking, Destination } from '../types';

export const operatorAPI = {
  getDestinations: async (): Promise<Destination[]> => {
    const response = await api.get('/destinations');
    return response.data;
  },

  getBookings: async (): Promise<Booking[]> => {
    const response = await api.get('/bookings');
    return response.data;
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  }
};