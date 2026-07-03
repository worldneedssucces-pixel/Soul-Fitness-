export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl?: string;
  imageUrl?: string;
  category?: string;
  helpfulCount: number;
  role?: string;
}

export interface Booking {
  id: string;
  clientName: string;
  phoneNumber: string;
  sessionType: string;
  date: string;
  timeSlot: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

export interface TrialPass {
  id: string;
  name: string;
  email: string;
  phone: string;
  code: string;
  expiresAt: string;
}

export interface Facility {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface GymHours {
  day: string;
  hours: string;
  isOpen: boolean;
}
