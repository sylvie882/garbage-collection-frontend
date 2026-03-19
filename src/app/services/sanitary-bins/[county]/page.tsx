import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Suspense } from 'react';  // ✅ correct
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import SanitaryBinQuoteForm from '@/components/SanitaryBinQuoteForm';

// ─── County data ──────────────────────────────────────────────────────────────
const COUNTY_DATA: Record<string, {
  name: string;
  towns: string[];
  responseTime: string;
  tagline: string;
}> = {
  'nairobi': {
    name: 'Nairobi',
    towns: ['Westlands','Karen','CBD','Kilimani','Upper Hill','Parklands','Lavington','Ngong Road','Industrial Area','Eastleigh','Gigiri','Muthaiga','Runda','Ruaraka','Kasarani'],
    responseTime: '24–48 hours',
    tagline: 'Fast delivery and servicing across all Nairobi estates and commercial zones.',
  },
  'mombasa': {
    name: 'Mombasa',
    towns: ['Mombasa Island','Nyali','Bamburi','Likoni','Changamwe','Kisauni','Tudor','Ganjoni','Mikindani','Port Reitz'],
    responseTime: '2–4 days',
    tagline: 'Reliable sanitary bin services for coastal businesses, hotels and offices.',
  },
  'kisumu': {
    name: 'Kisumu',
    towns: ['Kisumu CBD','Milimani','Kondele','Mamboleo','Nyalenda','Lolwe','Nyahera','Kajulu','Maseno'],
    responseTime: '2–4 days',
    tagline: 'Professional washroom hygiene solutions across Kisumu and the lake region.',
  },
  'nakuru': {
    name: 'Nakuru',
    towns: ['Milimani','Kiamunyi','Naka Estate','Section 58','London Estate','Naivasha Town','Gilgil','Molo','Njoro','Pipeline Estate'],
    responseTime: '2–3 days',
    tagline: 'Scheduled sanitary bin servicing for Nakuru County offices, schools and factories.',
  },
  'kiambu': {
    name: 'Kiambu',
    towns: ['Thika','Ruiru','Juja','Kiambu Town','Githunguri','Limuru','Kikuyu','Banana','Tigoni','Ndumberi'],
    responseTime: '1–2 days',
    tagline: 'Quick-turnaround sanitary bin delivery and servicing across Kiambu County.',
  },
};

// Generate slugs for all 47 counties
const ALL_COUNTY_SLUGS = [
  'nairobi','mombasa','kisumu','nakuru','uasin-gishu','kiambu','machakos',
  'kajiado','muranga','nyeri','meru','embu','kirinyaga','laikipia',
  'nyandarua','tharaka-nithi','kitui','makueni','garissa','wajir','mandera',
  'marsabit','isiolo','samburu','turkana','west-pokot','elgeyo-marakwet',
  'nandi','baringo','kakamega','vihiga','bungoma','busia','siaya',
  'homa-bay','migori','kisii','nyamira','bomet','kericho','narok',
  'trans-nzoia','taita-taveta','kwale','kilifi','lamu','tana-river',
];

