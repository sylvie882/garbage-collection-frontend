export interface Carousel {
  id: number;
  title: string;
  description: string;
  image_path: string;
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
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: string;
  priceUnit?: string;
  duration?: string;
  frequency?: string;
  features?: string[];
  benefits?: string[];
  image?: string;
  youtubeUrl?: string;  // Add this
  imageUrl?: string;    // Add this
  imagePath?: string; // camelCase
  createdAt?: string;
  updatedAt?: string;
  slug: string;  // Make sure this exists
  videoUrl?: string;
}