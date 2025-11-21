// src/lib/api.ts (FIXED - CORS issue resolved)
import axios from 'axios';
import { Carousel, QuoteRequest, Service } from '../types';

// FIX: Hardcode the API URL to fix CORS issue
const API_URL = 'https://api.sylviegarbagecollection.co.ke';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('🚨 [API] Request error:', error.message);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging (FIXED)
api.interceptors.response.use(
  (response) => {
    console.log(`✅ [API] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('🚨 [API] Response error:', error.message);
    return Promise.reject(error);
  }
);

export const carouselApi = {
  getAll: () => api.get<Carousel[]>('/carousels'),
  create: (data: FormData) => api.post<Carousel>('/admin/carousels', data),
  update: (id: number, data: FormData) => api.put<Carousel>(`/admin/carousels/${id}`, data),
  delete: (id: number) => api.delete(`/admin/carousels/${id}`),
};

export const quoteRequestApi = {
  getAll: () => api.get<QuoteRequest[]>('/admin/quote-requests'),
  create: (data: Partial<QuoteRequest>) => api.post<{message: string; quote: QuoteRequest}>('/quote-requests', data),
  update: (id: number, data: Partial<QuoteRequest>) => api.put<QuoteRequest>(`/admin/quote-requests/${id}`, data),
  delete: (id: number) => api.delete(`/admin/quote-requests/${id}`),
};

export const serviceApi = {
  // FIXED: Handle both response structures
  getAll: async () => {
    const response = await api.get('/services');
    // If response.data is already an array, use it directly
    // If response.data has a data property that's an array, use that
    const data = Array.isArray(response.data) ? response.data : 
                (Array.isArray(response.data.data) ? response.data.data : response.data);
    return { data };
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/services/${id}`);
    const data = response.data.data || response.data;
    return { data };
  },
  
  getBySlug: async (slug: string) => {
    const response = await api.get(`/services/slug/${slug}`);
    const data = response.data.data || response.data;
    return { data };
  },
  
  // Simple service lookup without complex logic
  getByIdentifier: async (identifier: string): Promise<Service> => {
    console.log('🔍 [API] Looking up service with identifier:', identifier);
    
    // First try slug lookup
    try {
      console.log('🔄 [API] Trying slug endpoint...');
      const response = await serviceApi.getBySlug(identifier);
      console.log('✅ [API] Slug lookup successful');
      return response.data;
    } catch (slugError: any) {
      console.log('⚠️ [API] Slug lookup failed, trying ID...');
      
      // If identifier is numeric, try ID lookup
      if (!isNaN(Number(identifier))) {
        try {
          console.log('🔄 [API] Trying ID lookup...');
          const response = await serviceApi.getById(parseInt(identifier));
          console.log('✅ [API] ID lookup successful');
          return response.data;
        } catch (idError) {
          console.error('🚨 [API] ID lookup failed');
          throw new Error(`Service not found with identifier: ${identifier}`);
        }
      }
      
      throw new Error(`Service not found with slug: ${identifier}`);
    }
  },
  
  create: (data: FormData) => api.post<Service>('/admin/services', data),
  update: (id: number, data: FormData) => api.put<Service>(`/admin/services/${id}`, data),
  delete: (id: number) => api.delete(`/admin/services/${id}`),
};