import Link from 'next/link';
import type { Metadata } from 'next';
import { Service } from '../../types';
import ServicesSearch from '../../components/ServicesSearch';
import ServiceCard from '../../components/ServiceCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SearchParams { search?: string; category?: string; page?: string; }

const API = 'https://api.sylviegarbagecollection.co.ke/api';
const SITE = 'https://sylviegarbagecollection.co.ke';

// ─── SEO metadata ───────────────────────────────────────────
export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const params = await searchParams;
  const search = params.search || '';
  const category = params.category && params.category !== 'all' ? params.category : '';

  const title = search
    ? `"${search}" Services | Sylvie Garbage Collection Kenya`
    : category
    ? `${category} Services | Sylvie Garbage Collection Kenya`
    : 'Professional Waste Management Services | Sylvie Garbage Collection Kenya';

  const description = search
    ? `Find "${search}" waste management services from Sylvie Garbage Collection. Serving Nairobi, Nakuru, Narok & Laikipia counties with eco-friendly solutions.`
    : category
    ? `Professional ${category} services from Sylvie Garbage Collection across Kenya. Eco-friendly, reliable and certified. Get a free quote today.`
    : 'Professional waste management services in Kenya: garbage collection, recycling, pest control, sanitary bins and cleaning services. Serving Nairobi, Nakuru, Narok & Laikipia counties.';

  return {
    title,
    description,
    keywords: [
      'waste management services Kenya',
      'garbage collection Nairobi',
      'recycling services Kenya',
      'pest control Nairobi',
      'sanitary bin services Kenya',
      'cleaning services Nairobi',
      'commercial waste management Kenya',
      'residential garbage collection',
      'Sylvie garbage collection',
      ...(category ? [category, `${category} Kenya`, `${category} Nairobi`] : []),
      ...(search ? [search, `${search} Kenya`] : []),
    ].join(', '),
    openGraph: {
      title,
      description,
      url: `${SITE}/services${search ? `?search=${search}` : ''}`,
      type: 'website',
      locale: 'en_KE',
      images: [{ url: `${SITE}/og-services.jpg`, width: 1200, height: 630, alt: 'Sylvie Garbage Collection Services Kenya' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `${SITE}/services` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

// ─── Data fetching ───────────────────────────────────────────
async function getAllServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API}/services`, { next: { revalidate: 120 } });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

async function getFilteredServices(params: SearchParams) {
  const all = await getAllServices();
  let filtered = all;
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(s =>
      s.name?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q) ||
      (Array.isArray(s.features) && s.features.some(f => f?.toLowerCase().includes(q)))
    );
  }
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter(s => s.category?.toLowerCase() === params.category!.toLowerCase());
  }
  const page = parseInt(params.page || '1');
  const perPage = 9;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const items = filtered.slice((page - 1) * perPage, page * perPage);
  return { services: items, totalCount: total, currentPage: page, totalPages, allCount: all.length };
}

async function getCategories(all: Service[]): Promise<string[]> {
  const cats = [...new Set(all.map(s => s.category).filter(Boolean))] as string[];
  return ['all', ...cats];
}

// ─── Structured data ─────────────────────────────────────────
function buildStructuredData(services: Service[], totalCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Waste Management Services — Sylvie Garbage Collection',
    description: 'Professional waste management, garbage collection and environmental services across Kenya',
    url: `${SITE}/services`,
    numberOfItems: totalCount,
    itemListElement: services.slice(0, 10).map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        url: `${SITE}/services/${s.slug || s.id}`,
        provider: { '@type': 'Organization', name: 'Sylvie Garbage Collection', url: SITE },
        areaServed: ['Nairobi County', 'Nakuru County', 'Narok County', 'Laikipia County'],
        serviceType: s.category || 'Waste Management',
        ...(s.price ? { offers: { '@type': 'Offer', price: s.price, priceCurrency: 'KES' } } : {}),
      },
    })),
  };
}

function buildBreadcrumb() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
    ],
  };
}

// ─── Page component ───────────────────────────────────────────
export default async function ServicesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const allServices = await getAllServices();
  const { services, totalCount, currentPage, totalPages } = await getFilteredServices(params);
  const categories = await getCategories(allServices);

  // Pagination numbers
  const pages: (number | '…')[] = [];
  if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
  else if (currentPage <= 3) { [1,2,3,4].forEach(p => pages.push(p)); pages.push('…'); pages.push(totalPages); }
  else if (currentPage >= totalPages - 2) { pages.push(1); pages.push('…'); for (let i = totalPages-3; i <= totalPages; i++) pages.push(i); }
  else { pages.push(1); pages.push('…'); [currentPage-1,currentPage,currentPage+1].forEach(p => pages.push(p)); pages.push('…'); pages.push(totalPages); }

  const structuredData = buildStructuredData(services, totalCount);
  const breadcrumb = buildBreadcrumb();

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* SEO structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hidden SEO text */}
      <div className="sr-only" aria-hidden="true">
        <h1>Professional Waste Management Services — Sylvie Garbage Collection Kenya</h1>
        <p>Comprehensive garbage collection, recycling, pest control and cleaning services across Nairobi, Nakuru, Narok and Laikipia counties. {totalCount} professional services available.</p>
        {services.slice(0, 5).map(s => (
          <div key={s.id}>
            <h2>{s.name}</h2>
            <p>{s.description}</p>
            {Array.isArray(s.features) && <ul>{s.features.map((f, i) => <li key={i}>{f}</li>)}</ul>}
          </div>
        ))}
      </div>

      <Header />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-green-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <nav aria-label="Breadcrumb" className="flex justify-center mb-5">
            <ol className="flex items-center gap-2 text-xs text-green-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li className="text-green-600">/</li>
              <li className="text-green-100 font-semibold">Services</li>
            </ol>
          </nav>
          <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-3">
            {params.category && params.category !== 'all' ? params.category : 'What We Offer'}
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
            {params.search
              ? <>Results for <span className="text-orange-300">&quot;{params.search}&quot;</span></>
              : params.category && params.category !== 'all'
              ? <>{params.category} <span className="text-orange-300">Services</span></>
              : <>Professional <span className="text-orange-300">Waste Management</span> Services</>
            }
          </h1>
          <p className="text-green-200 max-w-2xl mx-auto leading-relaxed mb-8">
            {totalCount > 0
              ? `${totalCount} professional service${totalCount !== 1 ? 's' : ''} available across Nairobi, Nakuru, Narok and Laikipia counties.`
              : 'Comprehensive garbage collection, recycling and environmental services across Kenya.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl transition-all text-sm shadow-lg">Get Free Quote</Link>
            <a href="#services-grid" className="border border-white/40 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-xl transition-all text-sm">
              Browse {totalCount > 0 ? `${totalCount} ` : ''}Services
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-slate-100">
          {[
            { n: `${allServices.length}+`, l: 'Total Services' },
            { n: '500+', l: 'Locations Covered' },
            { n: '4', l: 'Counties Served' },
            { n: '100%', l: 'Eco-Friendly' },
          ].map(s => (
            <div key={s.l} className="text-center px-4 py-2">
              <div className="text-lg font-bold text-green-800" style={{ fontFamily: "'Fraunces', serif" }}>{s.n}</div>
              <div className="text-xs text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search bar ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ServicesSearch categories={categories} initialSearch={params.search} initialCategory={params.category} />
        </div>
      </div>

      {/* ── Services grid ────────────────────────────────────────── */}
      <section id="services-grid" className="py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Results header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
                {params.search ? `Search results for "${params.search}"` : params.category && params.category !== 'all' ? `${params.category} Services` : 'Our Service Catalog'}
              </h2>
              <p className="text-slate-500 text-sm mt-0.5">
                {totalCount} service{totalCount !== 1 ? 's' : ''} found
                {params.category && params.category !== 'all' && <> · <span className="text-green-700 font-medium">{params.category}</span></>}
                {totalPages > 1 && <> · Page {currentPage} of {totalPages}</>}
              </p>
            </div>
            {(params.search || (params.category && params.category !== 'all')) && (
              <Link href="/services" className="text-xs border border-slate-200 hover:border-green-400 text-slate-600 hover:text-green-700 px-3 py-1.5 rounded-lg transition-all font-semibold">
                Clear filters
              </Link>
            )}
          </div>

          {/* Category quick filters */}
          {categories.length > 2 && !params.search && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <Link key={cat} href={cat === 'all' ? '/services' : `/services?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    (cat === 'all' && !params.category) || params.category === cat
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-green-400 hover:text-green-700'
                  }`}>
                  {cat === 'all' ? 'All Services' : cat}
                </Link>
              ))}
            </div>
          )}

          {services.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {services.map(service => (
                  <div key={service.id} className="hover:-translate-y-1 transition-transform duration-300">
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
                  {currentPage > 1 && (
                    <Link href={{ pathname: '/services', query: { ...params, page: currentPage - 1 } }}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-green-400 text-slate-600 hover:text-green-700 transition-all text-sm font-semibold">
                      ← Prev
                    </Link>
                  )}
                  {pages.map((p, i) => p === '…' ? (
                    <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
                  ) : (
                    <Link key={p} href={{ pathname: '/services', query: { ...params, page: p } }}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${p === currentPage ? 'bg-green-700 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-green-400 hover:text-green-700'}`}>
                      {p}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link href={{ pathname: '/services', query: { ...params, page: currentPage + 1 } }}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-green-400 text-slate-600 hover:text-green-700 transition-all text-sm font-semibold">
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                {params.search ? `No services match "${params.search}"` : 'No services found'}
              </h3>
              <p className="text-slate-500 text-sm mb-6">Try a different search or browse all services.</p>
              <div className="flex gap-3 justify-center">
                <Link href="/services" className="bg-green-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors">Browse All Services</Link>
                <Link href="/contact" className="border border-slate-200 text-slate-700 px-6 py-3 rounded-xl text-sm font-semibold hover:border-green-400 transition-colors">Contact Us</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Counties strip ───────────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Services available across</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Nairobi County', sub: '500+ locations', href: '/services/nairobi' },
              { name: 'Nakuru County', sub: '30+ locations', href: '/services/nakuru' },
              { name: 'Narok County', sub: '6 major areas', href: '/services/narok' },
              { name: 'Laikipia County', sub: '6 key locations', href: '/services/laikipia' },
            ].map(c => (
              <Link key={c.name} href={c.href}
                className="bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-300 rounded-xl px-4 py-4 text-center transition-all group">
                <p className="font-bold text-slate-900 text-sm group-hover:text-green-800 transition-colors">{c.name}</p>
                <p className="text-xs text-green-600 mt-0.5">{c.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Ready for Professional Waste Management?</h2>
          <p className="text-green-200 mb-8 leading-relaxed">Get a personalised quote for your home or business — we respond within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">Get Free Quote</Link>
            <Link href="/contact" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all">Talk to Us</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 justify-center text-green-300 text-xs">
            {['Free Quote','No Hidden Charges','24/7 Support','100% Eco-Friendly'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><span className="text-green-400">✓</span>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
