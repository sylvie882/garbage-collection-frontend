'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

interface CartProduct { id: number; name: string; price: number; image_urls: string[]; slug?: string; sku?: string; images?: string[]; }
interface CartItem { id: number; product: CartProduct; quantity: number; price: number; }
interface ContactFormData { name: string; email: string; phone: string; message: string; product_id: number; }

const getProductImage = (p: CartProduct) => {
  if (p.image_urls?.length > 0 && p.image_urls[0].startsWith('http')) return p.image_urls[0];
  if (p.images && p.images.length > 0) return p.images[0].startsWith('http') ? p.images[0] : `https://api.sylviegarbagecollection.co.ke/storage/${p.images[0]}`;
  return '/placeholder-product.jpg';
};
const formatPrice = (price: number) => price.toLocaleString();

function ContactModal({ isOpen, onClose, product, onSubmit, isLoading }: {
  isOpen: boolean; onClose: () => void; product: CartProduct | null;
  onSubmit: (d: ContactFormData) => Promise<void>; isLoading: boolean;
}) {
  const [formData, setFormData] = useState<ContactFormData>(() => ({
    name: '',
    email: '',
    phone: '',
    message: product ? `Hi, I'm interested in "${product.name}". Please provide more information.` : '',
    product_id: product?.id || 0
  }));
  useEffect(() => {
    if (product && isOpen) {
      // Defer updating state to the next tick to avoid synchronous setState inside the effect
      const id = setTimeout(() => {
        setFormData(p => ({
          ...p,
          product_id: product.id,
          message: `Hi, I'm interested in "${product.name}". Please provide more information.`
        }));
      }, 0);
      return () => clearTimeout(id);
    }
  }, [product, isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-7 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Contact Seller</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        {product && (
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 mb-5">
            <img src={getProductImage(product)} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
            <div><p className="font-semibold text-slate-900 text-sm">{product.name}</p><p className="text-green-700 font-bold text-sm">KES {formatPrice(product.price)}</p></div>
          </div>
        )}
        <form onSubmit={async e => { e.preventDefault(); await onSubmit(formData); }} className="space-y-4">
          {(['name','email','phone'] as const).map(field => (
            <input key={field} type={field==='email'?'email':field==='phone'?'tel':'text'} required placeholder={field==='name'?'Full name':field==='email'?'Email address':'Phone (+254...)'}
              value={formData[field]} onChange={e => setFormData(p => ({...p, [field]: e.target.value}))}
              className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          ))}
          <textarea rows={3} required placeholder="Message..." value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))}
            className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-green-700 hover:bg-green-800 disabled:bg-slate-300 text-white rounded-xl text-sm font-bold transition-colors">
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart() as any;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [contactModal, setContactModal] = useState<{ open: boolean; product: CartProduct|null }>({ open: false, product: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string|null>(null);

  useEffect(() => {
    if (cart) setCartItems(Array.isArray(cart) ? cart : cart.items || []);
  }, [cart]);

  const total = cartItems.reduce((sum, item) => sum + (item.price || item.product?.price || 0) * item.quantity, 0);

  const handleContactSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('https://api.sylviegarbagecollection.co.ke/api/product-inquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data),
      });
      if (res.ok) { setContactModal({ open: false, product: null }); setToast('Message sent successfully!'); setTimeout(() => setToast(null), 3000); }
    } catch { } finally { setIsSubmitting(false); }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Your Cart is Empty</h1>
          <p className="text-slate-500 mb-8">Browse our products and add items to your cart.</p>
          <Link href="/shop" className="bg-green-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-colors inline-block">Browse Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />
      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-700 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-semibold">{toast}</div>}
      <ContactModal isOpen={contactModal.open} onClose={() => setContactModal({ open: false, product: null })} product={contactModal.product} onSubmit={handleContactSubmit} isLoading={isSubmitting} />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Your Cart</h1>
            <p className="text-slate-500 text-sm mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">Clear cart</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex gap-4">
                <Link href={`/shop/${item.product?.slug || '#'}`} className="flex-shrink-0">
                  <img src={getProductImage(item.product)} alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-xl border border-slate-100" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/shop/${item.product?.slug || '#'}`}>
                      <h3 className="font-semibold text-slate-900 text-sm hover:text-green-700 transition-colors line-clamp-2">{item.product?.name}</h3>
                    </Link>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <p className="font-bold text-slate-900 mt-1 text-sm">KES {formatPrice((item.price || item.product?.price || 0) * item.quantity)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors text-lg font-bold">−</button>
                      <span className="w-8 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors text-lg font-bold">+</button>
                    </div>
                    <button onClick={() => setContactModal({ open: true, product: item.product })}
                      className="text-xs text-green-700 hover:text-green-800 font-semibold border border-green-200 hover:border-green-400 px-3 py-1.5 rounded-lg transition-all">
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <h2 className="font-bold text-slate-900 mb-5" style={{ fontFamily: "'Fraunces', serif" }}>Order Summary</h2>
              <div className="space-y-3 mb-5">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600 truncate max-w-[180px]">{item.product?.name} <span className="text-slate-400">×{item.quantity}</span></span>
                    <span className="font-semibold text-slate-900 flex-shrink-0">KES {formatPrice((item.price || item.product?.price || 0) * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-4 mb-6">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span>KES {formatPrice(total)}</span>
                </div>
              </div>
              <a href={`https://wa.me/254711515752?text=${encodeURIComponent(`Hello! I'd like to place an order.\n\n${cartItems.map(i => `• ${i.product?.name} ×${i.quantity}`).join('\n')}\n\nTotal: KES ${formatPrice(total)}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="block w-full bg-green-700 hover:bg-green-800 text-white text-center font-bold py-3.5 rounded-xl transition-colors text-sm">
                Order via WhatsApp
              </a>
              <Link href="/shop" className="block w-full border border-slate-200 hover:border-slate-300 text-slate-700 text-center font-semibold py-3 rounded-xl transition-colors text-sm mt-3">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
