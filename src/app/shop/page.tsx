'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
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
  meta_keywords: string | null;
  related_services: any[] | null;
  created_at: string;
  updated_at: string;
  image_urls: string[];
  discount_percentage: number;
  category: {
    id: number;
    name: string;
    slug: string;
    meta_title?: string;
    meta_description?: string;
  } | null;
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

// SEO Helper function to generate structured data
const generateProductStructuredData = (products: Product[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.slice(0, 20).map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "url": `https://sylviegarbagecollection.co.ke/shop/${product.slug}`,
      "name": product.name,
      "description": product.short_description || product.description,
      "image": product.image_urls?.[0] || (product.images?.[0] ? `https://api.sylviegarbagecollection.co.ke/storage/${product.images[0]}` : null),
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "KES",
        "availability": product.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      },
      "brand": {
        "@type": "Brand",
        "name": product.brand || "Sylvie Collection"
      },
      "category": product.category?.name || "General"
    }))
  };
};

// Toast Notification Component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-up ${
      type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`}>
      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}

// Quick View Modal
function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-100 p-8 flex items-center justify-center">
              <img
                src={getProductImage(product)}
                alt={product.name}
                className="max-w-full h-auto max-h-80 object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-product.png';
                }}
              />
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.short_description || product.description}</p>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  KES {formatPrice(product.price)}
                </span>
                {product.compare_price && (
                  <span className="text-lg text-gray-400 line-through">
                    KES {formatPrice(product.compare_price)}
                  </span>
                )}
              </div>
              
              <Link
                href={`/shop/${product.slug}`}
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get product image URL
const getProductImage = (product: Product) => {
  if (product.image_urls && product.image_urls.length > 0) {
    const imageUrl = product.image_urls[0];
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
  }
  
  if (product.images && product.images.length > 0) {
    const imagePath = product.images[0];
    if (imagePath.startsWith('http')) {
      return imagePath;
    } else {
      return `https://api.sylviegarbagecollection.co.ke/storage/${imagePath}`;
    }
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
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const API_BASE_URL = 'https://api.sylviegarbagecollection.co.ke/api';
  const SITE_URL = 'https://sylviegarbagecollection.co.ke';

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Initialize from URL params
  useEffect(() => {
    if (searchParams) {
      const q = searchParams.get('q');
      const sort = searchParams.get('sort');
      const page = searchParams.get('page');
      
      if (q) setSearchTerm(q);
      if (sort) setSortBy(sort);
      if (page) setCurrentPage(parseInt(page));
    }
  }, [searchParams]);

  // Update URL with search params for better SEO
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (sortBy !== 'created_at') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/shop?${queryString}` : '/shop';
    
    window.history.replaceState({}, '', url);
  }, [searchTerm, sortBy, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, sortBy, priceRange, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (sortBy) params.append('sort', sortBy);
      params.append('min_price', priceRange[0].toString());
      params.append('max_price', priceRange[1].toString());
      params.append('page', currentPage.toString());
      params.append('per_page', '24');

      const response = await fetch(`${API_BASE_URL}/products?${params}`);
      
      if (response.ok) {
        const productsData: ApiResponse<Product> = await response.json();
        setProducts(productsData.data || []);
        setTotalPages(productsData.last_page || 1);
        setTotalProducts(productsData.total || 0);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(productId, 1);
      showToast('Product added to cart!', 'success');
    } catch (error) {
      showToast('Failed to add product to cart', 'error');
    }
  };

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', 'success');
    } else {
      // Ensure images is a non-null array to satisfy the wishlist API/type expectations
      const wishlistProduct = { ...product, images: product.images ?? [] };
      addToWishlist(wishlistProduct);
      showToast('Added to wishlist', 'success');
    }
  };

  const getStockStatus = (product: Product) => {
    if (!product.track_quantity) return 'in_stock';
    return product.quantity > 0 ? 'in_stock' : 'out_of_stock';
  };

  const activeProducts = products.filter(product => product.is_active);

  // Generate page title based on search/filter
  const getPageTitle = () => {
    if (searchTerm) {
      return `Search Results for "${searchTerm}" - Premium Products | Sylvie Collection`;
    }
    return 'Shop Premium Hygiene & Waste Management Products | Sylvie Collection';
  };

  // Generate meta description
  const getMetaDescription = () => {
    if (searchTerm) {
      return `Browse our selection of ${searchTerm} products. Find high-quality hygiene supplies, waste management solutions, and more at Sylvie Collection. Shop now for fast delivery.`;
    }
    return 'Discover premium hygiene products, consumables, and waste management supplies at Sylvie Collection. Shop our curated collection of high-quality products for home and business. Same day delivery available.';
  };

  // Generate meta keywords
  const getMetaKeywords = () => {
    const baseKeywords = 'hygiene products, waste management, cleaning supplies, janitorial supplies, sanitation products, eco-friendly products, Kenya';
    if (searchTerm) {
      return `${searchTerm}, ${baseKeywords}`;
    }
    return baseKeywords;
  };

  // Get canonical URL
  const getCanonicalUrl = () => {
    const baseUrl = `${SITE_URL}/shop`;
    if (searchTerm || sortBy !== 'created_at' || currentPage > 1) {
      return baseUrl;
    }
    return baseUrl;
  };

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content={getMetaKeywords()} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={getCanonicalUrl()} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/shop`} />
        <meta property="og:site_name" content="Sylvie Collection" />
        <meta property="og:image" content={`${SITE_URL}/og-shop-image.jpg`} />
        <meta property="og:locale" content="en_KE" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />
        <meta name="twitter:image" content={`${SITE_URL}/twitter-shop-image.jpg`} />
        
        {/* Additional SEO Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Sylvie Collection" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Nairobi" />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": SITE_URL
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Shop",
                  "item": `${SITE_URL}/shop`
                }
              ]
            })
          }}
        />
        
        {/* Product List Schema (if products exist) */}
        {activeProducts.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateProductStructuredData(activeProducts))
            }}
          />
        )}
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sylvie Collection",
              "url": SITE_URL,
              "logo": `${SITE_URL}/logo.png`,
              "sameAs": [
                "https://www.facebook.com/sylviecollection",
                "https://www.instagram.com/sylviecollection",
                "https://twitter.com/sylviecollection"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-XXX-XXX-XXX",
                "contactType": "customer service",
                "areaServed": "KE",
                "availableLanguage": "English"
              }
            })
          }}
        />
        
        {/* Hreflang Tags for International SEO */}
        <link rel="alternate" href={`${SITE_URL}/shop`} hrefLang="en-ke" />
        <link rel="alternate" href={`${SITE_URL}/shop`} hrefLang="x-default" />
        
        {/* Pagination Links for SEO */}
        {currentPage > 1 && (
          <link rel="prev" href={`${SITE_URL}/shop${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`} />
        )}
        {currentPage < totalPages && (
          <link rel="next" href={`${SITE_URL}/shop?page=${currentPage + 1}`} />
        )}
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        
        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Quick View Modal */}
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-700 pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="white" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pt-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {searchTerm ? `Search: ${searchTerm}` : 'Premium Products'}
              </h1>
              <p className="text-xl text-green-50 mb-8">
                {searchTerm 
                  ? `Browse our selection of ${searchTerm} products`
                  : 'Discover our curated collection of high-quality hygiene and waste management solutions'
                }
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-6 py-4 pl-14 pr-12 text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Search products"
                  />
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setCurrentPage(1);
                      }}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center"
                      aria-label="Clear search"
                    >
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label htmlFor="sort-by" className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                aria-label="Sort products by"
              >
                <option value="created_at">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {totalProducts} product{totalProducts !== 1 ? 's' : ''}
                {searchTerm && ` found for "${searchTerm}"`}
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="bg-gray-200 h-64 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeProducts.length === 0 ? (
            // Empty State with SEO-friendly content
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `We couldn't find any products matching "${searchTerm}". Try different keywords or browse our categories.`
                  : 'No products available in this category at the moment. Please check back later.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  aria-label="Clear search and browse all products"
                >
                  Browse All Products
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activeProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    itemScope
                    itemType="https://schema.org/Product"
                  >
                    <Link href={`/shop/${product.slug}`} className="block">
                      <div className="relative aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={getProductImage(product)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.png';
                          }}
                          itemProp="image"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.is_featured && (
                            <span className="bg-yellow-400 text-white px-2 py-1 text-xs rounded-full font-bold shadow-lg">
                              Featured
                            </span>
                          )}
                          {product.compare_price && (
                            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full font-bold shadow-lg">
                              -{Math.round((1 - parseFloat(product.price) / parseFloat(product.compare_price)) * 100)}%
                            </span>
                          )}
                        </div>

                        {/* Quick View Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setQuickViewProduct(product);
                          }}
                          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                          aria-label={`Quick view ${product.name}`}
                        >
                          <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                            Quick View
                          </span>
                        </button>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => handleWishlistToggle(product, e)}
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <svg
                            className={`w-5 h-5 ${
                              isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>

                        {/* Stock Status */}
                        <div className="absolute bottom-3 left-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium shadow-lg ${
                            getStockStatus(product) === 'in_stock'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-500 text-white'
                          }`}>
                            {getStockStatus(product) === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        {/* Category */}
                        {product.category && (
                          <span className="text-xs font-medium text-green-600 uppercase tracking-wider">
                            {product.category.name}
                          </span>
                        )}

                        {/* Product Name */}
                        <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-2 h-12" itemProp="name">
                          {product.name}
                        </h3>

                        {/* Hidden description for SEO */}
                        <meta itemProp="description" content={product.short_description || product.description} />
                        <meta itemProp="sku" content={product.sku} />
                        {product.brand && <meta itemProp="brand" content={product.brand} />}

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          <span className="text-xl font-bold text-gray-900" itemProp="price" content={product.price}>
                            KES {formatPrice(product.price)}
                          </span>
                          <meta itemProp="priceCurrency" content="KES" />
                          <meta itemProp="availability" content={getStockStatus(product) === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'} />
                          {product.compare_price && (
                            <span className="text-sm text-gray-400 line-through">
                              KES {formatPrice(product.compare_price)}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => handleAddToCart(product.id, e)}
                          disabled={getStockStatus(product) !== 'in_stock'}
                          className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                            getStockStatus(product) === 'in_stock'
                              ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          {getStockStatus(product) === 'in_stock' ? (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Add to Cart
                            </>
                          ) : (
                            'Out of Stock'
                          )}
                        </button>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex justify-center items-center space-x-2 mt-12" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <span className="px-4 py-2 text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </div>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}