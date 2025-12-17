

// src/types/payment.ts

// Add this line before the Payment interface
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';


export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method: PaymentMethod;
  transaction_id?: string;
  gateway_response?: any;
  created_at: string;
  updated_at: string;
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTO = 'crypto',
  VOUCHER = 'voucher'
}

export interface PaymentFormData {
  payment_method: PaymentMethod;
  card_number?: string;
  card_expiry?: string;
  card_cvv?: string;
  cardholder_name?: string;
  billing_address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
}