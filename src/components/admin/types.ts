export interface Booking {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  date?: string;
  booking_date?: string;
  guests: number;
  message: string;
  status: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  is_available: boolean;
}

export const ITEMS_PER_PAGE = 10;
export const MENU_ITEMS_PER_PAGE = 6;

export const cardShell = "rounded-2xl border border-gold/15 bg-card/95 shadow-soft";
export const primaryAction =
  "bg-gradient-to-r from-gold to-gold-dark text-cream shadow-gold hover:shadow-elevated hover:scale-[1.01] active:scale-[0.99]";
export const positiveAction = "bg-green-600 text-white hover:bg-green-700";
export const dangerAction =
  "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800";
export const subtleAction =
  "border border-gold/25 bg-cream/70 text-charcoal hover:bg-gold/10 hover:border-gold/40";
