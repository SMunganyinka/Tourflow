// src/api/destinations.ts

import type { Destination } from '../types';
import api from '../services/api';

export const destinationsAPI = {
  getDestinations: (filters: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }) => {
    // Map frontend filter keys to backend query parameter names
    const params = {
      location: filters.location,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      min_rating: filters.minRating,
    };

    // FIX: Add the trailing slash to match the backend route
    return api.get<Destination[]>('/destinations/', { params }); 
  },

  getDestinationById: (id: number) => api.get<Destination>(`/destinations/${id}/`),
};