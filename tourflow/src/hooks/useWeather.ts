// src/hooks/useWeather.ts
import { useQuery } from '@tanstack/react-query';
import { weatherService } from '../services/weatherService';

// Fetch weather by location name to match backend /api/weather/{location}
export const useWeatherByLocation = (location: string) => {
  return useQuery({
    queryKey: ['weather', 'location', location],
    queryFn: () => weatherService.getWeather(location),
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });
};

// Fetch weather by coordinates to match backend /api/weather?lat=&lon=
export const useWeatherByCoordinates = (coords: { latitude: number; longitude: number } | null) => {
  return useQuery({
    queryKey: ['weather', 'coords', coords],
    queryFn: () =>
      coords
        ? weatherService.getWeatherByCoordinates(coords.latitude, coords.longitude)
        : Promise.reject(new Error('No coordinates')),
    enabled: !!coords,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });
};