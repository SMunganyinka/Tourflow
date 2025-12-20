import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { experiencesAPI } from '../api/experiences';
import type { Experience } from '../types';

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
  </div>
);

const Experiences: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [savedExperiences, setSavedExperiences] = useState<number[]>([]);

  // Fetch experiences data with proper typing
  const { data: experiencesResponse, isLoading, error } = useQuery<{data: Experience[]}>({
    queryKey: ['experiences'],
    queryFn: () => experiencesAPI.getAllExperiences(),
  });

  // Extract data from the response
  const experiences = experiencesResponse?.data || [];

  // Filter experiences based on search term and category
  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exp.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort experiences
  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended (default)
  });

  // Toggle save experience
  const toggleSaveExperience = (id: number) => {
    setSavedExperiences(prev => 
      prev.includes(id) 
        ? prev.filter(expId => expId !== id)
        : [...prev, id]
    );
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

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Experiences</h2>
            <p className="text-gray-600 mb-6">We couldn't load experiences. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-block bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Amazing Experiences</h1>
          <p className="text-lg mb-8 opacity-90">Browse our curated experiences and visit destinations to book your adventure</p>
          
          <div className="bg-white rounded-lg shadow-lg p-2 md:p-4">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  className="w-full pl-10 pr-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <i className="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input type="text" placeholder="When?" className="w-full pl-10 pr-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex-1 relative">
                <i className="fas fa-users absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input type="text" placeholder="Travelers" className="w-full pl-10 pr-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Popular Experiences</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Sort by:</span>
            <select 
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-2 pb-4 md:pb-0 overflow-x-auto">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`filter-btn px-4 py-2 rounded-full border whitespace-nowrap ${
              selectedCategory === 'all' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setSelectedCategory('adventure')}
            className={`filter-btn px-4 py-2 rounded-full border whitespace-nowrap ${
              selectedCategory === 'adventure' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Adventure
          </button>
          <button 
            onClick={() => setSelectedCategory('beach')}
            className={`filter-btn px-4 py-2 rounded-full border whitespace-nowrap ${
              selectedCategory === 'beach' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Beach
          </button>
          <button 
            onClick={() => setSelectedCategory('cultural')}
            className={`filter-btn px-4 py-2 rounded-full border whitespace-nowrap ${
              selectedCategory === 'cultural' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cultural
          </button>
          <button 
            onClick={() => setSelectedCategory('nature')}
            className={`filter-btn px-4 py-2 rounded-full border whitespace-nowrap ${
              selectedCategory === 'nature' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Nature
          </button>
          <button 
            onClick={() => setSelectedCategory('food')}
            className={`filter-btn px-4 py-2 rounded-full border whitespace-nowrap ${
              selectedCategory === 'food' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Food & Drink
          </button>
          <button 
            onClick={() => setSelectedCategory('wildlife')}
            className={`filter-btn px-4 py-2 rounded-full border whitespace-nowrap ${
              selectedCategory === 'wildlife' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Wildlife
          </button>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedExperiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={experience.featured_image || `https://picsum.photos/seed/exp${experience.id}/400/300.jpg`} 
                  alt={experience.title}
                  className="w-full h-48 object-cover"
                />
                <button 
                  onClick={() => toggleSaveExperience(experience.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
                >
                  <i className={`fa${savedExperiences.includes(experience.id) ? 's' : 'r'} fa-heart text-${savedExperiences.includes(experience.id) ? 'red' : 'gray'}-600`}></i>
                </button>
                {experience.is_bestseller && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">Bestseller</span>
                )}
                {experience.is_limited_offer && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">Limited Offer</span>
                )}
                {experience.is_hot_deal && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">Hot Deal</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  {renderStars(experience.rating)}
                  <span className="text-sm text-gray-600 ml-2">({experience.review_count})</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{experience.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{experience.short_description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <i className="fas fa-clock mr-1"></i>
                  <span>{experience.duration}</span>
                  <i className="fas fa-users ml-3 mr-1"></i>
                  <span>Max {experience.max_group_size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500">From</span>
                    <p className="text-xl font-bold text-blue-600">${experience.price}</p>
                  </div>
                  <Link 
                    to={`/destinations/${experience.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition flex items-center"
                  >
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    Book at Destination
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <i className="fas fa-info-circle text-blue-500 text-4xl mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Book Your Adventure?</h3>
          <p className="text-gray-600 mb-4">
            Browse our experiences above and click "Book at Destination" to visit destination page where you can complete your booking.
          </p>
          <Link 
            to="/destinations"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition"
          >
            View All Destinations
          </Link>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition">
          <i className="fas fa-comment-dots text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Experiences;