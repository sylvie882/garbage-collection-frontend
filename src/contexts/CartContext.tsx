'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image_urls: string[];
  };
  quantity: number;
  price: number;
}

interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  total_items: number;
}

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCart: (items: { id: number; quantity: number }[]) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  // Use your actual API base URL
  const API_BASE_URL = 'https://api.sylviegarbagecollection.co.ke/api';

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`);
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      } else {
        console.error('Failed to fetch cart, status:', response.status);
        setCart(null);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ product_id: productId, quantity }),
        credentials: 'include', // Important for session-based authentication
      });

      console.log('Add to cart response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Add to cart success:', data);
        setCart(data.cart);
      } else {
        // Handle non-JSON responses (like HTML error pages)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          throw new Error(error.error || `Failed to add to cart: ${response.status}`);
        } else {
          const text = await response.text();
          console.error('Non-JSON response:', text.substring(0, 200));
          throw new Error(`Server error: ${response.status}. Please try again.`);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateCart = async (items: { id: number; quantity: number }[]) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ items }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to update cart');
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to remove from cart');
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to clear cart');
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const value = {
    cart,
    cartCount: cart?.total_items || 0,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}