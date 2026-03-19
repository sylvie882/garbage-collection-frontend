'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const structuredData = {
  '@context': 'https://schema.org','@type': 'ContactPage',
  'name': 'Contact Sylvie Garbage Collection',
  'mainEntity': { '@type': 'Organization','name': 'Sylvie Garbage Collection','telephone': '+254-711-515752','email': 'sylviegarbagecollection@gmail.com','openingHours': 'Mo-Su 00:00-23:59' },
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: [] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});
    try {
      const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) { setSubmitStatus('success'); setFormData({ name: '', email: '', subject: '', message: '' }); }
      else { if (data.errors) setErrors(data.errors); setSubmitStatus('error'); }
    } catch { setSubmitStatus('error'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="sr-only" aria-hidden="true"><h1>Contact Sylvie Garbage Collection Kenya</h1></div>

      <Header />

      {/* Hero */}
      <section className="bg-green-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-3">Get In Touch</p>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Contact Us</h1>
          <p className="text-green-200">We respond within 2 hours during business hours. Emergency services available 24/7.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-7">
              <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Fraunces', serif" }}>Contact Information</h2>
              <div className="space-y-5">
                {[
                  { label: 'Address', value: 'Dale House, Fox Cl Off Rhapta Rd, Westlands, Nairobi', sub: 'Serving Nairobi, Nakuru, Narok & Laikipia' },
                  { label: 'Phone', value: '+254 711 515 752', sub: '24/7 emergency services', href: 'tel:+254711515752' },
                  { label: 'Email', value: 'sylviegarbagecollection@gmail.com', sub: 'Response within 2 hours', href: 'mailto:sylviegarbagecollection@gmail.com' },
                  { label: 'Hours', value: 'Monday – Sunday', sub: '24/7 operations' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-9 h-9 bg-green-50 border border-green-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-slate-900 hover:text-green-700 transition-colors text-sm">{item.value}</a>
                      ) : (
                        <p className="font-semibold text-slate-900 text-sm">{item.value}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-800 rounded-2xl p-7 text-white">
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Service Coverage</h3>
              <p className="text-green-200 text-sm mb-4">We cover 500+ locations across Kenya.</p>
              <div className="flex flex-wrap gap-2">
                {['Nairobi County','Nakuru County','Narok County','Laikipia County'].map(c => (
                  <span key={c} className="bg-green-700/60 text-green-100 text-xs px-3 py-1.5 rounded-lg border border-green-600">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Send Us a Message</h2>
              <p className="text-slate-500 text-sm mb-7">Fill out the form below and we'll get back to you within 2 hours.</p>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex gap-3">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-green-900 text-sm">Message sent successfully!</p>
                    <p className="text-green-700 text-xs mt-0.5">Our team will contact you within 2 hours.</p>
                  </div>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="font-semibold text-red-900 text-sm">Something went wrong. Please try again or call us at +254 711 515 752.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Service Needed *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="e.g. Residential Garbage Collection"
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.subject ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea name="message" rows={5} value={formData.message} onChange={handleChange}
                    placeholder="Include your location, type of waste, frequency needed, and any specific requirements..."
                    className="w-full px-4 py-3 border border-slate-200 bg-slate-50 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none" />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-green-700 hover:bg-green-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all text-sm">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                <p className="text-center text-xs text-slate-400">Or call us directly: <a href="tel:+254711515752" className="text-green-700 font-semibold">+254 711 515 752</a></p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
