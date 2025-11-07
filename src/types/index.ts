// src/types.ts

export interface Carousel {
  id: number;
  title: string;
  description: string;
  image_path: string;   // backend field (snake_case)
  image_url?: string;   // new property for frontend (computed full URL)
  button_text?: string;
  button_link?: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_type: string;
  message: string;
  status: 'pending' | 'contacted' | 'quoted' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  full_description: string | null;
  icon: string | null;
  image_path: string | null;
  youtube_url: string | null;
  category: string | null;
  price: string | null;
  price_unit: string | null;
  duration: string | null;
  frequency: string | null;
  features: string[];
  benefits: string[];
  order: number;
  is_active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  image_url: string | null;
}

// Optional: If you need a frontend-friendly version with camelCase
export interface ServiceFrontend {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string | null;
  icon: string | null;
  imagePath: string | null;
  youtubeUrl: string | null;
  category: string | null;
  price: string | null;
  priceUnit: string | null;
  duration: string | null;
  frequency: string | null;
  features: string[];
  benefits: string[];
  order: number;
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
}