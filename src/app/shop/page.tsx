'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCompare } from '@/contexts/CompareContext';

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
  images: string[] | null;
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

interface Category {
  id: number;
  name: string;
  slug: string;
  products_count: number;
  is_active: boolean;
}

interface ApiResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Notification Component
interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
  isVisible: boolean;
}

function Notification({ type, message, onClose, isVisible }: NotificationProps) {
  if (!isVisible) return null;

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className={`fixed top-24 right-4 z-50 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 transform transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className={`flex items-start space-x-3 p-3 rounded-lg border ${styles[type]}`}>
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Confirmation Modal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

function ConfirmationModal({ 
  isOpen, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel", 
  onConfirm, 
  onCancel,
  type = 'warning'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const styles = {
    danger: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const buttonStyles = {
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className={`p-6 border-b ${styles[type]}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex space-x-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonStyles[type]}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Form Modal Component
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  product_id: number;
}

interface SellerInfo {
  whatsapp_number: string;
  email: string;
  business_name: string;
}

function ContactModal({ isOpen, onClose, product, onSubmit, isLoading }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    product_id: product?.id || 0
  });

  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        product_id: product.id,
        message: `Hi, I'm interested in your product "${product.name}". Please provide more information.`
      }));
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Seller</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {product && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-green-600 font-semibold">
                    KES {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+254 XXX XXX XXX"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tell us what you need..."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Helper function to get product image URL
const getProductImage = (product: Product) => {
  // Check image_urls first
  if (product.image_urls && product.image_urls.length > 0) {
    const imageUrl = product.image_urls[0];
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
  }
  
  // Check images array
  if (product.images && product.images.length > 0) {
    const imagePath = product.images[0];
    if (imagePath.startsWith('http')) {
      return imagePath;
    } else {
      return `https://api.sylviegarbagecollection.co.ke/storage/${imagePath}`;
    }
  }
  
  // Return placeholder based on product type
  if (product.name.toLowerCase().includes('mat')) {
    return '/placeholder-mat.jpg';
  }
  return '/placeholder-product.jpg';
};

// Format price safely
const formatPrice = (price: string | null): string => {
  if (!price) return '0';
  const numericPrice = parseFloat(price);
  return isNaN(numericPrice) ? '0' : numericPrice.toLocaleString();
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo | null>(null);
  
  // Notification state
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    isVisible: boolean;
  }>({
    type: 'success',
    message: '',
    isVisible: false
  });

  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
    type?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning'
  });

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const API_BASE_URL = 'https://api.sylviegarbagecollection.co.ke/api';

  // Show notification
  const showNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setNotification({ type, message, isVisible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  // Show confirmation modal
  const showConfirmation = (title: string, message: string, onConfirm: () => void, type?: 'danger' | 'warning' | 'info') => {
    setConfirmationModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      type
    });
  };

  // Handle confirmation
  const handleConfirm = () => {
    if (confirmationModal.onConfirm) {
      confirmationModal.onConfirm();
    }
    setConfirmationModal({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null
    });
  };

  // Handle cancel
  const handleCancel = () => {
    setConfirmationModal({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchSellerInfo();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, searchTerm, priceRange, currentPage]);

  const fetchSellerInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/seller-info`);
      if (response.ok) {
        const data = await response.json();
        setSellerInfo(data);
      }
    } catch (error) {
      console.error('Error fetching seller info:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.data || []);
      } else {
        console.error('Failed to fetch categories');
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (sortBy) params.append('sort', sortBy);
      if (searchTerm) params.append('search', searchTerm);
      params.append('min_price', priceRange[0].toString());
      params.append('max_price', priceRange[1].toString());
      params.append('page', currentPage.toString());

      console.log('Fetching products with params:', params.toString());

      const response = await fetch(`${API_BASE_URL}/products?${params}`);
      
      if (response.ok) {
        const productsData: ApiResponse<Product> = await response.json();
        console.log('Products API response:', productsData);
        
        setProducts(productsData.data || []);
        setTotalPages(productsData.last_page || 1);
      } else {
        console.error('Failed to fetch products, status:', response.status);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      const product = products.find(p => p.id === productId);
      if (product) {
        showNotification('success', `✅ ${product.name} added to cart!`);
      }
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Failed to add product to cart');
    }
  };

  const handleContactSeller = (product: Product) => {
    setSelectedProduct(product);
    setContactModalOpen(true);
  };

  const handleWhatsAppContact = (product: Product) => {
    if (!sellerInfo) {
      showNotification('warning', 'Seller information not available. Please try the email contact form.');
      return;
    }
    
    const message = `Hello! I'm interested in your product: ${product.name} (KES ${formatPrice(product.price)}). Please provide more information.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${sellerInfo.whatsapp_number}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleInquirySubmit = async (formData: ContactFormData) => {
    if (!selectedProduct) return;
    
    setIsSubmittingInquiry(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/product-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification('success', '✅ Your inquiry has been sent successfully! We will contact you shortly.');
        setContactModalOpen(false);
        setSelectedProduct(null);
      } else {
        showNotification('error', `❌ ${result.message || 'Failed to send inquiry. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      showNotification('error', '❌ Failed to send inquiry. Please check your connection and try again.');
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // Fix: Use type assertion to handle the images type mismatch
  const prepareProductForWishlist = (product: Product): any => {
    return {
      ...product,
      images: product.images || [],
      brand: product.brand || null,
      specifications: product.specifications || null,
      features: product.features || null,
      youtube_url: product.youtube_url || null,
      weight: product.weight || null,
      dimensions: product.dimensions || null,
      download_files: product.download_files || null,
      meta_title: product.meta_title || null,
      meta_description: product.meta_description || null,
      related_services: product.related_services || null
    };
  };

  // Helper function to get stock status
  const getStockStatus = (product: Product) => {
    if (!product.track_quantity) return 'in_stock';
    return product.quantity > 0 ? 'in_stock' : 'out_of_stock';
  };

  // Safe function to get features array
  const getFeaturesArray = (product: Product): string[] => {
    if (Array.isArray(product.features)) {
      return product.features;
    }
    if (typeof product.features === 'string') {
      try {
        // Try to parse JSON string
        const parsed = JSON.parse(product.features);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        // If it's a regular string, return as array
        return [product.features];
      }
    }
    return [];
  };

  // Safe function to get specifications
  const getSpecifications = (product: Product): string[] => {
    if (Array.isArray(product.specifications)) {
      return product.specifications;
    }
    if (typeof product.specifications === 'string') {
      try {
        const parsed = JSON.parse(product.specifications);
        if (typeof parsed === 'object') {
          return Object.entries(parsed).map(([key, value]) => `${key}: ${value}`);
        }
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [product.specifications];
      }
    }
    return [];
  };

  // Get all active products
  const activeProducts = products.filter(product => product.is_active);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        isVisible={notification.isVisible}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        title={confirmationModal.title}
        message={confirmationModal.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        type={confirmationModal.type}
      />
      
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Our Products</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premium hygiene products, consumables, and waste management supplies for your home and business
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-green-700 px-4 py-2 rounded-full text-sm font-medium">🚀 Same Day Delivery</span>
              <span className="bg-green-700 px-4 py-2 rounded-full text-sm font-medium">💳 Secure Payment</span>
              <span className="bg-green-700 px-4 py-2 rounded-full text-sm font-medium">🔄 Easy Returns</span>
              <span className="bg-green-700 px-4 py-2 rounded-full text-sm font-medium">⭐ Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className={`group p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-green-100 border-2 border-green-500 shadow-lg scale-105'
                    : 'bg-gray-50 border-2 border-transparent hover:border-green-300 hover:shadow-md'
                }`}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition-colors">
                  <span className="text-xl">🛍️</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">All Products</h3>
                <p className="text-xs text-gray-500">{activeProducts.length} products</p>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.slug);
                    setCurrentPage(1);
                  }}
                  className={`group p-4 rounded-xl text-center transition-all duration-300 ${
                    selectedCategory === category.slug
                      ? 'bg-green-100 border-2 border-green-500 shadow-lg scale-105'
                      : 'bg-gray-50 border-2 border-transparent hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition-colors">
                    <span className="text-xl">🛒</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.products_count || 0} products</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-semibold">Filters & Sort</span>
                  <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      placeholder="What are you looking for?"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>KES {priceRange[0].toLocaleString()}</span>
                      <span>KES {priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => {
                        setPriceRange([priceRange[0], parseInt(e.target.value)]);
                        setCurrentPage(1);
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="created_at">Newest First</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="-name">Name: Z to A</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>

                {/* Quick Category Links */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-green-100 text-green-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      All Products ({activeProducts.length})
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.slug);
                          setCurrentPage(1);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.slug
                            ? 'bg-green-100 text-green-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name} ({category.products_count || 0})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                    setPriceRange([0, 10000]);
                    setSortBy('created_at');
                    setCurrentPage(1);
                  }}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory !== 'all' 
                    ? categories.find(c => c.slug === selectedCategory)?.name || 'Category'
                    : 'All Products'
                  }
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing {activeProducts.length} product{activeProducts.length !== 1 ? 's' : ''}
                  {searchTerm && ` for "${searchTerm}"`}
                  {totalPages > 1 && ` - Page ${currentPage} of ${totalPages}`}
                </p>
              </div>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filters
              </button>
            </div>

            {loading ? (
              // Loading Skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                    <div className="bg-gray-200 h-48 w-full"></div>
                    <div className="p-4 space-y-3">
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                      <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                      <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                      <div className="bg-gray-200 h-10 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeProducts.length === 0 ? (
              // Empty State
              <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? `We couldn't find any products matching "${searchTerm}". Try adjusting your search or filters.`
                    : 'No products available in this category at the moment.'
                  }
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                    setPriceRange([0, 10000]);
                    setCurrentPage(1);
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Browse All Products
                </button>
              </div>
            ) : (
              // Products Grid - Displaying ALL active products
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeProducts.map((product) => {
                    const features = getFeaturesArray(product);
                    const specifications = getSpecifications(product);
                    
                    return (
                      <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        <div className="relative">
                          <Link href={`/shop/${product.slug}`}>
                            <div className="aspect-w-16 aspect-h-12 bg-gray-100 overflow-hidden">
                              <img
                                src={getProductImage(product)}
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder-product.png';
                                }}
                              />
                            </div>
                          </Link>
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.is_featured && (
                              <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full font-bold shadow-lg">
                                ⭐ Featured
                              </span>
                            )}
                            {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                              <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full font-bold shadow-lg">
                                🔥 Sale
                              </span>
                            )}
                          </div>

                          {/* Stock Status Badge */}
                          <div className="absolute top-3 right-3">
                            <span className={`px-2 py-1 text-xs rounded-full font-bold shadow-lg ${
                              getStockStatus(product) === 'in_stock' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}>
                              {getStockStatus(product) === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          {/* Category */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                              {product.category?.name || 'Uncategorized'}
                            </span>
                            {product.brand && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {product.brand}
                              </span>
                            )}
                          </div>

                          {/* Product Name */}
                          <Link href={`/shop/${product.slug}`}>
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors h-12">
                              {product.name}
                            </h3>
                          </Link>
                          
                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                            {product.short_description || product.description || 'No description available'}
                          </p>

                          {/* Features Preview */}
                          {features.length > 0 && (
                            <div className="mb-3">
                              <div className="flex flex-wrap gap-1">
                                {features.slice(0, 2).map((feature, index) => (
                                  <span 
                                    key={index}
                                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                  >
                                    {feature}
                                  </span>
                                ))}
                                {features.length > 2 && (
                                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                                    +{features.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Price */}
                          {/* <div className="flex items-center space-x-2 mb-4">
                            <span className="text-lg font-bold text-green-600">
                              KES {formatPrice(product.price)}
                            </span>
                            {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                              <span className="text-sm text-gray-500 line-through">
                                KES {formatPrice(product.compare_price)}
                              </span>
                            )}
                          </div> */}

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={getStockStatus(product) !== 'in_stock'}
                            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                              getStockStatus(product) === 'in_stock'
                                ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg transform hover:scale-105'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {getStockStatus(product) === 'in_stock' ? (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add to Cart
                              </>
                            ) : (
                              'Out of Stock'
                            )}
                          </button>
                          <br />

                            <p className='justify-center  items-center text-red-600 hover:text-red-700'>Contact Seller</p>
                          
                          {/* Contact Seller & Quick Actions */}
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                           
                            <button 
                              onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(prepareProductForWishlist(product))}
                              className={`text-sm flex items-center gap-1 transition-colors ${
                                isInWishlist(product.id) 
                                  ? 'text-red-600 hover:text-red-700' 
                                  : 'text-gray-500 hover:text-green-600'
                              }`}
                            >
                              <svg className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {isInWishlist(product.id) ? 'Saved' : 'Wishlist'}
                            </button>

                            {/* Contact Seller Buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleWhatsAppContact(product)}
                                className="text-sm flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
                                title="Contact via WhatsApp"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.553-8.485"/>
                                </svg>
                                WhatsApp
                              </button>
                              
                              <button
                                onClick={() => handleContactSeller(product)}
                                className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                                title="Send Message"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 border rounded-lg ${
                          currentPage === page
                            ? 'bg-green-600 text-white border-green-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Featured Products Banner */}
      {activeProducts.filter(p => p.is_featured).length > 0 && (
        <div className="bg-green-50 border-t border-green-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-2">Check out our most popular items</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeProducts.filter(p => p.is_featured).slice(0, 3).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md border border-green-200 p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  {/* <p className="text-green-600 font-bold text-lg mb-3">
                    KES {formatPrice(product.price)}
                  </p> */}
                  <Link 
                    href={`/shop/${product.slug}`}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => {
          setContactModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSubmit={handleInquirySubmit}
        isLoading={isSubmittingInquiry}
      />

      <Footer />
    </div>
  );
}