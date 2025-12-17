import { useQuery } from '@tanstack/react-query';
import { destinationService } from '../services/destinationService';
import {  SearchParams } from '../types';

export const useDestinations = (params?: SearchParams) => {
  return useQuery({
    queryKey: ['destinations', params],
    queryFn: () => destinationService.getDestinations(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDestination = (id: number) => {
  return useQuery({
    queryKey: ['destination', id],
    queryFn: () => destinationService.getDestinationById(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
