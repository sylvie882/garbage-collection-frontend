'use client';
import { useCompare } from '@/contexts/CompareContext';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare() as any;
  const formatPrice = (p: string|null) => { if (!p) return '0'; const n = parseFloat(p); return isNaN(n) ? '0' : n.toLocaleString(); };
  const getImg = (p: any) => {
    if (p.image_urls?.length > 0 && p.image_urls[0].startsWith('http')) return p.image_urls[0];
    if (p.images?.length > 0) return p.images[0].startsWith('http') ? p.images[0] : `https://api.sylviegarbagecollection.co.ke/storage/${p.images[0]}`;
    return '/placeholder-product.jpg';
  };

  if (!compareList || compareList.length === 0) return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Fraunces', serif" }}>No Products to Compare</h1>
        <p className="text-slate-500 mb-8">Add products to your compare list to see them side by side.</p>
        <Link href="/shop" className="bg-green-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-colors inline-block">Browse Products</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Compare Products</h1>
            <p className="text-slate-500 text-sm mt-1">{compareList.length} product{compareList.length !== 1 ? 's' : ''} compared</p>
          </div>
          <button onClick={clearCompare} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">Clear all</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {compareList.map((product: any) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="relative aspect-square bg-slate-100">
                <img src={getImg(product)} alt={product.name} className="w-full h-full object-cover" />
                <button onClick={() => removeFromCompare(product.id)} className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-400 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-5">
                {product.category?.name && <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">{product.category.name}</p>}
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>{product.name}</h3>
                <p className="text-slate-500 text-sm mb-3 line-clamp-2">{product.short_description || product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-slate-900">KES {formatPrice(product.price)}</span>
                  {product.compare_price && <span className="text-sm text-slate-400 line-through">KES {formatPrice(product.compare_price)}</span>}
                </div>
                <Link href={`/shop/${product.slug}`} className="block w-full bg-green-700 hover:bg-green-800 text-white text-center font-bold py-3 rounded-xl text-sm transition-colors">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