function getCountyName(slug: string): string {
  const map: Record<string, string> = {
    'nairobi':'Nairobi','mombasa':'Mombasa','kisumu':'Kisumu','nakuru':'Nakuru',
    'uasin-gishu':'Uasin Gishu','kiambu':'Kiambu','machakos':'Machakos',
    'kajiado':'Kajiado','muranga':"Murang'a",'nyeri':'Nyeri','meru':'Meru',
    'embu':'Embu','kirinyaga':'Kirinyaga','laikipia':'Laikipia',
    'nyandarua':'Nyandarua','tharaka-nithi':'Tharaka-Nithi','kitui':'Kitui',
    'makueni':'Makueni','garissa':'Garissa','wajir':'Wajir','mandera':'Mandera',
    'marsabit':'Marsabit','isiolo':'Isiolo','samburu':'Samburu','turkana':'Turkana',
    'west-pokot':'West Pokot','elgeyo-marakwet':'Elgeyo-Marakwet','nandi':'Nandi',
    'baringo':'Baringo','kakamega':'Kakamega','vihiga':'Vihiga','bungoma':'Bungoma',
    'busia':'Busia','siaya':'Siaya','homa-bay':'Homa Bay','migori':'Migori',
    'kisii':'Kisii','nyamira':'Nyamira','bomet':'Bomet','kericho':'Kericho',
    'narok':'Narok','trans-nzoia':'Trans Nzoia','taita-taveta':'Taita-Taveta',
    'kwale':'Kwale','kilifi':'Kilifi','lamu':'Lamu','tana-river':'Tana River',
  };
  return map[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const SITE = 'https://sylviegarbagecollection.co.ke';

// ─── Static params for all 47 counties ───────────────────────────────────────
export async function generateStaticParams() {
  return ALL_COUNTY_SLUGS.map(county => ({ county }));
}

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ county: string }> }): Promise<Metadata> {
  const { county: slug } = await params;
  if (!ALL_COUNTY_SLUGS.includes(slug)) return { title: 'Not Found' };

  const countyName = getCountyName(slug);
  const data = COUNTY_DATA[slug];
  const towns = data?.towns.slice(0, 4).join(', ') || countyName;

  return {
    title: `Sanitary Bin Services in ${countyName}, Kenya | Pedal & Automatic Bins`,
    description: `Reliable sanitary bin rental and servicing in ${countyName}. Pedal and automatic bins, weekly/bi-weekly/monthly servicing, disposal certificates. Serving ${towns} and surrounding areas. Call 0711 515 752.`,
    keywords: `sanitary bins ${countyName}, sanitary bin rental ${countyName}, feminine hygiene bins ${countyName}, washroom services ${countyName} Kenya, automatic sanitary bins ${countyName}, pedal bins ${countyName}`,
    openGraph: {
      title: `Sanitary Bin Services in ${countyName} | Sylvie Garbage Collection`,
      description: `Pedal & automatic sanitary bins across ${countyName} County. Scheduled servicing, disposal certificates, discreet solutions for offices, schools & hospitals.`,
      url: `${SITE}/services/sanitary-bins/${slug}`,
      type: 'website',
      locale: 'en_KE',
    },
    alternates: { canonical: `${SITE}/services/sanitary-bins/${slug}` },
    robots: { index: true, follow: true },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CountySanitaryPage({ params }: { params: Promise<{ county: string }> }) {
  const { county: slug } = await params;

  if (!ALL_COUNTY_SLUGS.includes(slug)) notFound();

  const countyName = getCountyName(slug);
  const data = COUNTY_DATA[slug];
  const towns = data?.towns || [];
  const responseTime = data?.responseTime || '3–5 days';
  const tagline = data?.tagline || `Professional sanitary bin rental and servicing across ${countyName} County.`;

  // Structured data
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Sanitary Bin Services in ${countyName}`,
    description: `Sanitary bin rental and servicing in ${countyName} County, Kenya. Pedal and automatic bins with scheduled servicing and disposal certificates.`,
    url: `${SITE}/services/sanitary-bins/${slug}`,
    provider: { '@type': 'LocalBusiness', name: 'Sylvie Garbage Collection', url: SITE, telephone: '+254711515752' },
    areaServed: { '@type': 'State', name: `${countyName} County`, containedInPlace: { '@type': 'Country', name: 'Kenya' } },
    serviceType: 'Sanitary Bin Services',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
      { '@type': 'ListItem', position: 3, name: 'Sanitary Bins', item: `${SITE}/services/sanitary-bins` },
      { '@type': 'ListItem', position: 4, name: `${countyName} County`, item: `${SITE}/services/sanitary-bins/${slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `Do you cover all areas in ${countyName}?`, acceptedAnswer: { '@type': 'Answer', text: `Yes, we service the entire ${countyName} County${towns.length ? `, including ${towns.slice(0,4).join(', ')} and surrounding areas` : ''}.` } },
      { '@type': 'Question', name: 'Can you service on weekends?', acceptedAnswer: { '@type': 'Answer', text: 'Weekend servicing is available by arrangement. Contact us to discuss your schedule.' } },
      { '@type': 'Question', name: 'Do you provide emergency call-outs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — contact us on 0711 515 752 for urgent support and we will prioritise your call-out.' } },
      { '@type': 'Question', name: 'How quickly can you deliver in ' + countyName + '?', acceptedAnswer: { '@type': 'Answer', text: `Our typical response time in ${countyName} is ${responseTime} from order confirmation.` } },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hidden SEO */}
      <div className="sr-only" aria-hidden="true">
        <h1>Sanitary Bin Services in {countyName}, Kenya</h1>
        <p>Sylvie Garbage Collection provides sanitary bin rental and servicing in {countyName} County{towns.length ? `, including ${towns.join(', ')}` : ''}. Pedal and automatic sanitary bins with weekly, bi-weekly or monthly servicing, disposal certificates and antimicrobial liners. Call 0711 515 752.</p>
      </div>

      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-green-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-green-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li>/</li>
              <li><Link href="/services/sanitary-bins" className="hover:text-white transition-colors">Sanitary Bins</Link></li>
              <li>/</li>
              <li className="text-green-100 font-semibold">{countyName}</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-green-700/60 border border-green-600 text-green-100 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                {countyName} County
              </span>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                Sanitary Bins in<br /><span className="text-orange-300">{countyName}</span>
              </h1>
              <p className="text-green-200 leading-relaxed mb-6">{tagline}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#quote-form" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm text-center transition-all shadow-lg">
                  Get Free Quote in {countyName}
                </a>
                <a href="tel:+254711515752" className="border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl text-sm text-center transition-all">
                  Call 0711 515 752
                </a>
              </div>
            </div>

            {/* Local proof points */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h2 className="font-bold text-white mb-4 text-base" style={{ fontFamily: "'Fraunces', serif" }}>
                Why We're the Right Choice in {countyName}
              </h2>
              <div className="space-y-3">
                {[
                  `Response within ${responseTime} in ${countyName}`,
                  'Trained technicians in full PPE',
                  'Waste disposal certificates issued',
                  'Flexible weekly, bi-weekly or monthly visits',
                  'Free site assessment — no obligation',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-green-100">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coverage areas ───────────────────────────────────────────────────── */}
      {towns.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Coverage</p>
              <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
                Areas We Serve in {countyName}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {towns.map(town => (
                <div key={town} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 hover:border-green-300 hover:bg-green-50 transition-all">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{town}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm">
              Don't see your specific area? <strong>We cover all of {countyName} County.</strong>{' '}
              <Link href="/contact" className="text-green-700 font-semibold hover:underline">Contact us to confirm.</Link>
            </p>
          </div>
        </section>
      )}

      {/* ── Services in this county ──────────────────────────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Our Services</p>
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Sanitary Bin Services Available in {countyName}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Pedal Sanitary Bin Rental', items: ['15–20L capacity','Hands-free operation','Antimicrobial liner included','Monthly/bi-weekly/weekly service'] },
              { title: 'Automatic Sensor Bin Rental', items: ['Contactless lid — zero touch','Premium look for high-end sites','Advanced odour control','Full servicing included'] },
              { title: 'Scheduled Servicing', items: ['On-time liner replacement','Bin cleaning & sanitisation','Waste removal to licensed facility','Disposal certificate issued'] },
              { title: 'Certified Disposal', items: ['Waste transfer notes','Regulatory compliance documentation','Licensed disposal partners','Traceable waste streams'] },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-3.5 h-3.5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              FAQs — {countyName}
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: `Do you cover all areas in ${countyName}?`, a: `Yes, we service the entire ${countyName} County${towns.length ? `, including ${towns.slice(0,5).join(', ')} and surrounding areas` : ''}. Contact us to confirm your specific location.` },
              { q: 'Can you service on weekends?', a: 'Weekend servicing is available by arrangement. Contact us to discuss a schedule that works for your site.' },
              { q: 'Do you provide emergency call-outs?', a: `Yes — call us on 0711 515 752 for urgent support in ${countyName}. We prioritise emergency requests.` },
              { q: `How quickly can you deliver in ${countyName}?`, a: `Our typical delivery response time in ${countyName} is ${responseTime} from order confirmation. Subject to stock availability.` },
              { q: 'What documentation do you provide?', a: 'We issue waste transfer notes and disposal certificates after every service cycle — essential for business audits and public health compliance.' },
            ].map(({ q, a }, i) => (
              <details key={i} className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-green-50 transition-colors list-none">
                  <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-200 pt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote form ───────────────────────────────────────────────────────── */}
      <section className="py-14 bg-slate-50" id="quote-form">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Free Quote</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
              Get a Free Quote in {countyName}
            </h2>
            <p className="text-slate-500 text-sm">We'll get back to you within 24 hours with pricing and availability for {countyName}.</p>
          </div>
          <Suspense fallback={<div className="h-96 bg-white rounded-2xl border border-slate-200 animate-pulse" />}>
            <SanitaryBinQuoteForm />
          </Suspense>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-green-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Fraunces', serif" }}>
            Serving {countyName} and All 47 Counties
          </h2>
          <p className="text-green-200 mb-6 text-sm">Every county in Kenya. Discreet, compliant, professional washroom hygiene.</p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <a href="#quote-form" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">Get Free Quote</a>
            <a href="tel:+254711515752" className="border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all">Call 0711 515 752</a>
            <Link href="/services/sanitary-bins" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all">View All Counties</Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
