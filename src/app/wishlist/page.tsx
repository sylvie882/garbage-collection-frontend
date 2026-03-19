'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [toast, setToast] = useState<string|null>(null);

  const getProductImage = (product: any) => {
    if (product.image_urls?.length > 0 && product.image_urls[0].startsWith('http')) return product.image_urls[0];
    if (product.images?.length > 0) return product.images[0].startsWith('http') ? product.images[0] : `https://api.sylviegarbagecollection.co.ke/storage/${product.images[0]}`;
    return '/placeholder-product.jpg';
  };
  const formatPrice = (price: string | null) => { if (!price) return '0'; const n = parseFloat(price); return isNaN(n) ? '0' : n.toLocaleString(); };

  const handleAddToCart = async (productId: number) => {
    try { await addToCart(productId, 1); setToast('Added to cart'); setTimeout(() => setToast(null), 3000); }
    catch { setToast('Failed to add to cart'); setTimeout(() => setToast(null), 3000); }
  };

  if (wishlist.length === 0) return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Your Wishlist is Empty</h1>
        <p className="text-slate-500 mb-8">Save products you love for easy access later.</p>
        <Link href="/shop" className="bg-green-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-colors inline-block">Browse Products</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />
      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-700 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-semibold">{toast}</div>}

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>My Wishlist</h1>
            <p className="text-slate-500 text-sm mt-1">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={clearWishlist} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">Clear all</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="relative">
                <Link href={`/shop/${product.slug}`}>
                  <div className="aspect-square bg-slate-100 overflow-hidden">
                    <img src={getProductImage(product)} alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
                <button onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-slate-400 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-4">
                {product.category?.name && <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">{product.category.name}</p>}
                <Link href={`/shop/${product.slug}`}><h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2 hover:text-green-700 transition-colors">{product.name}</h3></Link>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-slate-900 text-sm">KES {formatPrice(product.price)}</span>
                  {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                    <span className="text-xs text-slate-400 line-through">KES {formatPrice(product.compare_price)}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAddToCart(product.id)} className="flex-1 bg-green-700 hover:bg-green-800 text-white text-xs font-bold py-2 rounded-lg transition-colors">Add to Cart</button>
                  <Link href={`/shop/${product.slug}`} className="flex-1 border border-slate-200 hover:border-green-300 text-slate-700 text-xs font-semibold py-2 rounded-lg transition-all text-center">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
