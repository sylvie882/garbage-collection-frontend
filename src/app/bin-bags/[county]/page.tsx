// src/app/bin-bags/[county]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BinBagQuoteForm from '@/components/BinBagQuoteForm';
import { COUNTIES, getCountyBySlug, ALL_COUNTY_SLUGS } from '@/lib/counties';

const SITE = 'https://sylviegarbagecollection.co.ke';


export async function generateStaticParams() {
  return ALL_COUNTY_SLUGS.map(slug => ({ county: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ county: string }> }): Promise<Metadata> {
  const { county: slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) return { title: 'County Not Found' };

  const title = `Color-Coded Bin Bags in ${county.name} County, Kenya | Bulk Supply`;
  const description = `Durable, leak-proof color-coded bin bags delivered to ${county.name} County — covering ${county.majorTowns.slice(0, 4).join(', ')} and all surrounding areas. Black, yellow, green, clear, and clinical waste bags. Bulk supply with fast delivery. Call 0711 515 752.`;

  return {
    title,
    description,
    keywords: `bin bags ${county.name}, color coded bin bags ${county.name}, medical waste bags ${county.name}, garbage bags ${county.name}, wheelie bin liners ${county.name}, bulk bin bags ${county.name}, waste segregation bags ${county.name}, ${county.majorTowns.join(', ')} bin bags`,
    openGraph: {
      title,
      description,
      url: `${SITE}/bin-bags/${slug}`,
      type: 'website',
      locale: 'en_KE',
    },
    alternates: { canonical: `${SITE}/bin-bags/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function CountyBinBagsPage({ params }: { params: Promise<{ county: string }> }) {
  const { county: slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) notFound();

  const nearby = COUNTIES.filter(c => c.slug !== slug && c.region === county.region).slice(0, 4);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Color-Coded Bin Bags in ${county.name} County, Kenya`,
      description: `Durable, leak-proof color-coded bin bags delivered to ${county.name} County, including ${county.majorTowns.join(', ')}. Black general waste, yellow medical waste, green organic, clear recyclable, and clinical bags. Bulk supply with fast delivery.`,
      provider: {
        '@type': 'Organization',
        name: 'Sylvie Waste and Garbage Collection Limited',
        url: SITE,
        telephone: '+254711515752',
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: `${county.name} County`,
        containedInPlace: { '@type': 'Country', name: 'Kenya' },
      },
      serviceType: 'Color-Coded Bin Bag Supply',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Bin Bags', item: `${SITE}/bin-bags` },
        { '@type': 'ListItem', position: 3, name: `${county.name} County`, item: `${SITE}/bin-bags/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Do you deliver bin bags to ${county.majorTowns[0]} in ${county.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes — we deliver to the entire ${county.name} County including ${county.majorTowns.join(', ')} and all surrounding areas.`,
          },
        },
        {
          '@type': 'Question',
          name: `How quickly can you deliver bin bags in ${county.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `We typically deliver within ${county.responseTime} for orders in ${county.name} County. Contact us to confirm availability for your specific location.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Do you provide color-coded bags for medical waste?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — we supply yellow, red, and orange clinical-grade bags with printed biohazard symbols compliant with Kenya healthcare waste regulations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I order a mix of colors and sizes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. Many of our clients order multiple colors and sizes in a single delivery — especially hospitals and hotels.',
          },
        },
      ],
    },
  ];

  // Color codes for quick reference
  const colorCodes = [
    { name: 'Black', hex: '#1f2937', use: 'General waste' },
    { name: 'Clear', hex: '#f3f4f6', use: 'Recyclables' },
    { name: 'Green', hex: '#16a34a', use: 'Organic waste' },
    { name: 'Yellow ☣', hex: '#eab308', use: 'Medical waste' },
    { name: 'Red ☣', hex: '#dc2626', use: 'High risk' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="sr-only" aria-hidden="true">
        <h1>Color-Coded Bin Bags in {county.name} County Kenya</h1>
        <p>
          We deliver durable, leak-proof color-coded bin bags across {county.name} County, including {county.majorTowns.join(', ')}. 
          Black general waste bags, yellow medical waste bags, green organic bags, clear recyclable bags, and clinical waste bags. 
          Bulk supply with fast delivery. Call 0711 515 752.
        </p>
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
              <li><Link href="/bin-bags" className="hover:text-white">Bin Bags</Link></li>
              <li>/</li>
              <li className="text-green-100 font-semibold">{county.name}</li>
            </ol>
          </nav>
          <span className="inline-block bg-white/10 border border-white/20 text-green-200 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            {county.region} Region · Kenya
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Color-Coded Bin Bags in<br />{county.name} County
          </h1>
          <p className="text-green-200 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            We deliver durable, leak-proof color-coded bin bags across {county.name} County — {county.description}. 
            Black general waste, yellow medical waste, green organic, clear recyclable, and clinical bags. Bulk supply with fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">
              Get a Free Quote in {county.name}
            </a>
            <a
              href="https://wa.me/254711515752?text=Hi, I need bin bags in {{county.name}}"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
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
            <p className="text-xs text-slate-500 mt-0.5">Typical delivery in {county.name}</p>
          </div>
          <div className="text-center px-4 py-3">
            <p className="font-bold text-green-800 text-sm">9 Color Codes</p>
            <p className="text-xs text-slate-500 mt-0.5">Compliant with Kenya standards</p>
          </div>
          <div className="text-center px-4 py-3">
            <p className="font-bold text-green-800 text-sm">Bulk Supply</p>
            <p className="text-xs text-slate-500 mt-0.5">Rolls & flat packs available</p>
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
                Bin Bag Delivery Across {county.name} County
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We deliver durable, leak-proof color-coded bin bags across <strong>{county.name} County</strong>, including{' '}
                {county.majorTowns.join(', ')} and all surrounding areas. Choose from our full range of colors, sizes, and gauges — 
                from small office liners to extra-large wheelie bin bags.
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
                <strong>Don't see your town?</strong> We still deliver to your area. Contact us to confirm availability anywhere in {county.name} County.
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>
                  Local Delivery Highlights
                </h3>
                <div className="space-y-3">
                  {[
                    [`Delivery within ${county.responseTime} in ${county.name}`, true],
                    ['Full range of 9 color-coded bags', true],
                    ['Sizes from 10L to 240L wheelie bin liners', true],
                    ['Heavy-duty gauges for medical waste', true],
                    ['Star seal for leak resistance', true],
                    ['Standing orders & scheduled deliveries', true],
                  ].map(([item]) => (
                    <div key={item as string} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {item as string}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-6">
                <p className="font-bold mb-1" style={{ fontFamily: "'Fraunces', serif" }}>Contact Us for {county.name}</p>
                <p className="text-slate-400 text-xs mb-4">Mon–Sat 8am–6pm · Bulk orders available</p>
                <div className="space-y-2">
                  <a href="tel:+254711515752" className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-2.5 rounded-xl text-sm transition-colors">
                    Call: 0711 515 752
                  </a>
                  <a href="mailto:sylviegarbagecollection@gmail.com" className="block w-full bg-white/10 hover:bg-white/20 text-white text-center font-semibold py-2.5 rounded-xl text-sm transition-colors">
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLOR CODES QUICK REFERENCE */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Kenya Color Coding Standard</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Color Codes Available in {county.name}
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Every bin bag color has a designated waste stream. We supply all colors compliant with Kenya's waste segregation standards.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {colorCodes.map((color) => (
              <div key={color.name} className="bg-white border border-slate-200 rounded-xl p-4 text-center transition-all hover:shadow-md">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 border-2 border-slate-200" style={{ backgroundColor: color.hex }} />
                <p className="font-bold text-slate-800 text-sm">{color.name}</p>
                <p className="text-xs text-slate-500 mt-1">{color.use}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-6">
            Also available: Blue (Pharmaceutical), Brown (Chemical), Orange (Anatomical), Purple (Cytotoxic)
          </p>
        </div>
      </section>

      {/* SIZES & APPLICATIONS */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Sizes Available</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Bin Bag Sizes for {county.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { size: '10–15 Litres', use: 'Desk bins, washrooms, small offices', dims: '18×24″ or 20×30″' },
              { size: '30 Litres', use: 'Standard pedal bins, offices, classrooms', dims: '24×36″' },
              { size: '50–60 Litres', use: 'Kitchens, hospital wards, corridors', dims: '30×36″ or 36×50″' },
              { size: '80–120 Litres', use: 'Commercial kitchens, loading bays, markets', dims: '36×56″' },
              { size: '240 Litres', use: 'Wheelie bin liners for estates, factories', dims: 'Wheelie bin fit' },
              { size: 'Custom Sizes', use: 'Bespoke manufacturing for unique requirements', dims: 'Made to specification' },
            ].map((item) => (
              <div key={item.size} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-green-300 transition-all">
                <div className="text-xs font-bold uppercase tracking-wider text-green-600 mb-1">Size</div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{item.size}</h3>
                <p className="text-xs text-slate-400 mb-2">{item.dims}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Local Questions</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              About Our {county.name} Service
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: `Do you deliver bin bags to ${county.majorTowns[0]}${county.majorTowns[1] ? ` and ${county.majorTowns[1]}` : ''}?`,
                a: `Yes — we deliver to the entire ${county.name} County including ${county.majorTowns.join(', ')} and all surrounding areas.`,
              },
              {
                q: `How quickly can you deliver in ${county.name}?`,
                a: `We typically deliver within ${county.responseTime} for orders in ${county.name} County. Contact us to confirm availability for your specific location.`,
              },
              {
                q: 'Do you provide color-coded bags for medical waste?',
                a: 'Yes — we supply yellow, red, and orange clinical-grade bags with printed biohazard symbols compliant with Kenya healthcare waste regulations.',
              },
              {
                q: 'Can I order a mix of colors and sizes?',
                a: 'Absolutely. Many of our clients — especially hospitals and hotels — order multiple colors and sizes in a single delivery.',
              },
              {
                q: 'Do you offer standing orders for ongoing supply?',
                a: 'Yes. We offer scheduled deliveries and standing orders for institutions that need a reliable monthly or weekly supply.',
              },
              {
                q: 'What is the minimum order quantity?',
                a: 'Standard rolls and flat packs are available from 1 roll / 50 bags. For custom sizes or bespoke orders, minimum order quantities apply.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-green-50 transition-colors list-none">
                  <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="py-16 bg-white" id="quote">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Get Started</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Get a Free Quote in {county.name}
            </h2>
            <p className="text-slate-500 mt-3">
              We respond within 2 hours on business days with pricing tailored to your exact requirements.
            </p>
          </div>
          <Suspense fallback={<div className="h-96 bg-slate-50 rounded-2xl border border-slate-200 animate-pulse" />}>
            <BinBagQuoteForm />
          </Suspense>
          <p className="text-center text-xs text-slate-400 mt-4">
            Or call us directly: <a href="tel:+254711515752" className="text-green-700 font-bold">0711 515 752</a>
          </p>
        </div>
      </section>

      {/* NEARBY COUNTIES */}
      {nearby.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Nearby Counties</p>
            <div className="flex flex-wrap gap-3">
              {nearby.map(c => (
                <Link
                  key={c.slug}
                  href={`/bin-bags/${c.slug}`}
                  className="border border-slate-200 hover:border-green-400 text-slate-700 hover:text-green-800 text-sm font-semibold px-4 py-2 rounded-xl transition-all bg-white hover:bg-green-50"
                >
                  {c.name} County →
                </Link>
              ))}
              <Link
                href="/bin-bags#counties"
                className="border border-slate-200 hover:border-green-400 text-slate-500 hover:text-green-700 text-sm font-medium px-4 py-2 rounded-xl transition-all"
              >
                All 47 Counties
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SEO PARAGRAPH */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-slate-500 text-sm leading-relaxed">
          <p>
            Looking for <strong>color-coded bin bags in {county.name}</strong>? Sylvie Waste and Garbage Collection Limited supplies{' '}
            <strong>bin bags in {county.name} County</strong>, covering {county.majorTowns.join(', ')} and all surrounding areas. 
            Our range includes black general waste bags, yellow medical waste bags, green organic bags, clear recyclable bags, 
            and clinical waste bags — compliant with Kenya's waste segregation standards. <strong>Bulk orders welcome</strong>. 
            Call <strong>0711 515 752</strong> or WhatsApp for a free quote and fast delivery across {county.name}.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}