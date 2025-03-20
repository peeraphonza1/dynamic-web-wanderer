
/**
 * Core types used throughout the application
 */

export interface Ticket {
  id: string;
  seat: string;
  row: string;
  date: string;
  eventName?: string;
}

export interface Concert {
  id: string;
  name: string;
  date: string;
  image: string;
  genre: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
  status: 'available' | 'unavailable' | 'selected';
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AppState {
  selectedConcert: Concert | null;
  selectedSeats: Seat[];
  tickets: Ticket[];
  auth: {
    user: AuthUser | null;
    isAuthenticated: boolean;
  };
}
