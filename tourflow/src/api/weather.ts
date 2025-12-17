import api from './index';

export const weatherAPI = {
  getWeather: (location: string) => api.get(`/weather/${location}`),
};