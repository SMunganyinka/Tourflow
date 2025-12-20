// src/features/admin/AdminDashboard.tsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartBar, FaUsers, FaMapMarkedAlt, FaDollarSign, FaStar } from 'react-icons/fa';
import type { Booking } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { operatorAPI } from '../../services/operatorAPI';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'destinations' | 'users'>('overview');

  // Fetch real data from API
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => operatorAPI.getDashboardStats(),
  });

  const { data: bookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => operatorAPI.getBookings(),
  });

  const { data: destinations } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => operatorAPI.getDestinations(),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            {t('common.error')}
          </h2>
          <p className="text-red-600 mb-4">
            {error.message || 'Failed to load dashboard data'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
          >
            {t('common.refresh')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t('dashboard.title')}
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
                  {t('dashboard.totalBookings')}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats?.total_bookings?.toLocaleString() || '0'}
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
                  {t('dashboard.totalRevenue')}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(stats?.total_revenue || 0)}
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
                  {t('dashboard.totalUsers')}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats?.total_users?.toLocaleString() || '0'}
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
                  {t('dashboard.totalDestinations')}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats?.total_destinations || 0}
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
            {t('dashboard.tabs.overview')}
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            {t('dashboard.tabs.bookings')}
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'destinations'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('destinations')}
          >
            {t('dashboard.tabs.destinations')}
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('users')}
          >
            {t('dashboard.tabs.users')}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.tabs.overview')}</h2>
            <p>Dashboard overview with real API data</p>
          </div>
        )}

        {activeTab === 'bookings' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                {t('admin.dashboard.recentBookings')}
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
                    {bookings?.map((booking: Booking) => (
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
                            // Fix: Compare with string value after converting to lowercase
                            // or use the correct status value based on your BookingStatus type
                            booking.status?.toString().toLowerCase() === 'confirmed' 
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
                {t('admin.dashboard.topDestinations')}
              </h3>
            </CardHeader>
            <CardContent>
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
                    {destinations?.map((destination) => (
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