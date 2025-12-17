// src/services/destinationService.ts

import type { Destination, SearchParams, SearchResult } from '../types';
import { DestinationCategory } from '../types';

// A mock array of destinations to simulate a database
const mockDestinations: Destination[] = [
  {
    id: 1,
    title: 'Bali Adventure',
    slug: 'bali-adventure',
    description: 'Experience the breathtaking beauty of Bali with our all-inclusive adventure package.',
    short_description: 'An unforgettable adventure in the heart of Bali.',
    location: 'Bali, Indonesia',
    coordinates: { latitude: -8.3405, longitude: 115.0920 },
    price: 1299,
    currency: 'USD',
    images: [], // Assuming DestinationImage[] is an empty array for now
    featured_image: 'https://picsum.photos/seed/bali/400/300.jpg',
    rating: 4.8,
    review_count: 124,
    category: DestinationCategory.ADVENTURE,
    tags: ['adventure', 'culture', 'nature'],
    amenities: [], // Assuming Amenity[] is an empty array
    availability: [], // Assuming AvailabilitySlot[] is an empty array
    included_items: ['Accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours'],
    excluded_items: ['Lunch and dinner', 'Personal expenses', 'Travel insurance'],
    cancellation_policy: {
      id: 1,
      name: 'Flexible',
      description: 'Free cancellation up to 7 days before travel',
      full_refund_days: 7,
      partial_refund_days: 3,
      partial_refund_percentage: 50
    },
    operator_id: 1,
    is_featured: true,
    is_active: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: 'Paris Getaway',
    slug: 'paris-getaway',
    description: 'Enjoy a romantic trip to the city of lights with our curated Paris experience.',
    short_description: 'A romantic escape to Paris.',
    location: 'Paris, France',
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
    price: 1899,
    currency: 'USD',
    images: [],
    featured_image: 'https://picsum.photos/seed/paris/400/300.jpg',
    rating: 4.9,
    review_count: 203,
    category: DestinationCategory.ROMANTIC,
    tags: ['romantic', 'city', 'culture'],
    amenities: [],
    availability: [],
    included_items: ['Hotel accommodation', 'City tour', 'Museum passes'],
    excluded_items: ['Airfare', 'Travel insurance'],
    cancellation_policy: {
      id: 2,
      name: 'Moderate',
      description: '50% refund if cancelled 14 days before travel',
      full_refund_days: 14,
      partial_refund_days: 7,
      partial_refund_percentage: 50
    },
    operator_id: 2,
    is_featured: true,
    is_active: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  // New destinations added below
  {
    id: 3,
    title: 'Swiss Alps Hiking',
    slug: 'swiss-alps-hiking',
    description: 'Conquer the majestic peaks of the Swiss Alps with expert guides and breathtaking views.',
    short_description: 'An exhilarating hiking adventure in the Swiss Alps.',
    location: 'Zermatt, Switzerland',
    coordinates: { latitude: 46.0173, longitude: 7.7504 },
    price: 2199,
    currency: 'USD',
    images: [],
    featured_image: 'https://picsum.photos/seed/swissalps/400/300.jpg',
    rating: 4.7,
    review_count: 89,
    category: DestinationCategory.ADVENTURE,
    tags: ['hiking', 'mountains', 'nature'],
    amenities: [],
    availability: [],
    included_items: ['Mountain lodge accommodation', 'Meals', 'Professional guide', 'Equipment rental'],
    excluded_items: ['Transportation to Zermatt', 'Personal gear', 'Travel insurance'],
    cancellation_policy: {
      id: 3,
      name: 'Strict',
      description: 'Only 25% refund if cancelled 21 days before travel',
      full_refund_days: 30,
      partial_refund_days: 21,
      partial_refund_percentage: 25
    },
    operator_id: 3,
    is_featured: true,
    is_active: true,
    created_at: '2023-01-15T00:00:00Z',
    updated_at: '2023-01-15T00:00:00Z'
  },
  {
    id: 4,
    title: 'Maldives Paradise',
    slug: 'maldives-paradise',
    description: 'Relax in overwater bungalows and enjoy pristine beaches in the Maldives.',
    short_description: 'Ultimate beach relaxation in the Maldives.',
    location: 'Male, Maldives',
    coordinates: { latitude: 3.2028, longitude: 73.2207 },
    price: 3499,
    currency: 'USD',
    images: [],
    featured_image: 'https://picsum.photos/seed/maldives/400/300.jpg',
    rating: 4.9,
    review_count: 156,
    category: DestinationCategory.BEACH,
    tags: ['beach', 'luxury', 'relaxation'],
    amenities: [],
    availability: [],
    included_items: ['Overwater villa', 'All meals', 'Airport transfers', 'Snorkeling equipment'],
    excluded_items: ['Spa treatments', 'Alcoholic beverages', 'Scuba diving certification'],
    cancellation_policy: {
      id: 4,
      name: 'Flexible',
      description: 'Free cancellation up to 14 days before travel',
      full_refund_days: 14,
      partial_refund_days: 7,
      partial_refund_percentage: 50
    },
    operator_id: 4,
    is_featured: true,
    is_active: true,
    created_at: '2023-02-01T00:00:00Z',
    updated_at: '2023-02-01T00:00:00Z'
  },
  {
    id: 5,
    title: 'Japan Cultural Journey',
    slug: 'japan-cultural-journey',
    description: 'Immerse yourself in the rich traditions and modern marvels of Japan.',
    short_description: 'A deep dive into Japanese culture and history.',
    location: 'Tokyo, Kyoto, Japan',
    coordinates: { latitude: 35.6762, longitude: 139.6503 },
    price: 2799,
    currency: 'USD',
    images: [],
    featured_image: 'https://picsum.photos/seed/japan/400/300.jpg',
    rating: 4.8,
    review_count: 178,
    category: DestinationCategory.CULTURAL,
    tags: ['culture', 'history', 'food'],
    amenities: [],
    availability: [],
    included_items: ['Hotel accommodation', 'Rail pass', 'Guided tours', 'Cultural experiences'],
    excluded_items: ['International airfare', 'Personal expenses', 'Travel insurance'],
    cancellation_policy: {
      id: 5,
      name: 'Moderate',
      description: '75% refund if cancelled 21 days before travel',
      full_refund_days: 30,
      partial_refund_days: 21,
      partial_refund_percentage: 75
    },
    operator_id: 5,
    is_featured: false,
    is_active: true,
    created_at: '2023-02-15T00:00:00Z',
    updated_at: '2023-02-15T00:00:00Z'
  },
  {
    id: 6,
    title: 'African Safari Experience',
    slug: 'african-safari-experience',
    description: 'Witness the incredible wildlife of Africa in their natural habitat.',
    short_description: 'An unforgettable safari adventure in Kenya.',
    location: 'Maasai Mara, Kenya',
    coordinates: { latitude: -1.5214, longitude: 35.0403 },
    price: 3299,
    currency: 'USD',
    images: [],
    featured_image: 'https://picsum.photos/seed/safari/400/300.jpg',
    rating: 4.9,
    review_count: 142,
    category: DestinationCategory.NATURE,
    tags: ['wildlife', 'safari', 'nature'],
    amenities: [],
    availability: [],
    included_items: ['Safari lodge accommodation', 'All meals', 'Game drives', 'Park fees'],
    excluded_items: ['International airfare', 'Visa fees', 'Travel insurance'],
    cancellation_policy: {
      id: 6,
      name: 'Strict',
      description: 'Only 25% refund if cancelled 30 days before travel',
      full_refund_days: 45,
      partial_refund_days: 30,
      partial_refund_percentage: 25
    },
    operator_id: 6,
    is_featured: true,
    is_active: true,
    created_at: '2023-03-01T00:00:00Z',
    updated_at: '2023-03-01T00:00:00Z'
  },
  {
    id: 7,
    title: 'Italian Culinary Tour',
    slug: 'italian-culinary-tour',
    description: 'Savor the authentic flavors of Italy with hands-on cooking classes and wine tastings.',
    short_description: 'A gastronomic journey through Italy.',
    location: 'Tuscany, Italy',
    coordinates: { latitude: 43.7711, longitude: 11.2486 },
    price: 2499,
    currency: 'USD',
    images: [],
    featured_image: 'https://picsum.photos/seed/italy/400/300.jpg',
    rating: 4.7,
    review_count: 98,
    category: DestinationCategory.FOOD_AND_DRINK,
    tags: ['food', 'wine', 'cooking'],
    amenities: [],
    availability: [],
    included_items: ['Villa accommodation', 'Cooking classes', 'Wine tastings', 'Local market tours'],
    excluded_items: ['International airfare', 'Personal expenses', 'Travel insurance'],
    cancellation_policy: {
      id: 7,
      name: 'Moderate',
      description: '50% refund if cancelled 14 days before travel',
      full_refund_days: 21,
      partial_refund_days: 14,
      partial_refund_percentage: 50
    },
    operator_id: 7,
    is_featured: false,
    is_active: true,
    created_at: '2023-03-15T00:00:00Z',
    updated_at: '2023-03-15T00:00:00Z'
  },
  {
    id: 8,
    title: 'Ancient Egypt Explorer',
    slug: 'ancient-egypt-explorer',
    description: 'Discover the wonders of ancient Egypt, from pyramids to temples along the Nile.',
    short_description: 'A journey through ancient Egyptian history.',
    location: 'Cairo, Luxor, Egypt',
    coordinates: { latitude: 30.0444, longitude: 31.2357 },
    price: 1999,
    currency: 'USD',
    images: [],
    featured_image: 'https://picsum.photos/seed/egypt/400/300.jpg',
    rating: 4.6,
    review_count: 112,
    category: DestinationCategory.HISTORICAL,
    tags: ['history', 'archaeology', 'culture'],
    amenities: [],
    availability: [],
    included_items: ['Hotel accommodation', 'Nile cruise', 'Guided tours', 'Entrance fees'],
    excluded_items: ['International airfare', 'Personal expenses', 'Travel insurance'],
    cancellation_policy: {
      id: 8,
      name: 'Moderate',
      description: '60% refund if cancelled 21 days before travel',
      full_refund_days: 30,
      partial_refund_days: 21,
      partial_refund_percentage: 60
    },
    operator_id: 8,
    is_featured: true,
    is_active: true,
    created_at: '2023-04-01T00:00:00Z',
    updated_at: '2023-04-01T00:00:00Z'
  }
];

// This is the service object that your hooks will use
export const destinationService = {
  /**
   * Simulates fetching a list of destinations with optional search parameters.
   * @param params - The search and filter parameters.
   * @returns A promise that resolves with a SearchResult object.
   */
  getDestinations: async (params: SearchParams = {}): Promise<SearchResult> => {
    console.log('Fetching destinations with params:', params);
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, you would filter and sort the data based on params here.
    // For now, we just return all mock data.
    const total_count = mockDestinations.length;

    return {
      destinations: mockDestinations,
      total_count,
      page: params.page || 1,
      limit: params.limit || 10,
      has_next: false,
      has_prev: false,
    };
  },

  /**
   * Simulates fetching a single destination by its ID.
   * @param id - The ID of the destination to fetch.
   * @returns A promise that resolves with the Destination object or null if not found.
   */
  getDestinationById: async (id: number): Promise<Destination | null> => {
    console.log(`Fetching destination with id: ${id}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDestinations.find(dest => dest.id === id) || null;
  }
};