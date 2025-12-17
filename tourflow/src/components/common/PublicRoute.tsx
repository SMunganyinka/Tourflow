import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; // your spinner component

interface PublicRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoading?: boolean; // ✅ optional loading prop
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, isAuthenticated, isLoading }) => {
  // Show spinner while auth state is loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect authenticated users to home or dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
