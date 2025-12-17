import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole } from '../../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoading?: boolean;          
  requiredRole?: UserRole;
  userRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  isLoading,
  requiredRole,
  userRole,
}) => {
  const location = useLocation();

  
  if (isLoading) {
    return null; 
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  
  return <>{children}</>;
};

export default ProtectedRoute;
