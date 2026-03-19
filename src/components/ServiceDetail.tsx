'use client';

import { Service } from '@/types';
import { useState } from 'react';
import Link from 'next/link';

interface ServiceDetailProps { service: Service; }

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'benefits' | 'gallery' | 'video'>('overview');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // ── helpers ────────────────────────────────────────────────
  const features: string[] = Array.isArray(service.features) ? service.features : service.features ? [service.features as unknown as string] : [];
  const benefits: string[]  = Array.isArray(service.benefits)  ? service.benefits  : service.benefits  ? [service.benefits  as unknown as string] : [];

  const resolveUrl = (path: string) => path.startsWith('http') ? path : `https://api.sylviegarbagecollection.co.ke/storage/${path}`;
  const mainImage = service.image_url || (service.image_path ? resolveUrl(service.image_path) : null);
  const gallery: string[] = ((service as any).gallery_images_urls?.length
    ? (service as any).gallery_images_urls
    : (service as any).gallery_images?.map((p: string) => resolveUrl(p)) ?? []);

  const getYTId = (url: string) => {
    const m = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return m ? m[1] : null;
  };
  const ytId = service.youtube_url ? getYTId(service.youtube_url) : null;

  const tabs = [
    { key: 'overview', label: 'Overview' },
    ...(features.length ? [{ key: 'features', label: 'Features' }] : []),
    ...(benefits.length  ? [{ key: 'benefits', label: 'Benefits' }]  : []),
    ...(gallery.length || mainImage ? [{ key: 'gallery', label: 'Gallery' }] : []),
    ...(ytId ? [{ key: 'video', label: 'Video' }] : []),
  ] as { key: typeof activeTab; label: string }[];

  const descWords = service.full_description?.split(' ').length ?? 0;
  const isLong = descWords > 80;
  const shortDesc = service.full_description?.split(' ').slice(0, 80).join(' ') + '…';

  const priceDisplay = service.price
    ? `KES ${Number(service.price).toLocaleString()}${service.price_unit ? ` / ${service.price_unit}` : ''}`
    : null;

  // ── render ─────────────────────────────────────────────────
  return (
    <>
      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-bold w-10 h-10 flex items-center justify-center">✕</button>
          <img src={lightboxImg} alt="Gallery" className="max-w-full max-h-[90vh] object-contain rounded-xl" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* ── Hero banner ─────────────────────────────────────────── */}
      <section className="bg-green-800 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-start gap-4 justify-between">
            <div className="flex-1 min-w-0">
              {service.category && (
                <Link href={`/services?category=${encodeURIComponent(service.category)}`}
                  className="inline-block text-xs font-bold uppercase tracking-widest text-green-300 hover:text-white transition-colors mb-3">
                  {service.category}
                </Link>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                {service.name}
              </h1>
              <p className="text-green-200 leading-relaxed max-w-2xl text-sm lg:text-base">{service.description}</p>
              {/* Meta tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {service.duration && <span className="bg-green-700/60 text-green-100 border border-green-600 text-xs px-3 py-1 rounded-full">{service.duration}</span>}
                {service.frequency && <span className="bg-green-700/60 text-green-100 border border-green-600 text-xs px-3 py-1 rounded-full">{service.frequency}</span>}
                {service.featured && <span className="bg-orange-500/80 text-white text-xs px-3 py-1 rounded-full font-bold">Featured</span>}
              </div>
            </div>
            {/* Price card */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-5 text-white min-w-[200px] flex-shrink-0">
              {priceDisplay ? (
                <>
                  <p className="text-xs text-green-300 uppercase tracking-wider mb-1">Starting from</p>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>{priceDisplay}</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-green-200 mb-2">Get a free quote</p>
                  <p className="text-xs text-green-300">No obligation · 24hr response</p>
                </>
              )}
              <div className="mt-4 flex flex-col gap-2">
                <Link href="/quote" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-2.5 rounded-xl text-sm transition-colors">Free Quote</Link>
                <a href="tel:+254711515752" className="block w-full bg-white/10 hover:bg-white/20 text-white text-center font-semibold py-2.5 rounded-xl text-sm transition-colors">Call Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left: tabs + content */}
            <div className="lg:col-span-2">
              {/* Tab nav */}
              <div className="flex gap-1 border-b border-slate-200 mb-8 overflow-x-auto">
                {tabs.map(t => (
                  <button key={t.key} onClick={() => setActiveTab(t.key)}
                    className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all -mb-px ${
                      activeTab === t.key
                        ? 'border-green-700 text-green-700'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab: Overview */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Service Overview</h2>
                  {service.full_description ? (
                    <div>
                      <div className="prose prose-slate prose-sm lg:prose-base max-w-none text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: isLong && !showFullDesc ? `<p>${shortDesc}</p>` : service.full_description }} />
                      {isLong && (
                        <button onClick={() => setShowFullDesc(v => !v)}
                          className="mt-3 text-green-700 hover:text-green-800 text-sm font-semibold flex items-center gap-1 transition-colors">
                          {showFullDesc ? 'Show Less' : 'Read More'}
                          <svg className={`w-4 h-4 transition-transform ${showFullDesc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-slate-600 leading-relaxed space-y-4">
                      <p>Our {service.name} service provides comprehensive waste management solutions for both residential and commercial properties across Kenya.</p>
                      <div className="bg-green-50 border-l-4 border-green-500 px-4 py-3 rounded-r-xl text-sm text-green-800">
                        Available across Nairobi, Nakuru, Narok and Laikipia counties — 500+ locations served.
                      </div>
                    </div>
                  )}

                  {/* Default features inline on overview if no tabs */}
                  {features.length > 0 && !tabs.find(t => t.key === 'features') && (
                    <div className="mt-6">
                      <h3 className="font-bold text-slate-900 mb-3 text-sm">What's included</h3>
                      <ul className="space-y-2">
                        {features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Features */}
              {activeTab === 'features' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Fraunces', serif" }}>Service Features</h2>
                  <ul className="space-y-3">
                    {(features.length ? features : ['Professional trained team','Eco-friendly disposal','Flexible scheduling','Competitive pricing']).map((f, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white rounded-xl border border-slate-200 px-4 py-3">
                        <div className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <span className="text-slate-700 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab: Benefits */}
              {activeTab === 'benefits' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Fraunces', serif" }}>Service Benefits</h2>
                  <ul className="space-y-3">
                    {(benefits.length ? benefits : ['Cleaner, healthier environment','Reduced pest risk','Environmentally responsible','Saves your time']).map((b, i) => (
                      <li key={i} className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                        <div className="w-5 h-5 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <span className="text-green-900 text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab: Gallery */}
              {activeTab === 'gallery' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Fraunces', serif" }}>Gallery</h2>
                  {(gallery.length > 0 || mainImage) ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {mainImage && (
                        <button onClick={() => setLightboxImg(mainImage)} className="aspect-square rounded-xl overflow-hidden border-2 border-green-500 hover:opacity-95 transition-opacity">
                          <img src={mainImage} alt={`${service.name} main`} className="w-full h-full object-cover" />
                        </button>
                      )}
                      {gallery.map((img, i) => (
                        <button key={i} onClick={() => setLightboxImg(img)} className="aspect-square rounded-xl overflow-hidden border border-slate-200 hover:border-green-400 hover:opacity-95 transition-all">
                          <img src={img} alt={`${service.name} ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm py-8 text-center bg-slate-50 rounded-xl">No gallery images available.</p>
                  )}
                </div>
              )}

              {/* Tab: Video */}
              {activeTab === 'video' && ytId && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Fraunces', serif" }}>Service Video</h2>
                  <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                      className="w-full h-full"
                      allowFullScreen
                      title={`${service.name} — Sylvie Garbage Collection`}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right: sidebar */}
            <div className="space-y-5">
              {/* Main image */}
              {mainImage && !ytId && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                  <img src={mainImage} alt={service.name} className="w-full h-full object-cover" />
                </div>
              )}
              {/* YouTube thumbnail */}
              {ytId && (
                <button onClick={() => setActiveTab('video')}
                  className="w-full rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-900 relative group">
                  <img src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`} alt={service.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity"
                    onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`; }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </button>
              )}

              {/* Service details card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-4 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>Service Details</h3>
                <div className="space-y-3">
                  {service.category && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Category</span>
                      <span className="font-semibold text-slate-900">{service.category}</span>
                    </div>
                  )}
                  {priceDisplay && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Price</span>
                      <span className="font-bold text-green-700">{priceDisplay}</span>
                    </div>
                  )}
                  {service.duration && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-semibold text-slate-900">{service.duration}</span>
                    </div>
                  )}
                  {service.frequency && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Frequency</span>
                      <span className="font-semibold text-slate-900">{service.frequency}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Coverage</span>
                    <span className="font-semibold text-slate-900 text-right">4 Counties · 500+ locations</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Support</span>
                    <span className="font-semibold text-green-700">24/7 Available</span>
                  </div>
                </div>
                <div className="border-t border-slate-100 mt-4 pt-4 space-y-2">
                  <Link href="/quote" className="block w-full bg-green-700 hover:bg-green-800 text-white text-center font-bold py-3 rounded-xl text-sm transition-colors">Get Free Quote</Link>
                  <a href="tel:+254711515752" className="block w-full border border-slate-200 hover:border-green-400 text-slate-700 text-center font-semibold py-3 rounded-xl text-sm transition-all">+254 711 515 752</a>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-3 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>Why Choose Us</h3>
                <div className="space-y-2.5">
                  {[
                    'Certified & trained professionals',
                    '100% eco-friendly disposal',
                    'Serving 500+ locations',
                    '24/7 customer support',
                    'No hidden charges',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/254711515752?text=${encodeURIComponent(`Hi, I'm interested in your ${service.name} service. Could you please provide more information?`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-4 transition-colors">
                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p className="font-bold text-sm">Chat on WhatsApp</p>
                  <p className="text-green-100 text-xs">Quick reply · Available now</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
