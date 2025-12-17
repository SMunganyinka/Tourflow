import type { User } from './auth';
import type { Destination } from './destination';
import type { Payment } from './payment';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAYMENT_REQUIRED = 'payment_required',
  PAYMENT_PROCESSING = 'payment_processing',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show'
}

export interface Booking {
  id: number;
  booking_reference: string;
  user_id: number;
  user?: User;
  destination_id: number;
  destination?: Destination;
  booking_date: string;
  travel_date: string;
  end_date?: string;
  number_of_people: number;
  travelers: Traveler[];
  total_price: number;
  currency: string;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_id?: string;
  payment?: Payment;
  special_requests?: string;
  cancellation_reason?: string;
  cancellation_date?: string;
  refund_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface Traveler {
  id?: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  date_of_birth?: string;
  passport_number?: string;
  nationality?: string;
  special_requirements?: string;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export interface BookingFormData {
  destination_id: number;
  travel_date: string;
  end_date?: string;
  number_of_people: number;
  travelers: Traveler[];
  special_requests?: string;
}