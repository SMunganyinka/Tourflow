// src/features/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartBar, FaUsers, FaMapMarkedAlt, FaDollarSign, FaStar } from 'react-icons/fa';
import type { DashboardStats, Booking, Destination} from '../../types';
import { BookingStatus, PaymentStatus, DestinationCategory } from '../../types'; // Import the enums
import { formatCurrency, formatDate } from '../../utils/helpers';
import {Card,  CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'destinations' | 'users'>('overview');

  // Mock data for demonstration
   const mockStats: DashboardStats = {
    total_bookings: 1247,
    total_revenue: 1578923,
    total_users: 3542,
    total_destinations: 48,
    recent_bookings: [
      {
        id: 1, // Added missing id
        destination_id: 1,
        booking_reference: 'WH-2023-001',
        user_id: 1,
        destination: {
          id: 1,
          title: 'Bali Adventure',
          slug: 'bali-adventure',
          description: 'Experience beauty of Bali',
          location: 'Bali, Indonesia',
          coordinates: { latitude: -8.3405, longitude: 115.0920 },
          price: 1299,
          currency: 'USD',
          images: [],
          featured_image: 'https://picsum.photos/seed/bali/400/300.jpg',
          rating: 4.8,
          review_count: 124,
          category: DestinationCategory.ADVENTURE,
          tags: [],
          amenities: [],
          availability: [],
          operator_id: 1,
          is_featured: true,
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
          included_items: ['Accommodation', 'Daily breakfast', 'Airport transfers'],
          excluded_items: ['Lunch and dinner', 'Personal expenses'],
          cancellation_policy: { // Use the CancellationPolicy interface
            id: 1,
            name: 'Flexible',
            description: 'Free cancellation up to 7 days before travel',
            full_refund_days: 7,
            partial_refund_days: 3,
            partial_refund_percentage: 50
          },
        },
        booking_date: '2023-05-15',
        travel_date: '2023-06-20',
        end_date: '2023-06-25',
        number_of_people: 2,
        travelers: [
          { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
          { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com' }
        ],
        total_price: 2598,
        currency: 'USD',
        status: BookingStatus.CONFIRMED, // Use the enum value
        payment_status: PaymentStatus.COMPLETED, // Use the enum value
        created_at: '2023-05-15',
        updated_at: '2023-05-15'
      },
      {
        id: 2,
        booking_reference: 'WH-2023-002',
        user_id: 2,
        destination_id: 2,
        destination: {
          id: 2,
          title: 'Paris Getaway',
          slug: 'paris-getaway',
          description: 'Romantic trip to city of lights',
          location: 'Paris, France',
          coordinates: { latitude: 48.8566, longitude: 2.3522 },
          price: 1899,
          currency: 'USD',
          images: [],
          featured_image: 'https://picsum.photos/seed/paris/400/300.jpg',
          rating: 4.9,
          review_count: 203,
          category: DestinationCategory.ROMANTIC, // Use the enum value
          tags: [],
          amenities: [],
          availability: [],
          operator_id: 2,
          is_featured: true,
          is_active: true,
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
          included_items: ['Hotel accommodation', 'City tour', 'Museum passes'],
          excluded_items: ['Airfare', 'Travel insurance'],
          cancellation_policy: { // Use the CancellationPolicy interface
            id: 2,
            name: 'Moderate',
            description: '50% refund if cancelled 14 days before travel',
            full_refund_days: 14,
            partial_refund_days: 7,
            partial_refund_percentage: 50
          },
        },
        booking_date: '2023-04-10',
        travel_date: '2023-08-15',
        end_date: '2023-08-20',
        number_of_people: 2,
        travelers: [
          { first_name: 'Michael', last_name: 'Smith', email: 'michael@example.com' },
          { first_name: 'Sarah', last_name: 'Smith', email: 'sarah@example.com' }
        ],
        total_price: 3798,
        currency: 'USD',
        status: BookingStatus.PENDING, // Use the enum value
        payment_status: PaymentStatus.PENDING, // Use the enum value
        created_at: '2023-04-10',
        updated_at: '2023-04-10'
      }
    ],
    top_destinations: [
      {
        id: 1, // Changed from id
        title: 'Bali Adventure',
        slug: 'bali-adventure',
        description: 'Experience beauty of Bali',
        location: 'Bali, Indonesia',
        coordinates: { latitude: -8.3405, longitude: 115.0920 },
        price: 1299,
        currency: 'USD',
        images: [],
        featured_image: 'https://picsum.photos/seed/bali/400/300.jpg',
        rating: 4.8,
        review_count: 124,
        category: DestinationCategory.ADVENTURE, // Use the enum value
        tags: [],
        amenities: [],
        availability: [],
        operator_id: 1,
        is_featured: true,
        is_active: true,
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
        included_items: ['Accommodation', 'Daily breakfast', 'Airport transfers'],
        excluded_items: ['Lunch and dinner', 'Personal expenses'],
        cancellation_policy: { // Use the CancellationPolicy interface
          id: 1,
          name: 'Flexible',
          description: 'Free cancellation up to 7 days before travel',
          full_refund_days: 7,
          partial_refund_days: 3,
          partial_refund_percentage: 50
        },
      },
      {
        id: 2, // Changed from id
        title: 'Paris Getaway',
        slug: 'paris-getaway',
        description: 'Romantic trip to city of lights',
        location: 'Paris, France',
        coordinates: { latitude: 48.8566, longitude: 2.3522 },
        price: 1899,
        currency: 'USD',
        images: [],
        featured_image: 'https://picsum.photos/seed/paris/400/300.jpg',
        rating: 4.9,
        review_count: 203,
        category: DestinationCategory.ROMANTIC, // Use the enum value
        tags: [],
        amenities: [],
        availability: [],
        operator_id: 2,
        is_featured: true,
        is_active: true,
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
        included_items: ['Hotel accommodation', 'City tour', 'Museum passes'],
        excluded_items: ['Airfare', 'Travel insurance'],
        cancellation_policy: { // Use the CancellationPolicy interface
          id: 2,
          name: 'Moderate',
          description: '50% refund if cancelled 14 days before travel',
          full_refund_days: 14,
          partial_refund_days: 7,
          partial_refund_percentage: 50
        },
      }
    ],
    monthly_revenue: [
      { month: 'Jan', revenue: 120000, bookings: 85 },
      { month: 'Feb', revenue: 135000, bookings: 92 },
      { month: 'Mar', revenue: 155000, bookings: 108 },
      { month: 'Apr', revenue: 142000, bookings: 95 },
      { month: 'May', revenue: 178000, bookings: 121 },
      { month: 'Jun', revenue: 195000, bookings: 132 }
    ]
  };

  useEffect(() => { // Changed from useState to useEffect
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, []); // Added empty dependency array

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!stats) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t('admin.dashboard.title')}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FaChartBar className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t('admin.dashboard.totalBookings')}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.total_bookings.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FaDollarSign className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t('admin.dashboard.totalRevenue')}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(stats.total_revenue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FaUsers className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t('admin.dashboard.totalUsers')}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.total_users.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                <FaMapMarkedAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t('admin.dashboard.totalDestinations')}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.total_destinations}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            {t('admin.dashboard.tabs.overview')}
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            {t('admin.dashboard.tabs.bookings')}
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'destinations'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('destinations')}
          >
            {t('admin.dashboard.tabs.destinations')}
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('users')}
          >
            {t('admin.dashboard.tabs.users')}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('admin.dashboard.recentBookings')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recent_bookings.map((booking: Booking) => (
                    <div key={booking.id} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0">
                      <div>
                        <p className="font-medium text-gray-800">
                          {booking.destination?.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.booking_reference} • {formatDate(booking.booking_date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">
                          {formatCurrency(booking.total_price)}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === BookingStatus.CONFIRMED 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    {t('admin.dashboard.viewAllBookings')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Destinations */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('admin.dashboard.topDestinations')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.top_destinations.map((destination: Destination, index: number) => (
                    <div key={destination.id} className="flex items-center pb-4 border-b border-gray-200 last:border-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-medium text-sm mr-3">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-800">
                          {destination.title}
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span>{destination.rating} ({destination.review_count} reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">
                          {formatCurrency(destination.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    {t('admin.dashboard.viewAllDestinations')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'bookings' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                {t('admin.dashboard.bookings')}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.booking.reference')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.booking.destination')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.booking.date')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.booking.amount')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.booking.status')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.booking.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.recent_bookings.map((booking: Booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.booking_reference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.destination?.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(booking.booking_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(booking.total_price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            booking.status === BookingStatus.CONFIRMED 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="outline" size="sm">
                            {t('admin.dashboard.booking.view')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'destinations' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                {t('admin.dashboard.destinations')}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  {t('admin.dashboard.destinationsCount', { count: stats.total_destinations })}
                </p>
                <Button>
                  {t('admin.dashboard.addDestination')}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.destination.title')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.destination.location')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.destination.price')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.destination.rating')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.destination.status')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.dashboard.destination.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.top_destinations.map((destination: Destination) => (
                      <tr key={destination.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {destination.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {destination.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(destination.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span>{destination.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            destination.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {destination.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="outline" size="sm" className="mr-2">
                            {t('admin.dashboard.destination.edit')}
                          </Button>
                          <Button variant="outline" size="sm">
                            {t('admin.dashboard.destination.view')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                {t('admin.dashboard.users')}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  {t('admin.dashboard.usersCount', { count: stats.total_users })}
                </p>
                <Button>
                  {t('admin.dashboard.addUser')}
                </Button>
              </div>
              <div className="text-center py-8 text-gray-500">
                {t('admin.dashboard.usersPlaceholder')}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;