// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import './i18n';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/Home';
import DestinationList from './features/destinations/DestinationList';
import DestinationDetail from './features/destinations/DestinationDetail';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import BookingForm from './features/bookings/bookingForm';
import PaymentForm from './features/payments/PaymentForm';
import MyBookings from './features/bookings/MyBookings';
import AdminDashboard from './features/admin/AdminDashboard';
import AdminLogin from './features/auth/AdminLogin'; 

import NotFoundPage from './pages/NotFoundPage';

// Utility Components
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';
import LoadingSpinner from './components/common/LoadingSpinner';

// Context
import { AuthProvider, useAuthContext } from './features/auth/AuthContext';
import { LanguageProvider } from './features/auth/LanguageContext';
import { UserRole } from './types/auth';

// React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
    mutations: { retry: 1 },
  },
});

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuthContext();

  // Show a spinner while auth state is loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationList />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />

          {/* Auth Routes - only for guests */}
          <Route
            path="/login"
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <RegisterForm />
              </PublicRoute>
            }
          />
           <Route
            path="/admin/login"
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <AdminLogin />
              </PublicRoute>
            }
          />

          {/* Protected Routes - require authentication */}
          <Route
            path="/destinations/:id/book"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                userRole={user?.role}
              >
                <BookingForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings/:id/payment"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                userRole={user?.role}
              >
                <PaymentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                userRole={user?.role}
              >
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Admin-only Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                requiredRole={UserRole.ADMIN}
                userRole={user?.role}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirects */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#363636', color: '#fff', borderRadius: '8px', fontSize: '14px' },
              success: { duration: 3000, iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error: { duration: 5000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
            containerStyle={{ top: 20, right: 20 }}
          />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
