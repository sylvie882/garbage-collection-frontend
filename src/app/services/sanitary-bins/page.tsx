import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import SanitaryBinQuoteForm from '@/components/SanitaryBinQuoteForm';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Sanitary Bin Services in Kenya | Pedal & Automatic Bins — Sylvie',
  description:
    'Professional sanitary bin rental and servicing across all 47 counties in Kenya. Pedal and automatic bins, weekly/bi-weekly/monthly servicing, disposal certificates. Call 0711 515 752.',
  keywords:
    'sanitary bin services Kenya, sanitary bin rental Kenya, feminine hygiene bins Kenya, automatic sanitary bins Kenya, pedal sanitary bins Kenya, washroom services Nairobi, sanitary waste disposal Kenya, sanitary bins Mombasa, sanitary bins Kisumu, sanitary bins Nakuru, Sylvie sanitary bins',
  openGraph: {
    title: 'Sanitary Bin Services Across All 47 Counties in Kenya | Sylvie',
    description:
      'Hygienic, compliant sanitary bin rental and servicing. Pedal and automatic bins with scheduled servicing and disposal certificates. Nationwide coverage.',
    url: 'https://sylviegarbagecollection.co.ke/services/sanitary-bins',
    type: 'website',
    locale: 'en_KE',
    siteName: 'Sylvie Garbage Collection',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanitary Bin Services Kenya | Sylvie Garbage Collection',
    description: 'Pedal & automatic sanitary bins across all 47 counties. Scheduled servicing, disposal certificates, discreet solutions.',
  },
  alternates: { canonical: 'https://sylviegarbagecollection.co.ke/services/sanitary-bins' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE = 'https://sylviegarbagecollection.co.ke';

const ALL_COUNTIES = [
  'Nairobi','Mombasa','Kisumu','Nakuru','Uasin Gishu','Kiambu','Machakos',
  'Kajiado',"Murang'a",'Nyeri','Meru','Embu','Kirinyaga','Laikipia',
  'Nyandarua','Tharaka-Nithi','Kitui','Makueni','Garissa','Wajir','Mandera',
  'Marsabit','Isiolo','Samburu','Turkana','West Pokot','Elgeyo-Marakwet',
  'Nandi','Baringo','Kakamega','Vihiga','Bungoma','Busia','Siaya',
  'Homa Bay','Migori','Kisii','Nyamira','Bomet','Kericho','Narok',
  'Trans Nzoia','Taita-Taveta','Kwale','Kilifi','Lamu','Tana River',
];

const PRIORITY_COUNTIES = ['Nairobi','Mombasa','Kisumu','Nakuru','Kiambu'];

const INDUSTRIES = [
  { name: 'Offices & Corporate Buildings', icon: '🏢' },
  { name: 'Schools, Colleges & Universities', icon: '🎓' },
  { name: 'Hospitals & Clinics', icon: '🏥' },
  { name: 'Hotels, Restaurants & Malls', icon: '🏨' },
  { name: 'Manufacturing & Warehouses', icon: '🏭' },
  { name: 'Government & NGOs', icon: '🏛️' },
  { name: 'Gyms & Co-Working Spaces', icon: '💪' },
  { name: 'Events & Temporary Sites', icon: '🎪' },
];

const FAQS = [
  { q: 'How many bins do I need?', a: 'Typically one bin per female washroom cubicle. High-traffic sites may need larger capacity or more frequent servicing. We provide a free site assessment to recommend the right setup.' },
  { q: 'Do you provide disposal certificates?', a: 'Yes. We issue waste transfer notes and disposal certificates after every service cycle — essential for audits and compliance with Kenyan public health regulations.' },
  { q: 'How often do you service the bins?', a: 'We offer weekly, bi-weekly, and monthly schedules. We recommend a frequency based on your site footfall and industry. Custom schedules are available.' },
  { q: 'What areas do you cover?', a: 'All 47 counties in Kenya, including remote locations. We have logistics partners and trained technicians in every region.' },
  { q: 'Are the bins discreet and odour-free?', a: 'Yes. Our bins use antimicrobial liners and deodorising cartridges that control odours and bacteria between service visits.' },
  { q: 'Can you handle multi-branch organisations?', a: 'Absolutely. We manage national rollouts, central billing, and SLA reporting for organisations with multiple sites across different counties.' },
  { q: 'What is included in the rental?', a: 'Delivery, installation, scheduled liner replacement, cleaning, waste removal, deodoriser cartridges, and a disposal certificate — all in one simple fee.' },
];

// ─── Structured Data ──────────────────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sylvie Garbage Collection',
  url: SITE,
  telephone: '+254711515752',
  email: 'sylviegarbagecollection@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dale House, Fox Close Off Rhapta Road',
    addressLocality: 'Westlands',
    addressRegion: 'Nairobi',
    addressCountry: 'KE',
  },
  openingHours: 'Mo-Sa 08:00-18:00',
  areaServed: ALL_COUNTIES.map(c => ({ '@type': 'State', name: c })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sanitary Bin Rental & Servicing',
  description: 'Professional sanitary bin rental, delivery, installation and scheduled servicing across all 47 counties in Kenya. Pedal and automatic sensor bins available with disposal certificates.',
  url: `${SITE}/services/sanitary-bins`,
  provider: { '@type': 'LocalBusiness', name: 'Sylvie Garbage Collection', url: SITE },
  areaServed: 'Kenya',
  serviceType: 'Hygiene Services',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Sanitary Bin Products',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Pedal Sanitary Bin', description: 'Hands-free 15–20L pedal sanitary bin with antimicrobial liner and deodorising cartridge. Includes scheduled servicing.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Automatic Sanitary Bin', description: 'Sensor-activated contactless sanitary bin for maximum hygiene. Premium look for high-end facilities. Includes scheduled servicing.' } },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
    { '@type': 'ListItem', position: 3, name: 'Sanitary Bin Services', item: `${SITE}/services/sanitary-bins` },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SanitaryBinsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hidden SEO text */}
      <div className="sr-only" aria-hidden="true">
        <h1>Sanitary Bin Services in Kenya — Pedal and Automatic Bins Across All 47 Counties</h1>
        <p>Sylvie Garbage Collection provides professional sanitary bin rental and servicing in Kenya. We supply, rent and service pedal and automatic sanitary bins for offices, schools, hospitals, malls, hotels, factories and SMEs across Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Meru, Embu, Machakos and every county nationwide. Scheduled servicing, disposal certificates, antimicrobial liners and deodorising cartridges included.</p>
        <p>Counties served: {ALL_COUNTIES.join(', ')}</p>
      </div>

      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-green-800 py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-green-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li>/</li>
              <li className="text-green-100 font-semibold">Sanitary Bins</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-green-700/60 border border-green-600 text-green-100 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                All 47 Counties Covered
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
                Hygienic, Compliant<br />
                <span className="text-orange-300">Sanitary Bin Services</span><br />
                Across Kenya
              </h1>
              <p className="text-green-200 text-lg leading-relaxed mb-8">
                We supply, rent and service pedal and automatic sanitary bins for offices, schools, hospitals, malls, hotels and factories — on time, discreet, and fully compliant with Kenyan hygiene standards.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  'Nationwide — All 47 Counties',
                  'Disposal Certificates Provided',
                  'Discreet Female Hygiene Solutions',
                  'Eco-Conscious Waste Disposal',
                ].map(badge => (
                  <div key={badge} className="flex items-center gap-2 bg-green-700/40 border border-green-600/40 rounded-xl px-3 py-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="text-green-100 text-xs font-medium">{badge}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#quote-form" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm text-center shadow-lg">
                  Get Free Quote
                </a>
                <a href="https://wa.me/254711515752?text=Hi%2C%20I'm%20interested%20in%20sanitary%20bin%20services." target="_blank" rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm text-center">
                  WhatsApp Us
                </a>
              </div>
              <p className="text-green-300 text-xs mt-3">
                Call/WhatsApp: <a href="tel:+254711515752" className="font-bold text-white hover:text-green-200">0711 515 752</a>
              </p>
            </div>

            {/* Hero stats card */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '47', l: 'Counties Covered', sub: 'Nationwide service' },
                { n: '2', l: 'Bin Types', sub: 'Pedal & automatic' },
                { n: '3', l: 'Service Plans', sub: 'Weekly · Bi-weekly · Monthly' },
                { n: '100%', l: 'Eco-Conscious', sub: 'Certified disposal' },
              ].map(s => (
                <div key={s.l} className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Fraunces', serif" }}>{s.n}</p>
                  <p className="text-green-100 font-semibold text-sm">{s.l}</p>
                  <p className="text-green-300 text-xs mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Who We Are</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
            Kenya's Trusted Sanitary Bin Provider
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            At Sylvie Waste and Garbage Collection Limited, we provide professional sanitary bin rental and servicing in every county in Kenya. Our pedal and automatic sanitary bins offer safe, discreet disposal of feminine hygiene waste — helping your business stay compliant, clean, and welcoming.
          </p>
          <p className="text-slate-500 leading-relaxed mt-4">
            We handle <strong className="text-slate-700">delivery, installation, scheduled servicing, waste removal, and environmental documentation</strong> — so you never worry about washroom hygiene again.
          </p>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Why Sylvie</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Why Choose Our Sanitary Bin Services
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Nationwide Reach', body: 'Reliable deliveries and servicing in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret and all 47 counties — including remote areas.' },
              { title: 'Two Bin Options', body: 'Contactless automatic sensor bins or hands-free pedal bins to fit your budget and hygiene goals.' },
              { title: 'Flexible Servicing', body: 'Weekly, bi-weekly or monthly service visits to match your site footfall and budget. Custom schedules available.' },
              { title: 'Compliance Documentation', body: 'Waste transfer notes and disposal certificates issued after every service cycle. Essential for audits and inspections.' },
              { title: 'Discreet & Odour-Free', body: 'Antimicrobial liners and deodorising cartridges reduce odours and bacteria between service visits.' },
              { title: 'Transparent Pricing', body: 'Simple rental plus service fee — no hidden charges. Volume discounts available for 10+ bins or multiple branches.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bin Types ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" id="bin-types">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Our Products</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Our Sanitary Bins</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Two bin types to match your facility needs and budget. Both include full servicing, liners and disposal documentation.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pedal */}
            <div className="bg-slate-50 border-2 border-slate-200 hover:border-green-400 rounded-2xl p-8 transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Pedal Sanitary Bins</h3>
                <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full">Hands-Free</span>
              </div>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">Cost-effective compliance solution for standard offices, schools and mid-traffic washrooms.</p>
              <ul className="space-y-2.5">
                {[
                  '15–20L capacity options',
                  'Durable slim design fits most cubicles',
                  'Antimicrobial liners and scented cartridges',
                  'Best for cost-effective compliance',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#quote-form?bin=pedal" className="block mt-6 w-full border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-center font-bold py-3 rounded-xl transition-all text-sm">
                Get Pedal Bin Quote
              </a>
            </div>

            {/* Automatic */}
            <div className="bg-green-800 border-2 border-green-700 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Premium</span>
              </div>
              <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Fraunces', serif" }}>Automatic Sanitary Bins</h3>
                <span className="text-xs bg-green-700/60 text-green-200 border border-green-600 font-bold px-2.5 py-1 rounded-full">Sensor</span>
              </div>
              <p className="text-green-200 text-sm mb-5 leading-relaxed">Maximum hygiene for hospitals, hotels, malls and premium facilities.</p>
              <ul className="space-y-2.5">
                {[
                  'Contactless sensor lid — no touch',
                  'Premium look for high-end facilities',
                  'Advanced odour control technology',
                  'Ideal for high-traffic environments',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-green-100">
                    <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#quote-form?bin=automatic" className="block mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-3 rounded-xl transition-all text-sm">
                Get Automatic Bin Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">The Process</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Site Assessment', body: 'We help you choose bin type, capacity and service frequency based on your site footfall.' },
              { step: '02', title: 'Delivery & Installation', body: 'Nationwide delivery and professional setup by our trained technicians in full PPE.' },
              { step: '03', title: 'Scheduled Servicing', body: 'On-time liner replacement, cleaning, waste removal and disposal certificate issued.' },
              { step: '04', title: 'Ongoing Support', body: 'Responsive customer service, emergency call-outs and replacement guarantees.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-green-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg" style={{ fontFamily: "'Fraunces', serif" }}>
                  {item.step}
                </div>
                {i < 3 && <div className="hidden md:block absolute w-full h-px bg-slate-200 top-7 left-1/2" />}
                <h3 className="font-bold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Who We Serve</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Industries We Serve</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center hover:border-green-300 hover:bg-green-50 transition-all">
                <div className="text-2xl mb-2">{ind.icon}</div>
                <p className="font-semibold text-slate-800 text-sm leading-tight">{ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Additional Services ───────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Add-Ons</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
                Additional Washroom Services
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">Complement your sanitary bin service with our full washroom hygiene suite — available as optional add-ons to your contract.</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Air Fresheners & Dispensers',
                  'Soap & Hand Sanitiser Dispensers',
                  'Paper Towel & Toilet Tissue Supply',
                  'Nappy / Diaper Bins',
                  'Sharps & Clinical Waste Bins',
                  'Deep Cleaning & Disinfection',
                ].map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-800 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Our Commitment</h3>
              <div className="space-y-4">
                {[
                  { title: 'Hygiene First', body: 'Contactless or hands-free options reduce cross-contamination.' },
                  { title: 'People & Dignity', body: 'Female hygiene supported with privacy and respect.' },
                  { title: 'Environment', body: 'Approved disposal routes and minimal plastic waste.' },
                  { title: 'Compliance', body: 'Adherence to local public health and environmental regulations.' },
                ].map(c => (
                  <div key={c.title} className="flex gap-3">
                    <div className="w-5 h-5 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm">{c.title}</p>
                      <p className="text-green-200 text-xs mt-0.5">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Counties Grid ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" id="counties">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Service Area</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Fraunces', serif" }}>
              Available in All 47 Counties
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">Click a priority county for a dedicated service page. Not listed? We still cover your area — contact us.</p>
          </div>

          {/* Priority counties with dedicated pages */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {PRIORITY_COUNTIES.map(county => (
              <Link key={county} href={`/services/sanitary-bins/${county.toLowerCase().replace(/[' ]/g, '-')}`}
                className="bg-green-800 hover:bg-green-700 text-white text-center font-bold py-3 px-4 rounded-xl transition-all text-sm hover:-translate-y-0.5 hover:shadow-lg">
                {county}
              </Link>
            ))}
          </div>

          {/* All other counties */}
          <div className="flex flex-wrap gap-2 justify-center">
            {ALL_COUNTIES.filter(c => !PRIORITY_COUNTIES.includes(c)).map(county => (
              <span key={county} className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200">
                {county}
              </span>
            ))}
          </div>

          <p className="text-center mt-6 text-slate-500 text-sm">
            Don't see a dedicated page for your county?{' '}
            <Link href="/contact" className="text-green-700 font-semibold hover:underline">Contact us</Link> — we service all 47.
          </p>
        </div>
      </section>

      {/* ── SEO Blurb ───────────────────────────────────────────────────────── */}
      <section className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-slate-500 text-sm leading-relaxed text-center">
            Looking for <strong className="text-slate-700">sanitary bin services in Kenya</strong>? We offer sanitary bin rental, feminine hygiene bins, and washroom servicing in{' '}
            <strong className="text-slate-700">Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Meru, Embu, Machakos</strong>{' '}
            and every county nationwide. Choose pedal bins or automatic sanitary bins with scheduled service visits and proper waste disposal certificates. Serving offices, schools, hospitals, hotels and malls across Kenya since 2020.
          </p>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" id="faq">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">FAQs</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <details key={i} className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-green-50 transition-colors list-none">
                  <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-200 pt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Form ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50" id="quote-form">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Free Quote</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Fraunces', serif" }}>
              Request a Free Site Survey
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Tell us about your site and we'll recommend the right bins and service schedule. No obligation — accurate pricing after a quick assessment.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="h-96 bg-white rounded-2xl border border-slate-200 animate-pulse" />}>
                <SanitaryBinQuoteForm />
              </Suspense>
            </div>
            <div className="space-y-5">
              <div className="bg-green-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Contact Us Directly</h3>
                <div className="space-y-3">
                  <a href="tel:+254711515752" className="flex items-center gap-3 text-green-100 hover:text-white transition-colors">
                    <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm">0711 515 752</p>
                      <p className="text-green-300 text-xs">Mon–Sat, 8am–6pm</p>
                    </div>
                  </a>
                  <a href="mailto:sylviegarbagecollection@gmail.com" className="flex items-center gap-3 text-green-100 hover:text-white transition-colors">
                    <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-xs break-all">sylviegarbagecollection@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h4 className="font-bold text-slate-900 text-sm mb-3" style={{ fontFamily: "'Fraunces', serif" }}>What's Included</h4>
                <ul className="space-y-2">
                  {['Delivery & installation','Antimicrobial liners','Deodorising cartridges','Scheduled servicing','Waste removal','Disposal certificate'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-3.5 h-3.5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Ready to Upgrade Your Washroom Hygiene?
          </h2>
          <p className="text-green-200 mb-8 leading-relaxed">
            Join businesses across Kenya who trust Sylvie for discreet, compliant and reliable sanitary bin services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote-form" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">Get Free Quote</a>
            <a href="tel:+254711515752" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all">Call 0711 515 752</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
