// src/types/auth.ts
export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  phone_number?: string;
  is_active: boolean;
  role: UserRole;
  created_at: string;
  updated_at: string;
  last_login?: string;
   is_admin: boolean;
}

export enum UserRole {
  CUSTOMER = 'customer',
  OPERATOR = 'operator',
  ADMIN = 'admin'
}

export interface LoginRequest {
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface RegisterRequest {
  email: string;
  username: string;
  full_name: string;
  password: string;
  confirmPassword: string;
  agree_terms: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface UserProfile extends User {
  bio?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
  booking_updates: boolean;
  price_alerts: boolean;
}