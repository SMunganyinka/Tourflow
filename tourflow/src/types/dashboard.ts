import type { Booking } from './booking';
import type { Destination } from './destination';

export interface DashboardStats {
  total_bookings: number;
  total_revenue: number;
  total_users: number;
  total_destinations: number;
  recent_bookings: Booking[];
  top_destinations: Destination[];
  monthly_revenue: MonthlyRevenue[];
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  bookings: number;
}