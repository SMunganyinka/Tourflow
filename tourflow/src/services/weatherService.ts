import api from './api';
import type { WeatherData } from '../types';

export const weatherService = {
  getWeather: async (location: string): Promise<WeatherData> => {
    // Backend exposes /api/weather/{location}
    const response = await api.get(`/weather/${encodeURIComponent(location)}`);
    return response.data;
  },
  getWeatherByCoordinates: async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await api.get('/weather', { params: { lat, lon } });
    return response.data;
  },
};