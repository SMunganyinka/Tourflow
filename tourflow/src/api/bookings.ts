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

  // Update the booking status to match backend endpoints
  confirmBooking: (id: number) =>
    api.post(`/bookings/${id}/confirm`),

  cancelBooking: (id: number) =>
    api.post(`/bookings/${id}/cancel`),

  // General update for booking details (not status)
  updateBooking: (id: number, bookingData: Partial<BookingFormData>) =>
    api.put(`/bookings/${id}`, bookingData),

  // Get a specific booking
  getBooking: (id: number) =>
    api.get(`/bookings/${id}`),
};