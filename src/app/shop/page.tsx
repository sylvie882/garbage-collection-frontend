import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShopContent from './shop-content';

// Loading skeleton component
function ShopLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 pt-24 pb-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto pt-8">
            <div className="h-12 bg-green-500 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-green-500 rounded-lg w-96 mx-auto mb-8 animate-pulse"></div>
            
            {/* Search Bar Skeleton */}
            <div className="max-w-2xl mx-auto">
              <div className="h-16 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar Skeleton */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="h-10 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-64 w-full"></div>
              <div className="p-4 space-y-3">
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                <div className="bg-gray-200 h-10 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoadingSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}