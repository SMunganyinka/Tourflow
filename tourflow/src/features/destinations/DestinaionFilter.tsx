import React from 'react';
import { useTranslation } from 'react-i18next';
import { DestinationCategory } from '../../types';

interface DestinationFilterProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

const DestinationFilter: React.FC<DestinationFilterProps> = ({ filters, onFilterChange }) => {
  const { t } = useTranslation();

  const handleCategoryChange = (category: DestinationCategory | undefined) => {
    onFilterChange({ category });
  };

  const handlePriceRangeChange = (field: 'min' | 'max', value: number) => {
    onFilterChange({
      price_range: {
        ...filters.price_range,
        [field]: value
      }
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ rating });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {t('destinations.filters.title')}
      </h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {t('destinations.filters.category')}
        </h3>
        <div className="space-y-2">
          <button
            className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
              !filters.category ? 'bg-primary-100 text-primary-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleCategoryChange(undefined)}
          >
            {t('destinations.filters.allCategories')}
          </button>
          {Object.values(DestinationCategory).map(category => (
            <button
              key={category}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                filters.category === category ? 'bg-primary-100 text-primary-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {t('destinations.filters.priceRange')}
        </h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            value={filters.price_range.min}
            onChange={(e) => handlePriceRangeChange('min', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            min="0"
            value={filters.price_range.max}
            onChange={(e) => handlePriceRangeChange('max', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {t('destinations.filters.rating')}
        </h3>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map(rating => (
            <button
              key={rating}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                filters.rating === rating ? 'bg-primary-100 text-primary-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleRatingChange(rating)}
            >
              {rating === 0 
                ? t('destinations.filters.allRatings')
                : `${rating}+ ${t('destinations.filters.stars')}`
              }
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        onClick={() => onFilterChange({
          category: undefined,
          price_range: { min: 0, max: 1000 },
          rating: 0,
        })}
      >
        {t('destinations.filters.reset')}
      </button>
    </div>
  );
};

export default DestinationFilter;