import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import type { Destination } from '../../types/destination';
import Rating from '../../components/ui/Rating';
import { formatCurrency } from '../../utils/helpers';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <Link to={`/destinations/${destination.id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={destination.featured_image || `https://picsum.photos/seed/${destination.id}/400/300.jpg`} 
            alt={destination.title} 
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {destination.original_price && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              {Math.round((1 - destination.price / destination.original_price) * 100)}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {destination.category}
            </span>
            <span className="ml-auto text-gray-600 font-semibold">
              {formatCurrency(destination.price)}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{destination.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{destination.short_description || destination.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>{destination.duration || 'Flexible'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Rating value={destination.rating} size="sm" />
            <span className="text-sm text-gray-500">({destination.review_count} reviews)</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;