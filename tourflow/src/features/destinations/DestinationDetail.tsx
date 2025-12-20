import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { destinationsAPI } from '../../api/destinations';
import type { Destination } from '../../types';

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
  </div>
);

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  if (!id) {
    return <div className="container mx-auto p-4 text-red-500">Error: No destination ID provided.</div>;
  }

  const { data: destinationResponse, isLoading, error } = useQuery({
    queryKey: ['destination', id],
    queryFn: () => destinationsAPI.getDestinationById(Number(id)),
  });

  // Extract data from response
  const destination = destinationResponse?.data as Destination;

  // Mock gallery images
  const galleryImages = [
    destination?.featured_image || 'https://picsum.photos/seed/destination/800/600.jpg',
    'https://picsum.photos/seed/gallery1/800/600.jpg',
    'https://picsum.photos/seed/gallery2/800/600.jpg',
    'https://picsum.photos/seed/gallery3/800/600.jpg',
    'https://picsum.photos/seed/gallery4/800/600.jpg'
  ];

  // Mock FAQ data
  const faqs = [
    {
      id: 1,
      question: "What's the best time to visit?",
      answer: "The best time to visit depends on your preferences. For warm weather and beach activities, summer months are ideal. For fewer crowds and milder temperatures, consider spring or fall."
    },
    {
      id: 2,
      question: "Do I need a visa?",
      answer: "Visa requirements vary by nationality and length of stay. Most travelers will need to apply for a visa in advance. Please check with your local embassy for specific requirements."
    },
    {
      id: 3,
      question: "What currency is used?",
      answer: "The local currency is accepted everywhere, but major credit cards are also widely accepted in tourist areas. We recommend carrying some cash for small purchases."
    },
    {
      id: 4,
      question: "Is travel insurance recommended?",
      answer: "Yes, we strongly recommend travel insurance that covers medical emergencies, trip cancellations, and lost luggage. It provides peace of mind for unexpected situations."
    }
  ];

  // Mock similar destinations
  const similarDestinations = [
    { id: 5, title: "Coastal Paradise", location: "Maldives", price: 1299, rating: 4.8, image: "https://picsum.photos/seed/similar1/400/300.jpg" },
    { id: 6, title: "Mountain Retreat", location: "Swiss Alps", price: 1599, rating: 4.9, image: "https://picsum.photos/seed/similar2/400/300.jpg" },
    { id: 7, title: "Historic Journey", location: "Rome, Italy", price: 999, rating: 4.7, image: "https://picsum.photos/seed/similar3/400/300.jpg" },
    { id: 8, title: "Island Adventure", location: "Greek Islands", price: 1199, rating: 4.6, image: "https://picsum.photos/seed/similar4/400/300.jpg" }
  ];

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Destination</h2>
            <p className="text-gray-600 mb-6">We couldn't load the destination details. Please try again later.</p>
            <Link 
              to="/destinations" 
              className="inline-block bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
            >
              Back to Destinations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h2>
            <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/destinations" 
              className="inline-block bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
            >
              Back to Destinations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">      
        <Link 
          to="/destinations" 
          className="inline-flex items-center mb-6 text-blue-400 hover:text-blue-500"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Destinations
        </Link>

        {/* Hero Section with Image Gallery */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="relative">
            <div className="h-96 bg-gray-200 relative">
              <img 
                src={galleryImages[activeImage]} 
                alt={destination.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-md text-lg font-semibold text-gray-800 shadow-md">
                ${destination.price}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex bg-gray-100 p-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-1 h-20 mr-2 last:mr-0 rounded overflow-hidden ${activeImage === index ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`${destination.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{destination.title}</h1>
                <p className="text-lg text-gray-600 flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {destination.location}
                </p>
                <div className="mt-2">
                  {renderStars(destination.rating)}
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-3xl font-bold text-blue-600">${destination.price}</p>
                <p className="text-sm text-gray-500">per person</p>
                <Link 
                  to={`/destinations/${destination.id}/book`} 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg mt-2 transition-colors duration-200"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <i className="fas fa-clock text-blue-500 text-2xl mb-2"></i>
                <p className="font-semibold">Duration</p>
                <p className="text-gray-600">4 Days</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <i className="fas fa-users text-green-500 text-2xl mb-2"></i>
                <p className="font-semibold">Group Size</p>
                <p className="text-gray-600">Max 15</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <i className="fas fa-language text-yellow-500 text-2xl mb-2"></i>
                <p className="font-semibold">Languages</p>
                <p className="text-gray-600">English, Local</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <i className="fas fa-hiking text-purple-500 text-2xl mb-2"></i>
                <p className="font-semibold">Difficulty</p>
                <p className="text-gray-600">Moderate</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('what-to-expect')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'what-to-expect'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  What to Expect
                </button>
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'itinerary'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'faq'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  FAQ
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">About {destination.title}</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {destination.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Included</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Accommodation in 3-star hotels</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Daily breakfast</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Transportation in air-conditioned vehicle</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">English-speaking guide</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Not Included</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">International flights</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Travel insurance</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Personal expenses</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Lunch and dinner</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'what-to-expect' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <i className="fas fa-route text-blue-500 text-3xl mb-4"></i>
                      <h3 className="text-lg font-semibold mb-2">Daily Itinerary</h3>
                      <p className="text-gray-700">Each day is carefully planned with a mix of activities, sightseeing, and free time for exploration.</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <i className="fas fa-bed text-green-500 text-3xl mb-4"></i>
                      <h3 className="text-lg font-semibold mb-2">Comfortable Accommodation</h3>
                      <p className="text-gray-700">Stay in carefully selected 3-star hotels with breakfast included each morning.</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <i className="fas fa-utensils text-yellow-500 text-3xl mb-4"></i>
                      <h3 className="text-lg font-semibold mb-2">Local Cuisine</h3>
                      <p className="text-gray-700">Experience authentic local flavors with included meals at carefully selected restaurants.</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <i className="fas fa-camera text-purple-500 text-3xl mb-4"></i>
                      <h3 className="text-lg font-semibold mb-2">Photo Opportunities</h3>
                      <p className="text-gray-700">Capture stunning memories at iconic landmarks and hidden gems throughout your journey.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'itinerary' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Trip Itinerary</h2>
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                          1
                        </div>
                        <div className="h-full w-0.5 bg-gray-300"></div>
                      </div>
                      <div className="pb-8">
                        <h3 className="text-lg font-semibold mb-2">Day 1: Arrival</h3>
                        <p className="text-gray-700 mb-2">Arrive at destination, check-in at hotel, and evening at leisure.</p>
                        <div className="bg-gray-100 rounded p-3 text-sm text-gray-600">
                          <i className="fas fa-info-circle mr-2"></i>
                          Airport transfer included between 8AM - 8PM
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                          2
                        </div>
                        <div className="h-full w-0.5 bg-gray-300"></div>
                      </div>
                      <div className="pb-8">
                        <h3 className="text-lg font-semibold mb-2">Day 2: City Tour</h3>
                        <p className="text-gray-700 mb-2">Full day guided tour of the city's main attractions.</p>
                        <div className="bg-gray-100 rounded p-3 text-sm text-gray-600">
                          <i className="fas fa-info-circle mr-2"></i>
                          Includes lunch at a local restaurant
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                          3
                        </div>
                        <div className="h-full w-0.5 bg-gray-300"></div>
                      </div>
                      <div className="pb-8">
                        <h3 className="text-lg font-semibold mb-2">Day 3: Adventure Day</h3>
                        <p className="text-gray-700 mb-2">Outdoor activities and adventure sports.</p>
                        <div className="bg-gray-100 rounded p-3 text-sm text-gray-600">
                          <i className="fas fa-info-circle mr-2"></i>
                          Optional activities available at additional cost
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                          4
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Day 4: Departure</h3>
                        <p className="text-gray-700 mb-2">Morning at leisure, then transfer to airport for departure.</p>
                        <div className="bg-gray-100 rounded p-3 text-sm text-gray-600">
                          <i className="fas fa-info-circle mr-2"></i>
                          Check-out time is 11AM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">Filter by:</span>
                      <select className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>All Reviews</option>
                        <option>5 Stars</option>
                        <option>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <p className="font-semibold">John Doe</p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className="h-4 w-4" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="ml-auto text-sm text-gray-500">June 15, 2023</p>
                      </div>
                      <p className="text-gray-700">Amazing experience! The tour guide was knowledgeable and the itinerary was well-planned.</p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <p className="font-semibold">Jane Smith</p>
                          <div className="flex text-yellow-400">
                            {[...Array(4)].map((_, i) => (
                              <svg 
                                key={i} 
                                className="h-4 w-4" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <svg 
                              className="h-4 w-4 text-gray-300" 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-auto text-sm text-gray-500">May 22, 2023</p>
                      </div>
                      <p className="text-gray-700">Great destination with beautiful scenery. The only downside was that the hotel was a bit far from the city center.</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition">
                      Load More Reviews
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'faq' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        >
                          <span className="font-medium">{faq.question}</span>
                          <svg 
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="px-6 py-4 bg-gray-50 text-gray-700">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Destinations Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarDestinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={dest.image} 
                  alt={dest.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{dest.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{dest.location}</p>
                  <div className="flex items-center mb-3">
                    {renderStars(dest.rating)}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-blue-600">${dest.price}</p>
                    <Link 
                      to={`/destinations/${dest.id}`}
                      className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking CTA Section */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Book Your Adventure?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Secure your spot today with our flexible booking options and enjoy an unforgettable journey to {destination.title}.
          </p>
          <Link 
            to={`/destinations/${destination.id}/book`} 
            className="inline-block bg-white text-blue-600 font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;