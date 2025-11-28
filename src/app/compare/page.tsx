'use client';

import { useCompare } from '@/contexts/CompareContext';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      alert('Product added to cart!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add product to cart');
    }
  };

  const getProductImage = (product: any) => {
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

  const formatPrice = (price: string | null): string => {
    if (!price) return '0';
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? '0' : numericPrice.toLocaleString();
  };

  const getFeaturesArray = (product: any): string[] => {
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

  const getSpecifications = (product: any): string[] => {
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

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Compare Products</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Add products to compare their features, specifications, and prices side by side.
            </p>
            <Link
              href="/shop"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
            >
              Browse Products
            </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compare Products</h1>
              <p className="text-gray-600 mt-2">Compare {compareItems.length} product{compareItems.length === 1 ? '' : 's'}</p>
            </div>
            <button
              onClick={clearCompare}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-900 bg-gray-50">Product</th>
                    {compareItems.map((product) => (
                      <th key={product.id} className="text-center p-4 font-semibold text-gray-900 bg-gray-50 min-w-64">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="float-right text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Images */}
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">Image</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <img
                          src={getProductImage(product)}
                          alt={product.name}
                          className="w-32 h-32 object-cover mx-auto rounded-lg"
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Names */}
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">Product Name</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <Link href={`/shop/${product.slug}`} className="font-semibold text-gray-900 hover:text-green-600 transition-colors">
                          {product.name}
                        </Link>
                      </td>
                    ))}
                  </tr>

                  {/* Prices */}
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">Price</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-green-600">
                            KES {formatPrice(product.price)}
                          </div>
                          {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                            <div className="text-sm text-gray-500 line-through">
                              KES {formatPrice(product.compare_price)}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Brand */}
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">Brand</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.brand || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* Category */}
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">Category</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.category?.name || 'Uncategorized'}
                      </td>
                    ))}
                  </tr>

                  {/* Features */}
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">Key Features</td>
                    {compareItems.map((product) => {
                      const features = getFeaturesArray(product);
                      return (
                        <td key={product.id} className="p-4">
                          <ul className="space-y-2 text-sm">
                            {features.slice(0, 5).map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Specifications */}
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">Specifications</td>
                    {compareItems.map((product) => {
                      const specifications = getSpecifications(product);
                      return (
                        <td key={product.id} className="p-4">
                          <ul className="space-y-2 text-sm">
                            {specifications.slice(0, 5).map((spec, index) => (
                              <li key={index}>{spec}</li>
                            ))}
                          </ul>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">Actions</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="space-y-2">
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                          >
                            Add to Cart
                          </button>
                          <Link
                            href={`/shop/${product.slug}`}
                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm inline-block"
                          >
                            View Details
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparison Tips */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Comparison Tips</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Compare prices, features, and specifications side by side</li>
              <li>• Look for products that meet your specific requirements</li>
              <li>• Consider value for money and long-term benefits</li>
              <li>• You can compare up to 4 products at once</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}