// src/features/payments/PaymentForm.tsx

import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { paymentsAPI } from '../../api/payments';
import toast from 'react-hot-toast';

// Define the type for the data your API expects
type PaymentDataType = {
  booking_id: number;
  cardholder_name: string;
  card_number: string;
  expiry_date: string;
  cvv: string;
};

// Define the type for the booking data passed via navigation state
interface PassedBookingData {
  id: string;
  destination_id: number;
  destination_name: string;
  price: number;
  travel_date: string;
}

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking as PassedBookingData;

  if (!booking) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>No booking information found. Please start a new booking.</p>
        <button 
          onClick={() => navigate('/destinations')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go to Destinations
        </button>
      </div>
    );
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Define the mutation function explicitly and separately
  const processPayment = async (paymentData: PaymentDataType) => {
    return await paymentsAPI.processPayment(paymentData);
  };
  
  const paymentMutation = useMutation({
    // Assign the explicitly defined function to mutationFn
    mutationFn: processPayment,
    onSuccess: () => {
      toast.success('Payment successful!');
      navigate('/payment-success');
    },
    onError: () => {
      toast.error('Payment failed. Please try again.');
    },
  });

  const onPaymentSubmit = (data: any) => {
    const fullPaymentData: PaymentDataType = {
      booking_id: Number(booking.id),
      cardholder_name: data.cardholderName,
      card_number: data.cardNumber,
      expiry_date: data.expiryDate,
      cvv: data.cvv,
    };
    paymentMutation.mutate(fullPaymentData);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Complete Your Payment</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Booking Summary</h2>
        <p><strong>Destination:</strong> {booking.destination_name}</p>
        <p><strong>Travel Date:</strong> {new Date(booking.travel_date).toLocaleDateString()}</p>
        <p><strong>Amount to Pay:</strong> <span className="text-2xl font-bold text-green-600">${booking.price}</span></p>
      </div>

      <form onSubmit={handleSubmit(onPaymentSubmit)} className="space-y-4">
        <div>
          <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
          <input {...register('cardholderName', { required: 'Cardholder name is required' })} type="text" id="cardholderName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          {errors.cardholderName && <p className="text-red-500 text-xs">{errors.cardholderName.message as string}</p>}
        </div>
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
          <input {...register('cardNumber', { required: 'Card number is required' })} type="text" id="cardNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber.message as string}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input {...register('expiryDate', { required: 'Expiry date is required' })} type="text" id="expiryDate" placeholder="MM/YY" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            {errors.expiryDate && <p className="text-red-500 text-xs">{errors.expiryDate.message as string}</p>}
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
            <input {...register('cvv', { required: 'CVV is required' })} type="text" id="cvv" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv.message as string}</p>}
          </div>
        </div>
        <button type="submit" disabled={paymentMutation.isPending} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50">
          {paymentMutation.isPending ? 'Processing...' : `Pay $${booking.price}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;