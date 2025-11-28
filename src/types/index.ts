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


interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  compare_price: string | null;
  cost_price: string | null;
  sku: string;
  barcode: string | null;
  quantity: number;
  track_quantity: boolean;
  is_active: boolean;
  is_featured: boolean;
  category_id: number | null;
  brand: string | null;
  images: string[]; // Changed from string[] | null to string[]
  specifications: string[] | string | null;
  features: string[] | string | null;
  youtube_url: string | null;
  weight: string | null;
  dimensions: string | null;
  is_digital: boolean;
  download_files: string | null;
  meta_title: string | null;
  meta_description: string | null;
  related_services: any[] | null;
  created_at: string;
  updated_at: string;
  image_urls: string[];
  discount_percentage: number;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
}