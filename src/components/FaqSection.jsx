'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://api.sylviegarbagecollection.co.ke';

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchFaqs(); }, []);

  const fetchFaqs = async () => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/api/faqs`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      setError('Failed to load FAQs.');
    } finally {
      setLoading(false);
    }
  };

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  if (loading) return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="h-4 bg-slate-200 rounded w-24 mx-auto mb-4 animate-pulse" />
          <div className="h-8 bg-slate-200 rounded w-64 mx-auto animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1,2,3,4].map(i => <div key={i} className="h-16 bg-white rounded-xl border border-slate-200 animate-pulse" />)}
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-slate-500 mb-4">{error}</p>
        <button onClick={fetchFaqs} className="bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors">Try Again</button>
      </div>
    </section>
  );

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          {/* Left */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Common Questions</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-8" style={{ fontFamily: "'Fraunces', serif" }}>Frequently Asked Questions</h2>

            {faqs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500 mb-4">No FAQs available at the moment.</p>
                <button onClick={fetchFaqs} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors">Refresh</button>
              </div>
            ) : (
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={faq.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <button onClick={() => toggle(i)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <span className="font-semibold text-slate-900 text-sm">{faq.question}</span>
                      <svg className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${activeIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${activeIndex === i ? 'max-h-64' : 'max-h-0'}`}>
                      <p className="px-5 pb-4 text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-green-800 rounded-2xl p-7 text-white">
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Still have questions?</h3>
              <p className="text-green-200 text-sm mb-5">Our team is happy to help with any enquiries.</p>
              <div className="space-y-3">
                <a href="tel:+254711515752" className="flex items-center gap-3 text-sm text-green-100 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  +254 711 515 752
                </a>
                <a href="mailto:sylviegarbagecollection@gmail.com" className="flex items-center gap-3 text-sm text-green-100 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  sylviegarbagecollection@gmail.com
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 text-sm mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Quick Actions</h4>
              <div className="space-y-2">
                <a href="/quote" className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors">Get Free Quote</a>
                <a href="/contact" className="block w-full text-center border border-slate-200 hover:border-green-400 text-slate-700 hover:text-green-700 font-semibold text-sm py-3 rounded-xl transition-all">Send Message</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
