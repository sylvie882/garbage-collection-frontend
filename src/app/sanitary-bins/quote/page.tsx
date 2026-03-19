import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SanitaryBinQuoteForm from '@/components/SanitaryBinQuoteForm';

export const metadata: Metadata = {
  title: 'Get a Free Sanitary Bin Quote | Sylvie Waste Management Kenya',
  description: 'Request a free site survey and quote for sanitary bin services across Kenya. Pedal and automatic bins, all 47 counties. We respond within 24 hours.',
  robots: { index: true, follow: true },
};

export default function SanitaryBinQuotePage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      <section className="bg-green-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <nav className="flex justify-center mb-5">
            <ol className="flex items-center gap-2 text-xs text-green-300">
              <li><Link href="/" className="hover:text-white">Home</Link></li><li>/</li>
              <li><Link href="/sanitary-bins" className="hover:text-white">Sanitary Bins</Link></li><li>/</li>
              <li className="text-green-100 font-semibold">Get a Quote</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Request a Free Site Survey &amp; Quote</h1>
          <p className="text-green-200 max-w-2xl mx-auto">We respond within 24 hours with accurate pricing for your specific site anywhere in Kenya.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-96 bg-white rounded-2xl border border-slate-200 animate-pulse" />}>
              <SanitaryBinQuoteForm />
            </Suspense>
          </div>
          <div className="space-y-5">
            <div className="bg-green-800 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Fraunces', serif" }}>What Happens Next</h3>
              <ol className="space-y-3 text-sm text-green-200">
                {['We receive your request within minutes','Our team reviews your requirements','We respond within 24 hours','Free site survey arranged if needed','Quote provided — no obligation'].map((s,i) => (
                  <li key={i} className="flex gap-3"><span className="w-5 h-5 bg-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>{s}</li>
                ))}
              </ol>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-3 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>Prefer to call?</h4>
              <a href="tel:+254711515752" className="block text-green-700 font-bold text-xl hover:text-green-800 transition-colors">0711 515 752</a>
              <p className="text-slate-400 text-xs mt-1">Mon–Sat 8am–6pm · Emergency available</p>
              <a href="https://wa.me/254711515752" target="_blank" rel="noopener noreferrer"
                className="mt-3 block w-full bg-green-500 hover:bg-green-600 text-white text-center font-semibold py-2.5 rounded-xl text-sm transition-colors">WhatsApp Us</a>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Coverage</p>
              <p className="text-slate-600 text-sm">We serve all <strong>47 counties in Kenya</strong> including remote locations.</p>
              <Link href="/sanitary-bins#counties" className="text-green-700 text-xs font-semibold hover:underline mt-2 inline-block">View all counties →</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
