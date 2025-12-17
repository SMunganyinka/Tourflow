import type { User } from './auth';
import type { Destination } from './destination';
export interface Review {
  id: number;
  user_id: number;
  user?: User;
  destination_id: number;
  destination?: Destination;
  booking_id?: number;
  rating: number;
  title?: string;
  comment: string;
  images?: ReviewImage[];
  helpful_count: number;
  is_verified: boolean;
  response?: ReviewResponse;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface ReviewImage {
  id: number;
  url: string;
  alt_text?: string;
}

export interface ReviewResponse {
  id: number;
  review_id: number;
  responder_id: number;
  responder?: User;
  comment: string;
  created_at: string;
}

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FLAGGED = 'flagged'
}

export interface ReviewFormData {
  destination_id: number;
  booking_id?: number;
  rating: number;
  title?: string;
  comment: string;
}