import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStar, FaClock, FaChevronDown, FaGlobe, FaPlane, FaUmbrellaBeach } from 'react-icons/fa';
import { useDestinations } from '../hooks/useDestinations';
import { Destination, DestinationCategory } from '../types';
import Rating from '../components/ui/Rating';
import Button from '../components/common/Button';

// --- Skeleton Loading Components for Better UX ---
const DestinationCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-64 rounded-lg"></div>
    <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="mt-1 h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const ExperienceCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-48 rounded-t-lg"></div>
    <div className="p-6 bg-white">
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // State for search parameters - FIXED: Changed null to undefined
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
    travelers: '',
    category: undefined as DestinationCategory | undefined
  });
  
  // State for form inputs
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    travelers: ''
  });
  
  // State for selected category - FIXED: Changed null to undefined
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory | undefined>(undefined);
  
  // State for newsletter
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // Fetch destinations with search parameters
  const { data: destinations, isLoading, error, refetch } = useDestinations({ 
    limit: 8,
    location: searchParams.destination,
    category: searchParams.category
  });
  
  // Popular destinations for quick access
  const popularDestinations = [
    { name: 'Paris', icon: '🗼' },
    { name: 'Bali', icon: '🏝️' },
    { name: 'New York', icon: '🗽' },
    { name: 'Tokyo', icon: '🗾' }
  ];

  // Update search parameters when form inputs change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update search parameters
    setSearchParams({
      destination: searchData.destination,
      date: searchData.date,
      travelers: searchData.travelers,
      category: selectedCategory
    });
    
    // Navigate to destinations page with search parameters
    const queryParams = new URLSearchParams();
    if (searchData.destination) queryParams.append('destination', searchData.destination);
    if (searchData.date) queryParams.append('date', searchData.date);
    if (searchData.travelers) queryParams.append('travelers', searchData.travelers);
    if (selectedCategory) queryParams.append('category', selectedCategory);
    
    navigate(`/destinations?${queryParams.toString()}`);
  };

  // Handle category filter - FIXED: Changed null to undefined
  const handleCategoryFilter = (category: DestinationCategory | undefined) => {
    setSelectedCategory(category);
    setSearchParams(prev => ({ ...prev, category }));
    
    // Refetch destinations with new category filter
    refetch();
  };
  
  // Handle quick destination selection
  const handleQuickDestination = (destination: string) => {
    setSearchData(prev => ({ ...prev, destination }));
    setSearchParams(prev => ({ ...prev, destination }));
    refetch();
  };
  
  // Handle newsletter subscription
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setNewsletterStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Simulate success
      setNewsletterStatus('success');
      setEmail('');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setNewsletterStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-screen py-4 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/travel-hero/1920/1080.jpg" 
            alt="Travel destination" 
            className="w-full h-full object-cover"
          />
          {/* Enhanced gradient with multiple stops for better visual depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/60 to-teal-900/50"></div>
          {/* Animated overlay pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 text-white/10 animate-pulse">
          <FaGlobe className="text-8xl" />
        </div>
        <div className="absolute top-40 right-20 text-white/10 animate-pulse animation-delay-1000">
          <FaPlane className="text-6xl transform rotate-45" />
        </div>
        <div className="absolute bottom-40 left-20 text-white/10 animate-pulse animation-delay-2000">
          <FaUmbrellaBeach className="text-7xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 pt-20">
          {/* Enhanced title with gradient text effect */}
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up text-shadow-2xl leading-tight bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent">
              {t('home.hero.title')}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full animate-fade-in-up animation-delay-200"></div>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl text-shadow-lg animate-fade-in-up animation-delay-300 leading-relaxed text-white/90">
            {t('home.hero.subtitle')}
          </p>
          
          {/* Enhanced Search Bar with glassmorphism effect */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in-up animation-delay-500 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
                <input 
                  type="text" 
                  name="destination"
                  placeholder={t('home.search.destination')}
                  className="w-full pl-12 pr-4 py-4 text-base text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm"
                  value={searchData.destination}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-3 relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
                <input 
                  type="date" 
                  name="date"
                  className="w-full pl-12 pr-4 py-4 text-base text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm"
                  value={searchData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-3 relative">
                <FaUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
                <input 
                  type="number" 
                  name="travelers"
                  placeholder={t('home.search.travelers')}
                  min="1"
                  className="w-full pl-12 pr-4 py-4 text-base text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm"
                  value={searchData.travelers}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="w-full h-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center"
                >
                  <FaSearch className="mr-2" /> {t('home.search.button')}
                </Button>
              </div>
            </div>
          </form>
          
          {/* Popular Quick Destinations */}
          <div className="mt-8 animate-fade-in-up animation-delay-700">
            <p className="text-white/80 text-sm mb-3">Popular destinations:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {popularDestinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => handleQuickDestination(dest.name)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-white/20"
                >
                  <span className="text-xl">{dest.icon}</span>
                  <span className="text-sm font-medium">{dest.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Enhanced Popular Categories */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center animate-fade-in-up animation-delay-900">
            {Object.values(DestinationCategory).map((category, index) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 ${
                  selectedCategory === category
                    ? 'bg-white text-blue-600 shadow-xl'
                    : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/30'
                }`}
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest mb-2 text-white/60">Explore</span>
            <FaChevronDown className="text-2xl" />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('home.destinations.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.destinations.subtitle')}
            </p>
            {selectedCategory && (
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {t(`categories.${selectedCategory}`)}
                  <button 
                    onClick={() => handleCategoryFilter(undefined)} // FIXED: Changed null to undefined
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}
          </div>
          
          {/* UPDATED GRID CLASSES TO SHOW 4 COLUMNS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 8 }).map((_, index) => <DestinationCardSkeleton key={index} />)
            ) : error ? (
              <div className="col-span-full text-center text-red-500 p-4">
                {t('common.error')}
              </div>
            ) : destinations?.destinations?.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 p-8">
                <p className="text-lg mb-4">No destinations found matching your criteria.</p>
                <Button onClick={() => handleCategoryFilter(undefined)}> {/* FIXED: Changed null to undefined */}
                  Clear Filters
                </Button>
              </div>
            ) : (
              destinations?.destinations?.map((dest: Destination) => (
                <div key={dest.id} className="relative bg-white rounded-xl overflow-hidden shadow-md group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Link to={`/destinations/${dest.id}`}>
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={dest.featured_image || `https://picsum.photos/seed/${dest.id}/400/500.jpg`} 
                        alt={dest.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                      <h3 className="text-lg font-bold mb-1">{dest.title}</h3>
                      <div className="flex items-center text-sm">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{dest.rating} ({dest.review_count} {t('home.destinations.reviews')})</span>
                      </div>
                    </div>

                    {dest.original_price && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                        {Math.round((1 - dest.price / dest.original_price) * 100)}% OFF
                      </div>
                    )}
                  </Link>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/destinations">
              <Button size="lg">
                {t('home.destinations.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Experiences */}
      <section className="py-24 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              {t('home.experiences.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              {t('home.experiences.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Render skeleton cards while loading
              Array.from({ length: 3 }).map((_, index) => <ExperienceCardSkeleton key={index} />)
            ) : (
              destinations?.destinations?.slice(0, 3).map((dest: Destination) => (
                <div key={dest.id} className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer">
                  <Link to={`/destinations/${dest.id}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={dest.featured_image || `https://picsum.photos/seed/${dest.id}/600/400.jpg`} 
                        alt={dest.title} 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800">
                        <FaClock className="inline mr-1" /> {dest.duration || 'Flexible'}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {t(`categories.${dest.category}`)}
                        </span>
                        <span className="ml-auto text-gray-600 font-semibold">
                          ${dest.price} <span className="text-sm font-normal">{t('common.perPerson')}</span>
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{dest.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{dest.short_description || dest.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{dest.location}</span>
                        </div>
                        <Rating value={dest.rating} size="sm" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              {t('home.testimonials.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Emily Johnson', avatar: 'user1', rating: 5, comment: t('home.testimonials.review1') },
              { name: 'Michael Chen', avatar: 'user2', rating: 5, comment: t('home.testimonials.review2') },
              { name: 'Sarah Williams', avatar: 'user3', rating: 4.5, comment: t('home.testimonials.review3') }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  <img 
                    src={`https://picsum.photos/seed/${testimonial.avatar}/100/100.jpg`} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <Rating value={testimonial.rating} size="sm" />
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.newsletter.title')}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            {t('home.newsletter.subtitle')}
          </p>
          
          <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder={t('home.newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-white/70 sm:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/80"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={newsletterStatus === 'loading'}
            />
            <Button
              type="submit"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md px-6 py-3"
              disabled={newsletterStatus === 'loading'}
            >
              {newsletterStatus === 'loading' ? 'Subscribing...' : t('home.newsletter.subscribe')}
            </Button>
          </form>
          
          {newsletterStatus === 'success' && (
            <div className="mt-4 text-white">
              Thank you for subscribing to our newsletter!
            </div>
          )}
          
          {newsletterStatus === 'error' && (
            <div className="mt-4 text-red-200">
              There was an error subscribing to the newsletter. Please try again.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;