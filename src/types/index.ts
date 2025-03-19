
export type Seat = {
  id: string;
  row: string;
  number: number;
  price: number;
  status: 'available' | 'unavailable' | 'selected';
};

export type User = {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
};

export type Concert = {
  id: string;
  name: string;
  date: string;
  image: string;
  genre?: string;
};

export type Ticket = {
  id: string;
  concertId: string;
  concertName: string;
  date: string;
  seat: Seat;
  userId?: string;
  price: number;
  paymentMethod?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  qrCode?: string;
};

export interface AppState {
  selectedConcert: Concert | null;
  selectedSeats: Seat[];
  tickets: Ticket[];
  auth: {
    user: User | null;
    isAuthenticated: boolean;
  };
}
