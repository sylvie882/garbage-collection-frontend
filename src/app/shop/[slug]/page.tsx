'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCompare } from '@/contexts/CompareContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  images: string[];
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

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  compare_price: string | null;
  images: string[];
  image_urls: string[];
  category: { name: string } | null;
  is_featured: boolean;
  is_active: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'specifications' | 'gallery'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const API_BASE_URL = 'https://api.sylviegarbagecollection.co.ke/api';

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/products/${slug}`);
      
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
        setRelatedProducts(data.related_products || []);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Failed to load product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.id, quantity);
      alert(`✅ ${product.name} added to cart!`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add product to cart');
    }
  };

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compare_price: product.compare_price,
        images: product.images,
        image_urls: product.image_urls,
        category: product.category,
        brand: product.brand,
        is_active: product.is_active
      });
    }
  };

  const toggleCompare = () => {
    if (!product) return;
    
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compare_price: product.compare_price,
        images: product.images,
        image_urls: product.image_urls,
        category: product.category,
        brand: product.brand,
        description: product.description,
        short_description: product.short_description,
        specifications: product.specifications,
        features: product.features,
        is_active: product.is_active
      });
    }
  };

  const getProductImage = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    return `https://api.sylviegarbagecollection.co.ke/storage/${imagePath}`;
  };

  const getMainImageUrl = () => {
    if (!product) return '/placeholder-product.jpg';
    
    if (product.image_urls && product.image_urls.length > 0) {
      return product.image_urls[0];
    }
    
    if (product.images && product.images.length > 0) {
      return getProductImage(product.images[0]);
    }
    
    return '/placeholder-product.jpg';
  };

  const getAllImages = () => {
    if (!product) return [];
    
    const images: string[] = [];
    
    // Add image_urls first
    if (product.image_urls) {
      images.push(...product.image_urls);
    }
    
    // Add images from storage
    if (product.images) {
      product.images.forEach(img => {
        images.push(getProductImage(img));
      });
    }
    
    return images.length > 0 ? images : ['/placeholder-product.jpg'];
  };

  const getFeaturesArray = (): string[] => {
    if (!product) return [];
    
    if (Array.isArray(product.features)) {
      return product.features;
    }
    if (typeof product.features === 'string') {
      try {
        const parsed = JSON.parse(product.features);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [product.features];
      }
    }
    return [];
  };

  const getSpecificationsArray = (): string[] => {
    if (!product) return [];
    
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

  const formatPrice = (price: string | null): string => {
    if (!price) return '0';
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? '0' : numericPrice.toLocaleString();
  };

  const getStockStatus = () => {
    if (!product) return 'out_of_stock';
    
    if (!product.track_quantity) return 'in_stock';
    return product.quantity > 0 ? 'in_stock' : 'out_of_stock';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="bg-gray-200 h-96 rounded-lg"></div>
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-gray-200 h-20 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-200 h-8 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                  <div className="bg-gray-200 h-12 rounded w-1/4"></div>
                  <div className="bg-gray-200 h-24 rounded"></div>
                  <div className="bg-gray-200 h-12 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {error || 'The product you are looking for does not exist or is no longer available.'}
            </p>
            <Link
              href="/shop"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
            >
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = getAllImages();
  const features = getFeaturesArray();
  const specifications = getSpecificationsArray();
  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Product Hero Section */}
      <div className="bg-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-product.jpg';
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`bg-gray-100 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-green-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {product.category && (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {product.category.name}
                    </span>
                  )}
                  {product.is_featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-lg border ${
                      isInWishlist(product.id)
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <svg className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={toggleCompare}
                    className={`p-2 rounded-lg border ${
                      isInCompare(product.id)
                        ? 'bg-blue-50 border-blue-200 text-blue-600'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title={isInCompare(product.id) ? 'Remove from Compare' : 'Add to Compare'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

              {/* SKU & Brand */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                {product.sku && (
                  <div>
                    <span className="font-semibold">SKU:</span> {product.sku}
                  </div>
                )}
                {product.brand && (
                  <div>
                    <span className="font-semibold">Brand:</span> {product.brand}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">
                  KES {formatPrice(product.price)}
                </span>
                {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                  <span className="text-xl text-gray-500 line-through">
                    KES {formatPrice(product.compare_price)}
                  </span>
                )}
                {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    Save {Math.round((1 - parseFloat(product.price) / parseFloat(product.compare_price)) * 100)}%
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                stockStatus === 'in_stock' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {stockStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                {product.track_quantity && stockStatus === 'in_stock' && (
                  <span className="ml-1">({product.quantity} available)</span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-10 text-center border-0 focus:ring-0 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={stockStatus !== 'in_stock'}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      stockStatus === 'in_stock'
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Cart
                  </button>
                  
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'features', label: 'Features' },
                { key: 'specifications', label: 'Specifications' },
                { key: 'gallery', label: 'Gallery' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="prose prose-lg max-w-none">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description || product.short_description || 'No description available.' }}
                />
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                {features.length > 0 ? (
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No features listed for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h3>
                {specifications.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specifications.map((spec, index) => {
                        const [key, value] = spec.split(':').map(s => s.trim());
                        return (
                          <div key={index} className="flex flex-col">
                            <dt className="text-sm font-medium text-gray-500">{key}</dt>
                            <dd className="text-sm text-gray-900">{value || 'N/A'}</dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                ) : (
                  <p className="text-gray-600">No specifications available for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Gallery</h3>
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => setSelectedImageIndex(index)}
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.jpg';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No gallery images available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <Link href={`/shop/${relatedProduct.slug}`}>
                    <div className="aspect-w-16 aspect-h-12 bg-gray-100 overflow-hidden">
                      <img
                        src={relatedProduct.image_urls?.[0] || '/placeholder-product.jpg'}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link href={`/shop/${relatedProduct.slug}`} className="hover:text-green-600 transition-colors">
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="text-green-600 font-bold text-lg">
                      KES {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}