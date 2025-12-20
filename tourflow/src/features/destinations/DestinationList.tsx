// src/features/destinations/DestinationList.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { destinationsAPI } from '../../api/destinations';
import type { Destination } from '../../types';

const DestinationList: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
  });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await destinationsAPI.getDestinations(filters);
        const data = Array.isArray(response.data)
          ? response.data
          : // fallback if backend ever wraps in an object
            (response.data as any)?.destinations ?? [];
        setDestinations(data);
      } catch (error) {
        console.error('Failed to fetch destinations:', error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [filters]);

  // ADD THIS CONSOLE.LOG FOR DEBUGGING
  console.log('Destinations state:', destinations, 'Loading state:', loading);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'minPrice' || name === 'maxPrice' || name === 'minRating' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  // Function to generate a unique image for each destination
  const getDestinationImage = (destination: Destination, index: number) => {
    // Use destination ID to ensure consistent images
    const seed = destination.id || `dest${index}`;
    
    // Different image categories based on location or title keywords
    if (destination.location.toLowerCase().includes('beach') || 
        destination.title.toLowerCase().includes('beach') ||
        destination.title.toLowerCase().includes('coast') ||
        destination.title.toLowerCase().includes('island')) {
      return `https://picsum.photos/seed/beach${seed}/800/600.jpg`;
    } else if (destination.location.toLowerCase().includes('mountain') || 
               destination.title.toLowerCase().includes('mountain') ||
               destination.title.toLowerCase().includes('alps')) {
      return `https://picsum.photos/seed/mountain${seed}/800/600.jpg`;
    } else if (destination.location.toLowerCase().includes('city') || 
               destination.title.toLowerCase().includes('city')) {
      return `https://picsum.photos/seed/city${seed}/800/600.jpg`;
    } else if (destination.location.toLowerCase().includes('forest') || 
               destination.title.toLowerCase().includes('forest') ||
               destination.title.toLowerCase().includes('jungle')) {
      return `https://picsum.photos/seed/forest${seed}/800/600.jpg`;
    } else {
      // Default to a unique image based on ID
      return `https://picsum.photos/seed/destination${seed}/800/600.jpg`;
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-600 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Explore Destinations</h1>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-1">
                Min Rating
              </label>
              <select
                id="minRating"
                name="minRating"
                value={filters.minRating}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="0">Any</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Destination Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <div 
                key={destination.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(destination.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={getDestinationImage(destination, index)} 
                    alt={destination.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${hoveredCard === destination.id ? 'scale-110' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-semibold text-gray-800 shadow-md">
                    ${destination.price}
                  </div>
                  {destination.rating >= 4.5 && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Top Rated
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{destination.title}</h3>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {destination.location}
                  </p>
                  <div className="flex items-center mb-3">
                    {renderStars(destination.rating)}
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2">{destination.description}</p>
                  <Link 
                    to={`/destinations/${destination.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationList;