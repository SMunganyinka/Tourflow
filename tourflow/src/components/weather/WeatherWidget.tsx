import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { useWeatherByCoordinates, useWeatherByLocation } from '../../hooks/useWeather';
import LoadingSpinner from '../common/LoadingSpinner';

interface WeatherWidgetProps {
  location: string;
  coordinates: { latitude: number; longitude: number };
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location, coordinates }) => {
  const { t } = useTranslation();
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(
    coordinates || null
  );

  // Try to detect user location via browser geolocation on mount
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        // If user denies or it fails, keep existing coordinates (fallback to default)
        if (!coords && coordinates) {
          setCoords(coordinates);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: weatherData,
    isLoading,
    error,
  } = coords ? useWeatherByCoordinates(coords) : useWeatherByLocation(location);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <WiDaySunny className="text-yellow-500" />;
      case 'cloudy':
      case 'partly cloudy':
        return <WiCloudy className="text-gray-500" />;
      case 'rain':
      case 'drizzle':
      case 'showers':
        return <WiRain className="text-blue-500" />;
      case 'snow':
        return <WiSnow className="text-blue-300" />;
      case 'thunderstorm':
      case 'thunder':
        return <WiThunderstorm className="text-purple-500" />;
      default:
        return <WiDaySunny className="text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-sm text-gray-600">{t('weather.unavailable')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {t('weather.currentIn', { location: weatherData.location })}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-4xl mr-3">{getWeatherIcon(weatherData.description)}</div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {Math.round(weatherData.temperature)}°C
            </p>
            <p className="text-sm text-gray-600">{weatherData.description}</p>
          </div>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>
            {t('weather.humidity')}: {weatherData.humidity}%
          </p>
          <p>
            {t('weather.wind')}: {weatherData.wind_speed} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;