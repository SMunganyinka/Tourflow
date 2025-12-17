export interface Destination {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description?: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  city?: string;
  country?: string;
  price: number;
  original_price?: number;
  currency: string;
  images: DestinationImage[];
  featured_image: string;
  rating: number;
  review_count: number;
  category: DestinationCategory;
  tags: string[];
  amenities: Amenity[];
  availability: AvailabilitySlot[];
  duration?: string;
  difficulty_level?: 'easy' | 'moderate' | 'challenging';
  group_size?: {
    min: number;
    max: number;
  };
  included_items: string[];
  excluded_items: string[];
  cancellation_policy: CancellationPolicy;
  operator_id: number;
  operator?: Operator;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DestinationImage {
  id: number;
  url: string;
  alt_text?: string;
  is_primary: boolean;
}

export enum DestinationCategory {
  ADVENTURE = 'adventure',
  BEACH = 'beach',
  CULTURAL = 'cultural',
  ECO_TOURISM = 'eco-tourism',
  FOOD_AND_DRINK = 'food-and-drink',
  HISTORICAL = 'historical',
  MOUNTAIN = 'mountain',
  NATURE = 'nature',
  NIGHTLIFE = 'nightlife',
  ROMANTIC = 'romantic',
  URBAN = 'urban',
  WELLNESS = 'wellness'
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
  description?: string;
}

export interface AvailabilitySlot {
  id: number;
  start_date: string;
  end_date: string;
  available_spots: number;
  price?: number;
}

export interface CancellationPolicy {
  id: number;
  name: string;
  description: string;
  full_refund_days: number;
  partial_refund_days: number;
  partial_refund_percentage: number;
}

export interface Operator {
  id: number;
  name: string;
  description: string;
  logo_url?: string;
  contact_email: string;
  contact_phone?: string;
  website?: string;
  rating: number;
  review_count: number;
  is_verified: boolean;
  created_at: string;
}

export interface SearchParams {
  query?: string;
  location?: string;
  category?: DestinationCategory;
  price_range?: {
    min: number;
    max: number;
  };
  rating?: number;
  start_date?: string;
  end_date?: string;
  group_size?: number;
  amenities?: string[];
  tags?: string[];
  page?: number;
  limit?: number;
  sort_by?: SortField;
  sort_order?: SortOrder;
}

export enum SortField {
  PRICE = 'price',
  RATING = 'rating',
  CREATED_AT = 'created_at',
  POPULARITY = 'popularity'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export interface SearchResult {
  destinations: Destination[];
  total_count: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}
// src/types/destination.ts

// ... other exports
// Make sure this is explicitly exported