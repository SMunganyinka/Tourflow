// src/features/bookings/MyBookings.tsx

import { useQuery} from '@tanstack/react-query';
import { useAuthContext } from '../auth/AuthContext';
import { bookingsAPI } from '../../api/bookings';
import type { Booking, Destination } from '../../types';
import { Link } from 'react-router-dom';

// We'll create a type that combines booking and destination data
type BookingWithDestination = Booking & { destination: Destination };

const MyBookings = () => {
  const { user, isLoading: authLoading } = useAuthContext();


  // RENAME `data` to `bookingsResponse` for clarity
  const { data: bookingsResponse, isLoading, error } = useQuery({
    queryKey: ['myBookings'],
    queryFn: bookingsAPI.getMyBookings,
    enabled: !!user,
  });

  // EXTRACT the actual array of bookings from the response object
  const bookings = bookingsResponse?.data;

  if (authLoading || isLoading) {
    return <div className="container mx-auto p-8">Loading your bookings...</div>;
  }

  if (!user) {
    return <div className="container mx-auto p-8 text-center">Please <Link to="/login" className="text-blue-600 underline">log in</Link> to see your bookings.</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-red-500">Error fetching bookings. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {/* FIX 1: Check if `bookings` array exists and has items */}
      {bookings && bookings.length > 0 ? (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Destination</th>
                <th scope="col" className="px-6 py-3">Travel Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* FIX 2: Add an explicit type to the 'booking' parameter */}
              {bookings.map((booking: BookingWithDestination) => (
                <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {booking.destination ? booking.destination.title : `Destination ID: ${booking.destination_id}`}
                  </th>
                  <td className="px-6 py-4">
                    {new Date(booking.travel_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/destinations/${booking.destination_id}`} 
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You haven't made any bookings yet.</p>
          <Link 
            to="/destinations" 
            className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Explore Destinations
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;