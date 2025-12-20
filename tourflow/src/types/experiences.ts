export interface Experience {
  id: number;
  title: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  review_count: number;
  duration: string;
  max_group_size: number;
  short_description: string;
  description: string;
  featured_image?: string;
  is_bestseller?: boolean;
  is_limited_offer?: boolean;
  is_hot_deal?: boolean;
  created_at: string;
  updated_at: string;
}