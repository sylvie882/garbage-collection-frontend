"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteForm from '../../components/QuoteForm';
import FloatingButtons from '../../components/FloatingButtons';
import { useState } from 'react';

interface QuoteFormData {
  name: string; email: string; phone: string;
  company?: string; service_type: string; message: string;
}

export default function QuotePage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuoteRequest = async (formData: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
      const result = await response.json();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 8000);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      {/* Hero */}
      <section className="bg-green-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-3">No Obligation</p>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Get Your Free Quote</h1>
          <p className="text-green-200">Fill in the form and we'll respond within 24 hours with a tailored solution.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 flex gap-4">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            </div>
            <div>
              <p className="font-bold text-green-900">Quote request received!</p>
              <p className="text-green-700 text-sm mt-1">Our team will contact you within 24 hours with a customised solution and pricing.</p>
            </div>
          </div>
        )}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuoteForm onSubmit={submitQuoteRequest} isSubmitting={isSubmitting} />
          </div>
          <div className="space-y-5">
            <div className="bg-green-800 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Why Get a Quote?</h3>
              <div className="space-y-3">
                {['Free, no-obligation assessment','Tailored pricing for your needs','Response within 24 hours','Flexible service plans available'].map(item => (
                  <div key={item} className="flex gap-2 text-sm text-green-100">
                    <span className="text-green-400 mt-0.5">✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-3 text-sm">Prefer to call?</h4>
              <a href="tel:+254711515752" className="block text-green-700 font-bold text-lg hover:text-green-800 transition-colors">+254 711 515 752</a>
              <p className="text-slate-400 text-xs mt-1">24/7 — all days</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-3 text-sm">Coverage Areas</h4>
              <div className="space-y-1.5">
                {['Nairobi County (500+ locations)','Nakuru County (30+ locations)','Narok County','Laikipia County'].map(area => (
                  <div key={area} className="text-sm text-slate-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />{area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
