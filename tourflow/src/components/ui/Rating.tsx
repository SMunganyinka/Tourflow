import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showValue = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    for (let i = stars.length; i < max; i++) {
      stars.push(<FaStar key={i} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]} ${className}`}>
      <div className="flex">{renderStars()}</div>
      {showValue && (
        <span className="ml-2 text-gray-600">{value.toFixed(1)}</span>
      )}
    </div>
  );
};

export default Rating; 