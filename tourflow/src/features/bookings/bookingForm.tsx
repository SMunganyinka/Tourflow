// src/features/bookings/BookingForm.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../auth/AuthContext';
import { destinationsAPI } from '../../api/destinations';
import { bookingsAPI } from '../../api/bookings';
import type { Destination, BookingFormData } from '../../types';
import toast from 'react-hot-toast';

const BookingForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<BookingFormData>({
    defaultValues: {
      destination_id: id ? Number(id) : 0,
      number_of_people: 1,
    },
  });

  const numberOfPeople = watch('number_of_people');
  const travelDate = watch('travel_date');

  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        if (!id) return;
        const response = await destinationsAPI.getDestinationById(parseInt(id));
        setDestination(response.data);
      } catch (error) {
        console.error('Failed to fetch destination:', error);
        toast.error('Failed to load destination details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [id]);
  
  useEffect(() => {
    if (destination) {
      setTotalPrice(destination.price * numberOfPeople);
    }
  }, [destination, numberOfPeople]);
  
  // --- FIX: Removed unused 'data' parameter ---
  const onSubmit = async () => {
    if (!user) {
      toast.error('Please log in to make a booking');
      navigate('/login');
      return;
    }
    
    if (!destination) return;
    
    // Show confirmation dialog before submitting
    setShowConfirmation(true);
  };
  
  const confirmBooking = async () => {
    if (!destination) return;
    
    setIsSubmitting(true);
    try {
      const data = getValues();
      
      // Create the travelers array to match the BookingFormData type
      const travelers = [
        {
          // Use the logged-in user's info for the first traveler
          first_name: user?.username || 'Guest',
          last_name: user?.full_name || 'User',
          email: user?.email,
          // Add other required fields for a traveler if your backend needs them
        },
        // Add placeholder travelers if number_of_people > 1
        ...Array.from({ length: data.number_of_people - 1 }, (_, i) => ({
          first_name: `Traveler ${i + 2}`,
          last_name: 'Last Name',
        })),
      ];

      // --- FIX: Removed unused 'response' variable ---
      await bookingsAPI.createBooking({
        destination_id: destination.id,
        number_of_people: data.number_of_people,
        travel_date: data.travel_date,
        special_requests: data.special_requests,
        travelers: travelers,
      });
      
      toast.success('Booking created successfully!');
      // Navigate to the bookings list page instead of the payment page
      navigate('/my-bookings');
    } catch (error) {
      console.error('Failed to create booking:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };
  
  const cancelBooking = () => {
    setShowConfirmation(false);
  };
  
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
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }
  
  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Destination not found
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Your Trip</h1>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3">
              <img 
                src={destination.featured_image || 'https://picsum.photos/seed/destination/800/600.jpg'} 
                alt={destination.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{destination.title}</h2>
              <p className="text-gray-600 mb-2">{destination.location}</p>
              <div className="flex items-center mb-2">
                {renderStars(destination.rating)}
                <span className="ml-2 text-gray-600 text-sm">({destination.review_count || 0} reviews)</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600">Price per person:</p>
                  <p className="text-2xl font-bold text-gray-900">${destination.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Total:</p>
                  <p className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
          
          {!user && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">
              <p>You need to be logged in to make a booking. 
                <button 
                  type="button"
                  onClick={() => navigate('/login')}
                  className="ml-1 underline font-medium"
                >
                  Log in here
                </button>
              </p>
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="number_of_people" className="block text-sm font-medium text-gray-700 mb-1">
              Number of People
            </label>
            <input
              type="number"
              id="number_of_people"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('number_of_people', { 
                required: 'Number of people is required',
                min: { value: 1, message: 'At least 1 person is required' },
                max: { value: 20, message: 'Maximum 20 people allowed' }
              })}
            />
            {errors.number_of_people && (
              <p className="mt-1 text-sm text-red-600">{errors.number_of_people.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="travel_date" className="block text-sm font-medium text-gray-700 mb-1">
              Travel Date
            </label>
            <input
              type="date"
              id="travel_date"
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('travel_date', { 
                required: 'Travel date is required',
                validate: value => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return selectedDate >= today || 'Travel date must be in the future';
                }
              })}
            />
            {errors.travel_date && (
              <p className="mt-1 text-sm text-red-600">{errors.travel_date.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests (Optional)
            </label>
            <textarea
              id="special_requests"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special requirements or requests for your trip..."
              {...register('special_requests')}
            />
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(`/destinations/${id}`)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!user || isSubmitting}
              className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Complete Booking'}
            </button>
          </div>
        </form>
        
        {/* Booking Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Confirm Your Booking</h3>
              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Destination:</span> {destination.title}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Location:</span> {destination.location}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Number of People:</span> {numberOfPeople}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Travel Date:</span> {new Date(travelDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Total Price:</span> ${totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelBooking}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  disabled={isSubmitting}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;