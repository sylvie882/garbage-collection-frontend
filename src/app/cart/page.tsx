'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

interface CartProduct {
  id: number;
  name: string;
  price: number;
  image_urls: string[];
  slug?: string;
  sku?: string;
  images?: string[];
}

interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  price: number;
}

interface SellerInfo {
  whatsapp_number: string;
  email: string;
  business_name: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  product_id: number;
}

function ContactModal({ isOpen, onClose, product, onSubmit, isLoading }: {
  isOpen: boolean;
  onClose: () => void;
  product: CartProduct | null;
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading: boolean;
}) {
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

// Helper functions
const getProductImage = (product: CartProduct) => {
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

const formatPrice = (price: number | string): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return isNaN(numericPrice) ? '0' : numericPrice.toLocaleString();
};

export default function CartPage() {
  const { cart, updateCart, removeFromCart, clearCart, loading } = useCart();
  const [updating, setUpdating] = useState<number | null>(null);
  const [removing, setRemoving] = useState<number | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CartProduct | null>(null);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo | null>(null);

  const API_BASE_URL = 'https://api.sylviegarbagecollection.co.ke/api';

  useEffect(() => {
    fetchSellerInfo();
  }, []);

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

  const handleContactSeller = (product: CartProduct) => {
    setSelectedProduct(product);
    setContactModalOpen(true);
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
        alert('✅ Your inquiry has been sent successfully! We will contact you shortly.');
        setContactModalOpen(false);
        setSelectedProduct(null);
      } else {
        alert(`❌ ${result.message || 'Failed to send inquiry. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('❌ Failed to send inquiry. Please check your connection and try again.');
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const handleContactForAllItems = () => {
    if (!cart) {
      alert('Your cart is empty. Please add some items first.');
      return;
    }

    // Create a message with all cart items
    const itemsList = (cart.items as CartItem[]).map(item => 
      `- ${item.product.name} (Quantity: ${item.quantity}) - KES ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const message = `Hello! I'm interested in purchasing all items from my cart:\n\n${itemsList}\n\nTotal: KES ${formatPrice(cart.subtotal)}\n\nPlease provide more information about pricing and availability.`;
    
    setFormDataForAllItems({
      name: '',
      email: '',
      phone: '',
      message: message,
      product_id: 0
    });
    setContactModalForAllItemsOpen(true);
  };

  // New state for "Contact for All Items" modal
  const [contactModalForAllItemsOpen, setContactModalForAllItemsOpen] = useState(false);
  const [formDataForAllItems, setFormDataForAllItems] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    product_id: 0
  });

  const handleInquirySubmitForAllItems = async (formData: ContactFormData) => {
    setIsSubmittingInquiry(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/product-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: `Inquiry about entire cart:\n\n${formData.message}`
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Your inquiry has been sent successfully! We will contact you shortly.');
        setContactModalForAllItemsOpen(false);
        setFormDataForAllItems({
          name: '',
          email: '',
          phone: '',
          message: '',
          product_id: 0
        });
      } else {
        alert(`❌ ${result.message || 'Failed to send inquiry. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('❌ Failed to send inquiry. Please check your connection and try again.');
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const getProductLink = (product: CartProduct) => {
    return product.slug ? `/shop/${product.slug}` : `/shop/product/${product.id}`;
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
                              src={getProductImage(item.product)}
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
                            
                            {/* Contact Seller Buttons */}
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleContactSeller(item.product)}
                                className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                                title="Send Message"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Seller
                              </button>
                            </div>
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

            {/* Contact Seller Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Seller</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-900 mb-2">Ready to Purchase?</h3>
                    <p className="text-sm text-green-700 mb-3">
                      Contact us directly to complete your order. We'll provide availability, pricing, and delivery information.
                    </p>
                    
                    <div className="space-y-3">
                      <button
                        onClick={handleContactForAllItems}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact About All Items
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Cart Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items ({cart.total_items})</span>
                      <span className="font-semibold">KES {formatPrice(cart.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-green-600">KES {formatPrice(cart.subtotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Our Business</h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p>📍 <strong>Physical Store:</strong> Visit our shop for direct purchases</p>
                    <p>🚚 <strong>Delivery Available:</strong> Within Nairobi and surrounding areas</p>
                    <p>⏰ <strong>Business Hours:</strong> Mon-Sat, 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal for Individual Product */}
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

      {/* Contact Modal for All Items */}
      {contactModalForAllItemsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact About Cart Items</h3>
                <button
                  onClick={() => {
                    setContactModalForAllItemsOpen(false);
                    setFormDataForAllItems({
                      name: '',
                      email: '',
                      phone: '',
                      message: '',
                      product_id: 0
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isSubmittingInquiry}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Cart Summary</h4>
                <p className="text-sm text-gray-600">
                  {cart.total_items} item{cart.total_items !== 1 ? 's' : ''} - Total: KES {formatPrice(cart.subtotal)}
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleInquirySubmitForAllItems(formDataForAllItems);
              }} className="space-y-4">
                <div>
                  <label htmlFor="name-all" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name-all"
                    name="name"
                    required
                    value={formDataForAllItems.name}
                    onChange={(e) => setFormDataForAllItems(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email-all" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email-all"
                    name="email"
                    required
                    value={formDataForAllItems.email}
                    onChange={(e) => setFormDataForAllItems(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone-all" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone-all"
                    name="phone"
                    required
                    value={formDataForAllItems.phone}
                    onChange={(e) => setFormDataForAllItems(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+254 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="message-all" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message-all"
                    name="message"
                    required
                    rows={6}
                    value={formDataForAllItems.message}
                    onChange={(e) => setFormDataForAllItems(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us what you need..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setContactModalForAllItemsOpen(false);
                      setFormDataForAllItems({
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                        product_id: 0
                      });
                    }}
                    disabled={isSubmittingInquiry}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmittingInquiry ? (
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
      )}

      <Footer />
    </div>
  );
}