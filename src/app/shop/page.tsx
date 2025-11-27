'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_price: number;
  images: string[];
  image_urls: string[];
  category: {
    id: number;
    name: string;
    slug: string;
  };
  brand: string;
  sku: string;
  is_featured: boolean;
  stock_status: string;
  discount_percentage: number;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  products_count: number;
  image_url: string;
}

interface ApiResponse<T> {
  data: T[];
  success: boolean;
  message?: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, searchTerm, priceRange]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const result: ApiResponse<Category> = await response.json();
        setCategories(result.data || []);
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

      const response = await fetch(`/api/products?${params}`);
      
      if (response.ok) {
        const result: ApiResponse<Product> = await response.json();
        setProducts(result.data || []);
      } else {
        console.error('Failed to fetch products');
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
        alert(`✅ ${product.name} added to cart!`);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add product to cart');
    }
  };

  const featuredProducts = products.filter(product => product.is_featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - Solid green background, no blur */}
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
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
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
                  <p className="text-xs text-gray-500">{category.products_count} products</p>
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
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="created_at">Newest First</option>
                    <option value="featured">Featured</option>
                    <option value="price">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {/* Quick Category Links */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-green-100 text-green-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.slug
                            ? 'bg-green-100 text-green-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name} ({category.products_count})
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
                  }}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Special Offers Banner */}
            <div className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-6 text-center">
              <h3 className="font-bold text-lg mb-2">🚀 Special Offer!</h3>
              <p className="text-sm mb-3">Free delivery on orders over KES 5,000</p>
              <div className="text-xs opacity-90">Use code: SYLVIE10</div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory !== 'all' 
                    ? categories.find(c => c.slug === selectedCategory)?.name 
                    : 'All Products'
                  }
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  {searchTerm && ` for "${searchTerm}"`}
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
            ) : products.length === 0 ? (
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
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Browse All Products
                </button>
              </div>
            ) : (
              // Products Grid
              <>
                {/* Featured Products Banner - Solid background */}
                {featuredProducts.length > 0 && selectedCategory === 'all' && (
                  <div className="mb-8 bg-blue-600 text-white rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span>⭐</span> Featured Products
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {featuredProducts.map((product) => (
                        <div key={product.id} className="bg-blue-700 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center">
                              <span className="text-lg">🛒</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm line-clamp-1">{product.name}</h4>
                              <p className="text-blue-100 text-sm">KES {product.price.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                      <div className="relative">
                        <Link href={`/shop/${product.slug}`}>
                          <div className="aspect-w-16 aspect-h-12 bg-gray-100 overflow-hidden">
                            <img
                              src={product.image_urls?.[0] || '/placeholder-product.jpg'}
                              alt={product.name}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.discount_percentage > 0 && (
                            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full font-bold shadow-lg">
                              -{product.discount_percentage}% OFF
                            </span>
                          )}
                          {product.is_featured && (
                            <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full font-bold shadow-lg">
                              ⭐ Featured
                            </span>
                          )}
                        </div>

                        {/* Quick Actions - Solid background */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        {/* Category */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                            {product.category.name}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            product.stock_status === 'in_stock' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>

                        {/* Product Name */}
                        <Link href={`/shop/${product.slug}`}>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors h-12">
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                          {product.short_description || product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-green-600">
                              KES {product.price.toLocaleString()}
                            </span>
                            {product.compare_price && product.compare_price > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                KES {product.compare_price.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {product.brand && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {product.brand}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          disabled={product.stock_status !== 'in_stock'}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                            product.stock_status === 'in_stock'
                              ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {product.stock_status === 'in_stock' ? (
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
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        .slider {
          background: linear-gradient(to right, #10b981 0%, #10b981 ${(priceRange[1] / 10000) * 100}%, #e5e7eb ${(priceRange[1] / 10000) * 100}%, #e5e7eb 100%);
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}