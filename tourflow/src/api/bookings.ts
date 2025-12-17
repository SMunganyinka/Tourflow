// src/api/bookings.ts

// 1. IMPORT the configured api instance, don't create a new one
import api from './index'; 
import type { BookingFormData } from '../types';

export const bookingsAPI = {
  getMyBookings: () =>
    // 2. Use relative paths. The baseURL already includes '/api'
    api.get('/bookings/'), 

  createBooking: (bookingData: BookingFormData) =>
    // Use a relative path here as well
    api.post('/bookings/', bookingData),

  updateBookingStatus: (id: number, status: string) =>
    api.put(`/bookings/${id}/status`, { status }),
};