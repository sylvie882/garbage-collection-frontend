'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';

interface Product {
  id: number; name: string; slug: string; description: string; short_description: string;
  price: string; compare_price: string | null; sku: string; quantity: number;
  track_quantity: boolean; is_active: boolean; is_featured: boolean; images: string[] | null;
  youtube_url: string | null; created_at: string; updated_at: string;
  image_urls: string[]; discount_percentage: number;
  category: { id: number; name: string; slug: string } | null;
}
interface ApiResponse<T> { current_page: number; data: T[]; last_page: number; total: number; }

const getProductImage = (p: Product) => {
  if (p.image_urls?.length > 0 && p.image_urls[0].startsWith('http')) return p.image_urls[0];
  if (p.images?.length > 0) return p.images[0].startsWith('http') ? p.images[0] : `https://api.sylviegarbagecollection.co.ke/storage/${p.images[0]}`;
  return '/placeholder-product.jpg';
};
const formatPrice = (price: string | null) => {
  if (!price) return '0';
  const n = parseFloat(price);
  return isNaN(n) ? '0' : n.toLocaleString();
};

function Toast({ message, type, onClose }: { message: string; type: 'success'|'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 ${type === 'success' ? 'bg-green-700 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? '✓' : '✕'} {message}
    </div>
  );
}

export default function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [toast, setToast] = useState<{ message: string; type: 'success'|'error' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient || !searchParams) return;
    const q = searchParams.get('q'); const sort = searchParams.get('sort'); const page = searchParams.get('page');
    if (q) setSearchTerm(q); if (sort) setSortBy(sort); if (page) setCurrentPage(parseInt(page));
  }, [searchParams, isClient]);

  useEffect(() => {
    if (!isClient) return;
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (sortBy !== 'created_at') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());
    window.history.replaceState({}, '', params.toString() ? `/shop?${params}` : '/shop');
  }, [searchTerm, sortBy, currentPage, isClient]);

  useEffect(() => { if (isClient) fetchProducts(); }, [searchTerm, sortBy, currentPage, isClient]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (sortBy) params.append('sort', sortBy);
      params.append('page', currentPage.toString());
      params.append('per_page', '24');
      const res = await fetch(`https://api.sylviegarbagecollection.co.ke/api/products?${params}`);
      if (res.ok) {
        const data: ApiResponse<Product> = await res.json();
        setProducts((data.data || []).filter(p => p.is_active));
        setTotalPages(data.last_page || 1);
        setTotalProducts(data.total || 0);
      } else { setProducts([]); }
    } catch { setProducts([]); }
    finally { setLoading(false); }
  };

  const handleAddToCart = async (productId: number, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    try { await addToCart(productId, 1); setToast({ message: 'Added to cart', type: 'success' }); }
    catch { setToast({ message: 'Failed to add to cart', type: 'error' }); }
  };

  const handleWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (isInWishlist(product.id)) { removeFromWishlist(product.id); setToast({ message: 'Removed from wishlist', type: 'success' }); }
    else { addToWishlist({ ...product, images: product.images || [], specifications: null, features: null }); setToast({ message: 'Added to wishlist', type: 'success' }); }
  };

  const inStock = (p: Product) => !p.track_quantity || p.quantity > 0;

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />
      {isClient && toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Hero */}
      <section className="bg-green-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-3">Premium Products</p>
          <h1 className="text-4xl font-bold text-white mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
            {searchTerm ? `Results for "${searchTerm}"` : 'Hygiene & Waste Management Products'}
          </h1>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <input type="text" placeholder="Search products..." value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-5 pr-12 py-3.5 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg" />
            {searchTerm && (
              <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">{totalProducts}</span> product{totalProducts !== 1 ? 's' : ''}
            {searchTerm && <span className="ml-1">for "{searchTerm}"</span>}
          </p>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium">Sort:</label>
            <select value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-slate-700">
              <option value="created_at">Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="bg-slate-200 aspect-square" />
                <div className="p-4 space-y-3"><div className="h-3 bg-slate-200 rounded w-3/4" /><div className="h-5 bg-slate-200 rounded w-1/2" /><div className="h-9 bg-slate-200 rounded" /></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg mb-4">{searchTerm ? `No products found for "${searchTerm}"` : 'No products available at the moment.'}</p>
            {searchTerm && <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} className="bg-green-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors">Browse All Products</button>}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map(product => (
                <article key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <Link href={`/shop/${product.slug}`} className="block">
                    <div className="relative aspect-square bg-slate-100 overflow-hidden">
                      <img src={getProductImage(product)} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.currentTarget as HTMLImageElement).src = '/placeholder-product.jpg'; }} />
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.is_featured && <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full font-bold">Featured</span>}
                        {product.compare_price && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">-{Math.round((1 - parseFloat(product.price)/parseFloat(product.compare_price!))*100)}%</span>}
                      </div>
                      {/* Wishlist */}
                      <button onClick={e => handleWishlist(product, e)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors">
                        <svg className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      {/* Stock */}
                      <div className="absolute bottom-2 left-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${inStock(product) ? 'bg-green-600 text-white' : 'bg-slate-500 text-white'}`}>
                          {inStock(product) ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      {product.category && <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">{product.category.name}</p>}
                      <h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-slate-900">KES {formatPrice(product.price)}</span>
                        {product.compare_price && <span className="text-xs text-slate-400 line-through">KES {formatPrice(product.compare_price)}</span>}
                      </div>
                      <button onClick={e => handleAddToCart(product.id, e)} disabled={!inStock(product)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${inStock(product) ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                        {inStock(product) ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button onClick={() => setCurrentPage(p => Math.max(p-1,1))} disabled={currentPage===1}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-green-400 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  Previous
                </button>
                <span className="text-sm text-slate-500">Page <span className="font-bold text-slate-900">{currentPage}</span> of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(p+1,totalPages))} disabled={currentPage===totalPages}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-green-400 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
