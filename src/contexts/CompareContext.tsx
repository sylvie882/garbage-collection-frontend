'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  compare_price: string | null;
  images: string[];
  image_urls: string[];
  category: { name: string } | null;
  brand: string | null;
  description: string;
  short_description: string;
  specifications: string[] | string | null;
  features: string[] | string | null;
  is_active: boolean;
}

interface CompareContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  isInCompare: (productId: number) => boolean;
  clearCompare: () => void;
  compareCount: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  // Load compare items from localStorage on mount
  useEffect(() => {
    const savedCompare = localStorage.getItem('compare');
    if (savedCompare) {
      try {
        setCompareItems(JSON.parse(savedCompare));
      } catch (error) {
        console.error('Error loading compare from localStorage:', error);
        localStorage.removeItem('compare');
      }
    }
  }, []);

  // Save compare items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product: Product) => {
    setCompareItems(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev; // Already in compare
      }
      if (prev.length >= 4) {
        // Remove the oldest item if we have 4 already
        const newItems = [...prev.slice(1), product];
        return newItems;
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: number) => {
    setCompareItems(prev => prev.filter(p => p.id !== productId));
  };

  const isInCompare = (productId: number) => {
    return compareItems.some(p => p.id === productId);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const value = {
    compareItems,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    compareCount: compareItems.length,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}