'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

interface CartProduct {
  id: number;
  name: string;
  price: number;
  image_urls: string[];
  slug?: string; // Make slug optional
  sku?: string;
  images?: string[];
}

interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  price: number;
}

export default function CartPage() {
  const { cart, updateCart, removeFromCart, clearCart, loading } = useCart();
  const [updating, setUpdating] = useState<number | null>(null);
  const [removing, setRemoving] = useState<number | null>(null);

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdating(itemId);
    try {
      await updateCart([{ id: itemId, quantity: newQuantity }]);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    setRemoving(itemId);
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item from cart');
    } finally {
      setRemoving(null);
    }
  };

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
        alert('Failed to clear cart');
      }
    }
  };

  const getProductImage = (item: CartItem) => {
    const product = item.product;
    if (product.image_urls && product.image_urls.length > 0) {
      return product.image_urls[0];
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

  const getProductLink = (product: CartProduct) => {
    // Use slug if available, otherwise fall back to ID
    return product.slug ? `/shop/${product.slug}` : `/shop/product/${product.id}`;
  };

  const formatPrice = (price: number | string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numericPrice) ? '0' : numericPrice.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex space-x-4">
                        <div className="w-24 h-24 bg-gray-200 rounded"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-64">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start shopping to find amazing products!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                Start Shopping
              </Link>
              <Link
                href="/services"
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-2">
                {cart.total_items} {cart.total_items === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {(cart.items as CartItem[]).map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center">
                        {/* Product Info */}
                        <div className="col-span-5 flex items-center space-x-4 mb-4 md:mb-0">
                          <Link href={getProductLink(item.product)} className="flex-shrink-0">
                            <img
                              src={getProductImage(item)}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-product.jpg';
                              }}
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link 
                              href={getProductLink(item.product)}
                              className="font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-gray-500 text-sm mt-1">
                              SKU: {item.product.sku || 'N/A'}
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 flex justify-between md:block mb-2 md:mb-0">
                          <span className="md:hidden font-semibold">Price:</span>
                          <div className="text-center">
                            <span className="text-lg font-semibold text-green-600">
                              KES {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-3 flex justify-between items-center md:block mb-4 md:mb-0">
                          <span className="md:hidden font-semibold">Quantity:</span>
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || updating === item.id}
                              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="w-12 text-center font-semibold">
                              {updating === item.id ? (
                                <div className="animate-spin w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={updating === item.id}
                              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 flex justify-between items-center md:block">
                          <span className="md:hidden font-semibold">Total:</span>
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">
                              KES {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={removing === item.id}
                              className="text-red-600 hover:text-red-700 p-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              title="Remove item"
                            >
                              {removing === item.id ? (
                                <div className="animate-spin w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full"></div>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">KES {formatPrice(cart.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">KES 500</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (14%)</span>
                    <span className="font-semibold">KES {formatPrice(cart.subtotal * 0.14)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">
                        KES {formatPrice(cart.subtotal + 500 + (cart.subtotal * 0.14))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center block mb-4"
                >
                  Proceed to Checkout
                </Link>

                {/* Security Badges */}
                <div className="text-center space-y-2">
                  <div className="flex justify-center space-x-4 text-gray-500">
                    <div className="flex items-center space-x-1 text-xs">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>SSL Encrypted</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center mb-2">We Accept:</p>
                  <div className="flex justify-center space-x-3">
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs font-semibold">M-Pesa</div>
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs font-semibold">Visa</div>
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs font-semibold">Mastercard</div>
                  </div>
                </div>
              </div>

              {/* Support Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">Need Help?</h3>
                    <p className="text-xs text-blue-800">
                      Call us at <a href="tel:+254711515752" className="font-semibold hover:underline">+254 711 515 752</a> or 
                      <a href="mailto:hello@sylviegarbagecollection.co.ke" className="font-semibold hover:underline ml-1">email us</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}