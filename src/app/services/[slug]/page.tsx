import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Service } from '@/types';
import ServiceDetail from '@/components/ServiceDetail';
import RelatedServices from '@/components/RelatedServices';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API = 'https://api.sylviegarbagecollection.co.ke/api';
const SITE = 'https://sylviegarbagecollection.co.ke';

// ─── Data fetching ───────────────────────────────────────────
async function getService(slug: string): Promise<Service | null> {
  const clean = slug.trim();
  const isNumeric = !isNaN(Number(clean)) && clean !== '';

  // Strategy 1: direct endpoints
  const endpoints = isNumeric
    ? [`${API}/services/${clean}`, `${API}/services/id/${clean}`]
    : [`${API}/services/slug/${clean.toLowerCase()}`, `${API}/services/${clean.toLowerCase()}`];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const data = await res.json();
        if (data?.id && data?.name) return data;
      }
    } catch { continue; }
  }

  // Strategy 2: scan all services
  try {
    const res = await fetch(`${API}/services`, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const raw = await res.json();
    const services: Service[] = Array.isArray(raw) ? raw : raw.data ?? raw.services ?? [];
    const slugLow = clean.toLowerCase();
    return (
      services.find(s => isNumeric && s.id?.toString() === clean) ||
      services.find(s => s.slug?.toLowerCase() === slugLow) ||
      services.find(s => s.name?.toLowerCase().includes(slugLow.replace(/-/g, ' '))) ||
      null
    );
  } catch { return null; }
}

async function getRelatedServices(current: Service): Promise<Service[]> {
  try {
    const res = await fetch(`${API}/services`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const raw = await res.json();
    const all: Service[] = Array.isArray(raw) ? raw : raw.data ?? [];
    return all.filter(s => s.id !== current.id && s.category === current.category).slice(0, 3);
  } catch { return []; }
}

// ─── SEO Metadata ────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  let slug = '';
  try { slug = (await params).slug; } catch { return { title: 'Service | Sylvie Garbage Collection' }; }

  const service = await getService(slug);
  if (!service) return { title: 'Service Not Found | Sylvie Garbage Collection' };

  const title = `${service.name} | Sylvie Garbage Collection Kenya`;
  const description = service.description
    ? `${service.description.slice(0, 155)}${service.description.length > 155 ? '…' : ''}`
    : `Professional ${service.name} services in Kenya. Eco-friendly, reliable and certified waste management by Sylvie Garbage Collection.`;

  const keywords = [
    service.name,
    `${service.name} Kenya`,
    `${service.name} Nairobi`,
    service.category,
    `${service.category} services Kenya`,
    'waste management Kenya',
    'garbage collection Nairobi',
    'Sylvie garbage collection',
    ...(Array.isArray(service.features) ? service.features.slice(0, 3) : []),
  ].filter(Boolean).join(', ');

  const imageUrl = service.image_url || (service.image_path
    ? `https://api.sylviegarbagecollection.co.ke/storage/${service.image_path}`
    : `${SITE}/og-services.jpg`);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${SITE}/services/${service.slug || service.id}`,
      type: 'website',
      locale: 'en_KE',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${service.name} — Sylvie Garbage Collection` }],
      siteName: 'Sylvie Garbage Collection',
    },
    twitter: { card: 'summary_large_image', title, description, images: [imageUrl] },
    alternates: { canonical: `${SITE}/services/${service.slug || service.id}` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export async function generateStaticParams() { return []; }

// ─── Structured data helpers ─────────────────────────────────
function serviceStructuredData(service: Service) {
  const imageUrl = service.image_url || (service.image_path
    ? `https://api.sylviegarbagecollection.co.ke/storage/${service.image_path}`
    : null);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${SITE}/services/${service.slug || service.id}`,
    ...(imageUrl ? { image: imageUrl } : {}),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Sylvie Garbage Collection',
      url: SITE,
      telephone: '+254-711-515752',
      email: 'sylviegarbagecollection@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Dale House, Fox Close Off Rhapta Road',
        addressLocality: 'Westlands',
        addressRegion: 'Nairobi',
        addressCountry: 'KE',
      },
      areaServed: ['Nairobi County', 'Nakuru County', 'Narok County', 'Laikipia County'],
      openingHours: 'Mo-Su 00:00-23:59',
    },
    areaServed: ['Nairobi County', 'Nakuru County', 'Narok County', 'Laikipia County'],
    serviceType: service.category || 'Waste Management',
    category: service.category,
    ...(service.features?.length ? { serviceOutput: service.features } : {}),
    ...(service.price ? {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'KES',
        ...(service.price_unit ? { unitText: service.price_unit } : {}),
        availability: 'https://schema.org/InStock',
      },
    } : {}),
  };
}

function breadcrumbStructuredData(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE}/services/${service.slug || service.id}` },
    ],
  };
}

