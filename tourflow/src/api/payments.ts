// src/api/payments.ts

// CORRECT: Import the shared, configured instance from your central lib file
import api from './index'; 

export const paymentsAPI = {
  processPayment: (paymentData: {
    booking_id: number;
    card_number: string;
    expiry_date: string;
    cvv: string;
    cardholder_name: string;
  }) => api.post('/payments/process', paymentData),
};