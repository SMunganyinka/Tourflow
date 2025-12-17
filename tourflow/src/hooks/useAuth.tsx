// src/hooks/useAuth.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    // This query will only run if a token exists in localStorage
    enabled: !!localStorage.getItem('token'),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const loginMutation = useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: () => {
      // On successful login, invalidate the 'currentUser' query.
      // This will trigger a refetch of the user data.
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: authService.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  const logout = async () => {
    await authService.logout();
    queryClient.setQueryData(['currentUser'], null);
    queryClient.clear();
  };

  return {
    user: user || undefined,
    isAuthenticated: !!user,
    isLoading,
    error,
    // The login function correctly returns a promise that resolves with the AuthResponse
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
  };
};