function faqStructuredData(features: string[], benefits: string[], service: Service) {
  const items = [
    { q: `What is included in ${service.name}?`, a: features.length ? features.join('. ') : `Our ${service.name} covers comprehensive waste management solutions for residential and commercial properties across Kenya.` },
    { q: `Where is ${service.name} available?`, a: 'We provide this service across Nairobi, Nakuru, Narok and Laikipia counties — covering 500+ locations.' },
    { q: `How much does ${service.name} cost?`, a: service.price ? `Starting from KES ${service.price}${service.price_unit ? ` per ${service.price_unit}` : ''}. Contact us for a customised quote.` : 'Contact us for a free, personalised quote tailored to your needs.' },
    { q: `How do I book ${service.name}?`, a: 'Call us on +254 711 515 752, email sylviegarbagecollection@gmail.com, or fill in our free quote form online.' },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// ─── Page ─────────────────────────────────────────────────────
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  let slug: string;
  try { slug = (await params).slug; } catch { notFound(); }
  if (!slug || slug === 'undefined' || slug === 'null') notFound();

  const service = await getService(slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <p className="text-6xl font-bold text-slate-200 mb-4" style={{ fontFamily: "'Fraunces', serif" }}>404</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Service Not Found</h1>
          <p className="text-slate-500 mb-8">The service <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-sm">{slug}</span> could not be found.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/services" className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-800 transition-colors">View All Services</Link>
            <Link href="/" className="border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold text-sm hover:border-green-400 transition-colors">Go Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedServices = await getRelatedServices(service);
  const features: string[] = Array.isArray(service.features) ? service.features : service.features ? [service.features as unknown as string] : [];
  const benefits: string[] = Array.isArray(service.benefits) ? service.benefits : service.benefits ? [service.benefits as unknown as string] : [];

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData(service)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData(service)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData(features, benefits, service)) }} />

      {/* Hidden SEO content */}
      <div className="sr-only" aria-hidden="true">
        <h1>{service.name} — Sylvie Garbage Collection Kenya</h1>
        <p>{service.description}</p>
        {service.full_description && <div dangerouslySetInnerHTML={{ __html: service.full_description }} />}
        {features.length > 0 && <><h2>Features</h2><ul>{features.map((f, i) => <li key={i}>{f}</li>)}</ul></>}
        {benefits.length > 0 && <><h2>Benefits</h2><ul>{benefits.map((b, i) => <li key={i}>{b}</li>)}</ul></>}
        <p>Available in Nairobi County, Nakuru County, Narok County and Laikipia County. Call +254 711 515 752 or email sylviegarbagecollection@gmail.com.</p>
      </div>

      <Header />

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-green-700 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/services" className="hover:text-green-700 transition-colors">Services</Link></li>
              {service.category && <><li>/</li><li><Link href={`/services?category=${encodeURIComponent(service.category)}`} className="hover:text-green-700 transition-colors">{service.category}</Link></li></>}
              <li>/</li>
              <li className="text-slate-700 font-semibold truncate max-w-[200px]">{service.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Service detail component (your existing component) ──── */}
      <ServiceDetail service={service} />

      {/* ── Related services ─────────────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-white" aria-label="Related services">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">More Like This</p>
              <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Related Services</h2>
            </div>
            <RelatedServices services={relatedServices} />
          </div>
        </section>
      )}

      {/* ── Inline FAQ for SEO ───────────────────────────────────── */}
      <section className="py-16 bg-slate-50" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Common Questions</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-8" style={{ fontFamily: "'Fraunces', serif" }}>
            About {service.name}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `What does ${service.name} include?`,
                a: features.length ? features.slice(0, 4).join(' · ') : `Our ${service.name} covers comprehensive waste management solutions for residential and commercial clients across Kenya.`,
              },
              {
                q: 'Which areas do you serve?',
                a: 'We provide this service across Nairobi, Nakuru, Narok and Laikipia counties — covering 500+ locations. Contact us to confirm your specific area.',
              },
              {
                q: 'How do I get a quote?',
                a: 'Fill in our free online quote form, call +254 711 515 752, or email sylviegarbagecollection@gmail.com. We respond within 24 hours.',
              },
              ...(service.price ? [{
                q: 'How much does this service cost?',
                a: `Starting from KES ${Number(service.price).toLocaleString()}${service.price_unit ? ` per ${service.price_unit}` : ''}. We offer customised pricing based on your requirements.`,
              }] : []),
              ...(benefits.length ? [{
                q: `What are the benefits of ${service.name}?`,
                a: benefits.slice(0, 3).join(' · '),
              }] : []),
            ].map(({ q, a }, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                  <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Ready to Book {service.name}?
          </h2>
          <p className="text-green-200 mb-8 leading-relaxed">
            Get a free, personalised quote within 24 hours. Serving 500+ locations across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">Get Free Quote</Link>
            <a href="tel:+254711515752" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all">Call Now</a>
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
