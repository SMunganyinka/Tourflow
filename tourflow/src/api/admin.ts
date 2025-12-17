import api from './index';

export const adminAPI = {
  getOperatorDestinations: () => api.get('/admin/destinations'),
  
  getOperatorBookings: () => api.get('/admin/bookings'),
};