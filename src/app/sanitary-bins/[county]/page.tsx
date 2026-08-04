import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SanitaryBinQuoteForm from '@/components/SanitaryBinQuoteForm';
import { COUNTIES, getCountyBySlug, ALL_COUNTY_SLUGS } from '@/lib/counties';

const SITE = 'https://www.sylviegarbagecollection.co.ke';


export async function generateStaticParams() {
  return ALL_COUNTY_SLUGS.map(slug => ({ county: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ county: string }> }): Promise<Metadata> {
  const { county: slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) return { title: 'County Not Found' };

  const title = `Sanitary Bin Services in ${county.name} County, Kenya | Pedal & Automatic Bins`;
  const description = `Reliable sanitary bin rental and servicing in ${county.name} County, Kenya — covering ${county.majorTowns.slice(0, 4).join(', ')} and all surrounding areas. Pedal and automatic bins, weekly/bi-weekly/monthly servicing, disposal certificates. Call 0711 515 752.`;

  return {
    title,
    description,
    keywords: `sanitary bin ${county.name}, sanitary bin rental ${county.name} Kenya, feminine hygiene bins ${county.name}, pedal sanitary bin ${county.name}, automatic sanitary bin ${county.name}, washroom services ${county.name}, ${county.majorTowns.join(', ')} sanitary bins`,
    openGraph: {
      title,
      description,
      url: `${SITE}/sanitary-bins/${slug}`,
      type: 'website',
      locale: 'en_KE',
    },
    alternates: { canonical: `${SITE}/sanitary-bins/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function CountySanitaryPage({ params }: { params: Promise<{ county: string }> }) {
  const { county: slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) notFound();

  const nearby = COUNTIES.filter(c => c.slug !== slug && c.region === county.region).slice(0, 4);

  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'Service',
      name: `Sanitary Bin Services in ${county.name} County, Kenya`,
      description: `Professional sanitary bin rental and servicing across ${county.name} County, including ${county.majorTowns.join(', ')}.`,
      provider: { '@type': 'Organization', name: 'Sylvie Waste and Garbage Collection Limited', url: SITE, telephone: '+254711515752' },
      areaServed: { '@type': 'AdministrativeArea', name: `${county.name} County`, containedInPlace: { '@type': 'Country', name: 'Kenya' } },
      serviceType: 'Sanitary Bin Rental and Servicing',
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Sanitary Bin Services', item: `${SITE}/sanitary-bins` },
        { '@type': 'ListItem', position: 3, name: `${county.name} County`, item: `${SITE}/sanitary-bins/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: `Do you cover ${county.majorTowns[0]} in ${county.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Yes — we service the entire ${county.name} County including ${county.majorTowns.join(', ')} and all surrounding areas.` } },
        { '@type': 'Question', name: `How quickly can you deliver sanitary bins in ${county.name}?`, acceptedAnswer: { '@type': 'Answer', text: `We typically deliver and install sanitary bins in ${county.name} within ${county.responseTime}. Contact us to confirm availability for your specific location.` } },
        { '@type': 'Question', name: 'Can you service on weekends?', acceptedAnswer: { '@type': 'Answer', text: 'Weekend servicing is available by arrangement. Contact us to discuss your preferred schedule.' } },
        { '@type': 'Question', name: 'Do you provide emergency call-outs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — contact us for urgent support and we will prioritise your call-out.' } },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      <div className="sr-only" aria-hidden="true">
        <h1>Sanitary Bin Services in {county.name} County Kenya</h1>
        <p>We deliver and service sanitary bins across {county.name} County, including {county.majorTowns.join(', ')}. Choose pedal or automatic bins with regular servicing and certified waste disposal. Fast turnarounds, fair pricing, and discreet solutions for offices, schools, hospitals, hotels, malls and factories.</p>
      </div>

      <Header />

      {/* HERO */}
      <section className="bg-green-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <nav className="flex justify-center mb-6">
            <ol className="flex items-center gap-2 text-xs text-green-300">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li><Link href="/sanitary-bins" className="hover:text-white">Sanitary Bins</Link></li>
              <li>/</li>
              <li className="text-green-100 font-semibold">{county.name}</li>
            </ol>
          </nav>
          <span className="inline-block bg-white/10 border border-white/20 text-green-200 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">{county.region} Region · Kenya</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Sanitary Bins in {county.name} County
          </h1>
          <p className="text-green-200 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            We deliver and service sanitary bins across {county.name} County — {county.description}. Pedal and automatic bins with regular servicing and certified waste disposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">
              Get a Free Quote in {county.name}
            </a>
            <a href="https://wa.me/254711515752" target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* LOCAL PROOF */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 gap-0">
          <div className="text-center px-4 py-3">
            <p className="font-bold text-green-800 text-sm">{county.responseTime}</p>
            <p className="text-xs text-slate-500 mt-0.5">Typical response in {county.name}</p>
          </div>
          <div className="text-center px-4 py-3">
            <p className="font-bold text-green-800 text-sm">{county.majorTowns.length} Major Towns</p>
            <p className="text-xs text-slate-500 mt-0.5">Covered across {county.name} County</p>
          </div>
          <div className="text-center px-4 py-3">
            <p className="font-bold text-green-800 text-sm">Disposal Certificates</p>
            <p className="text-xs text-slate-500 mt-0.5">Issued after every service visit</p>
          </div>
        </div>
      </div>

      {/* AREAS COVERED */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Areas We Cover</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                Sanitary Bins Across {county.name} County
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We deliver and service sanitary bins across <strong>{county.name} County</strong>, including {county.majorTowns.join(', ')} and all surrounding areas. Fast turnarounds, fair pricing and discreet solutions for offices, schools, hospitals, hotels, malls and factories.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {county.majorTowns.map(town => (
                  <div key={town} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{town}</span>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-800">
                <strong>Don't see your town?</strong> We likely still serve your area. Contact us to confirm availability anywhere in {county.name} County.
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>Local Service Highlights</h3>
                <div className="space-y-3">
                  {[
                    [`Delivery within ${county.responseTime} in ${county.name}`, true],
                    ['Experienced local service team', true],
                    ['Weekly, bi-weekly or monthly servicing', true],
                    ['Certified waste disposal with documentation', true],
                    ['Emergency call-outs available', true],
                    ['Multi-site rollout management', true],
                  ].map(([item]) => (
                    <div key={item as string} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      </div>
                      {item as string}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-6">
                <p className="font-bold mb-1" style={{ fontFamily: "'Fraunces', serif" }}>Contact Us for {county.name}</p>
                <p className="text-slate-400 text-xs mb-4">Mon–Sat 8am–6pm · Emergency call-outs available</p>
                <div className="space-y-2">
                  <a href="tel:+254711515752" className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-2.5 rounded-xl text-sm transition-colors">Call: 0711 515 752</a>
                  <a href="mailto:sylviegarbagecollection@gmail.com" className="block w-full bg-white/10 hover:bg-white/20 text-white text-center font-semibold py-2.5 rounded-xl text-sm transition-colors">Email Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Services Available</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>What We Offer in {county.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {t:'Pedal Sanitary Bin Rental', d:'Hands-free 15–20L bins. Antimicrobial liners and scented cartridges. Best value for compliance.', href:`/sanitary-bins/quote?bin=pedal&county=${county.name}`},
              {t:'Automatic Bin Rental', d:'Sensor-activated contactless bins. Advanced odour control. Premium facilities.', href:`/sanitary-bins/quote?bin=automatic&county=${county.name}`},
              {t:'Scheduled Servicing', d:'Weekly, bi-weekly or monthly liner replacement, cleaning and certified waste removal.', href:'#quote'},
              {t:'Disposal Certification', d:'Waste transfer notes and disposal certificates issued after every service cycle.', href:'#quote'},
            ].map(s => (
              <Link key={s.t} href={s.href} className="bg-white border border-slate-200 hover:border-green-400 rounded-2xl p-6 transition-all hover:shadow-md group">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <div className="w-4 h-4 bg-green-600 rounded-full" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>{s.t}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL FAQ */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Local Questions</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>About Our {county.name} Service</h2>
          </div>
          <div className="space-y-3">
            {[
              {q:`Do you cover ${county.majorTowns[0]}${county.majorTowns[1] ? ` and ${county.majorTowns[1]}` : ''}?`, a:`Yes — we service the entire ${county.name} County including ${county.majorTowns.join(', ')} and surrounding areas.`},
              {q:`How quickly can you deliver in ${county.name}?`, a:`We typically deliver and install within ${county.responseTime}. Contact us to confirm availability for your specific location.`},
              {q:'Can you service on weekends?', a:'Weekend servicing is available by arrangement. Contact us to discuss your preferred schedule.'},
              {q:'Do you provide emergency call-outs?', a:'Yes — contact us for urgent support and we will prioritise your call-out.'},
              {q:`Can you handle multiple sites across ${county.name}?`, a:`Yes. We manage multi-site rollouts with central billing and SLA reporting across ${county.name} and neighbouring counties.`},
              {q:'What is included in the rental price?', a:'Delivery, installation, regular servicing, liner replacement, deodoriser refill, cleaning and a waste disposal certificate — all included.'},
            ].map(({q,a}) => (
              <details key={q} className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-green-50 transition-colors list-none">
                  <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </summary>
                <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="py-16 bg-slate-50" id="quote">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Get Started</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Get a Free Quote in {county.name}</h2>
            <p className="text-slate-500 mt-3">We respond within 24 hours with accurate pricing for your {county.name} site.</p>
          </div>
          <Suspense fallback={<div className="h-96 bg-white rounded-2xl border border-slate-200 animate-pulse" />}>
            <SanitaryBinQuoteForm />
          </Suspense>
        </div>
      </section>

      {/* NEARBY COUNTIES */}
      {nearby.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Nearby Counties</p>
            <div className="flex flex-wrap gap-3">
              {nearby.map(c => (
                <Link key={c.slug} href={`/sanitary-bins/${c.slug}`}
                  className="border border-slate-200 hover:border-green-400 text-slate-700 hover:text-green-800 text-sm font-semibold px-4 py-2 rounded-xl transition-all bg-white hover:bg-green-50">
                  {c.name} County →
                </Link>
              ))}
              <Link href="/sanitary-bins#counties" className="border border-slate-200 hover:border-green-400 text-slate-500 hover:text-green-700 text-sm font-medium px-4 py-2 rounded-xl transition-all">
                All 47 Counties
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SEO PARAGRAPH */}
      <section className="py-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-slate-500 text-sm leading-relaxed">
          <p>Looking for <strong>sanitary bin services in {county.name}</strong>? Sylvie Waste and Garbage Collection Limited provides professional <strong>sanitary bin rental in {county.name} County</strong>, covering {county.majorTowns.join(', ')} and all surrounding areas. We offer <strong>pedal sanitary bins</strong> and <strong>automatic sanitary bins</strong> with weekly, bi-weekly or monthly servicing and <strong>waste disposal certificates</strong> issued after every visit. Call <strong>0711 515 752</strong> or WhatsApp for a free quote.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
