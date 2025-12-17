import React, { useState, useEffect } from 'react';
import { weatherAPI } from '../../api/weather';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  wind_speed: number;
  icon: string;
}

interface WeatherDisplayProps {
  location: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ location }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await weatherAPI.getWeather(location);
        setWeather(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch weather:', err);
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-2"></div>
        <span className="text-blue-700">Loading weather...</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-700">Weather information unavailable</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Current Weather in {weather.location}</h3>
          <div className="flex items-center mt-2">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt={weather.description}
              className="w-12 h-12 mr-3"
            />
            <div>
              <p className="text-2xl font-bold text-gray-900">{weather.temperature.toFixed(1)}°C</p>
              <p className="text-gray-600 capitalize">{weather.description}</p>
            </div>
          </div>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind_speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;