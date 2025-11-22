// src/lib/api.ts (FIXED - CSRF token handling added)
import axios from 'axios';
import { Carousel, QuoteRequest, Service } from '../types';

// FIX: Hardcode the API URL to fix CORS issue
const API_URL = 'https://api.sylviegarbagecollection.co.ke';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true, // ADD THIS: Essential for CSRF cookies
});

// CSRF Token Management
let csrfInitialized = false;

// Initialize CSRF token - REMOVED DUPLICATE EXPORT AT BOTTOM
export const initializeCSRF = async (): Promise<void> => {
  if (csrfInitialized) return;
  
  try {
    console.log('🔄 [API] Initializing CSRF token...');
    await api.get('/sanctum/csrf-cookie');
    csrfInitialized = true;
    console.log('✅ [API] CSRF token initialized');
  } catch (error) {
    console.error('🚨 [API] CSRF initialization failed:', error);
    throw error;
  }
};

// Add request interceptor for debugging and CSRF handling
api.interceptors.request.use(
  async (config) => {
    console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    // Ensure CSRF token is initialized for non-GET requests
    if (config.method !== 'get' && config.method !== 'GET') {
      await initializeCSRF();
    }
    
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
    
    // Handle CSRF token errors specifically
    if (error.response?.status === 419) {
      console.error('🔄 [API] CSRF token expired, reinitializing...');
      csrfInitialized = false;
      // You might want to retry the request here
    }
    
    return Promise.reject(error);
  }
);

export const carouselApi = {
  getAll: () => api.get<Carousel[]>('/carousels'),
  create: async (data: FormData) => {
    await initializeCSRF();
    return api.post<Carousel>('/admin/carousels', data);
  },
  update: async (id: number, data: FormData) => {
    await initializeCSRF();
    return api.put<Carousel>(`/admin/carousels/${id}`, data);
  },
  delete: async (id: number) => {
    await initializeCSRF();
    return api.delete(`/admin/carousels/${id}`);
  },
};

export const quoteRequestApi = {
  getAll: () => api.get<QuoteRequest[]>('/admin/quote-requests'),
  create: async (data: Partial<QuoteRequest>) => {
    // Ensure CSRF token is available before POST request
    await initializeCSRF();
    return api.post<{message: string; quote: QuoteRequest}>('/quote-requests', data);
  },
  update: async (id: number, data: Partial<QuoteRequest>) => {
    await initializeCSRF();
    return api.put<QuoteRequest>(`/admin/quote-requests/${id}`, data);
  },
  delete: async (id: number) => {
    await initializeCSRF();
    return api.delete(`/admin/quote-requests/${id}`);
  },
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
  
  create: async (data: FormData) => {
    await initializeCSRF();
    return api.post<Service>('/admin/services', data);
  },
  
  update: async (id: number, data: FormData) => {
    await initializeCSRF();
    return api.put<Service>(`/admin/services/${id}`, data);
  },
  
  delete: async (id: number) => {
    await initializeCSRF();
    return api.delete(`/admin/services/${id}`);
  },
};

// REMOVED: Duplicate export at the bottom
// export { initializeCSRF }; // DELETE THIS LINE