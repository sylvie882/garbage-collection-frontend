// app/bin-bags/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BinBagQuoteForm from '@/components/BinBagQuoteForm';
import { COUNTIES, type CountyData } from '@/lib/counties';

const SITE = 'https://sylviegarbagecollection.co.ke';

export const metadata: Metadata = {
  title: 'Color-Coded Bin Bags in Kenya | Bulk Supply Nationwide | Sylvie',
  description: 'Kenya\'s trusted supplier of color-coded bin bags. Durable, leak-proof bags for healthcare, hospitality, education, corporate and public sector. Bulk supply, fast delivery countrywide.',
  keywords: 'bin bags Kenya, color coded bin bags Kenya, medical waste bags Kenya, garbage bags Nairobi, wheelie bin liners Kenya, bulk bin bags, waste segregation bags Kenya',
  openGraph: {
    title: 'Color-Coded Bin Bags in Kenya | Bulk Supply Nationwide | Sylvie',
    description: 'Durable, leak-proof, and compliant with Kenya\'s color coding standards. Bulk supply, fast delivery countrywide — from Nairobi to all 47 counties.',
    url: `${SITE}/bin-bags`,
    type: 'website',
    locale: 'en_KE',
    images: [
      {
        url: `${SITE}/images/bin-bags-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Color-coded bin bags from Sylvie Waste Collection',
      },
    ],
  },
  alternates: { canonical: `${SITE}/bin-bags` },
  robots: { index: true, follow: true },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sylvie Waste and Garbage Collection Limited',
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
    areaServed: { '@type': 'Country', name: 'Kenya' },
    openingHours: 'Mo-Sa 08:00-18:00',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Color-Coded Bin Bags Kenya',
    description: 'Durable, leak-proof color-coded bin bags compliant with Kenya waste segregation standards. Available in 9 colors and multiple sizes for healthcare, hospitality, education and corporate sectors.',
    brand: { '@type': 'Brand', name: 'Sylvie Waste Collection' },
    manufacturer: { '@type': 'Organization', name: 'Sylvie Waste and Garbage Collection Limited' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KES',
      price: '12',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2025-12-31',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Do you deliver upcountry?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — via courier or our logistics partners. Tracking is provided for all upcountry orders. Delivery is typically 1–3 business days depending on location.' } },
      { '@type': 'Question', name: 'What is the minimum order quantity?', acceptedAnswer: { '@type': 'Answer', text: 'Standard rolls and flat packs are available from 1 roll / 50 bags. For custom sizes or bespoke orders, minimum order quantities apply.' } },
      { '@type': 'Question', name: 'Do your clinical bags carry the biohazard symbol?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Yellow, red, and other clinical-grade bags in our range carry the printed biohazard symbol as required by Kenya\'s healthcare waste regulations.' } },
      { '@type': 'Question', name: 'What counties do you cover?', acceptedAnswer: { '@type': 'Answer', text: 'All 47 counties in Kenya including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Meru, Embu, Machakos and all remote locations.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Bin Bags', item: `${SITE}/bin-bags` },
    ],
  },
];

// Color coding data
const colorCodes = [
  { name: 'Black', hex: '#1f2937', use: 'General waste — offices, schools, hospitality, households', tag: 'General', tagBg: 'bg-slate-100', tagText: 'text-slate-600' },
  { name: 'Clear / Transparent', hex: '#f3f4f6', use: 'Recyclables — paper, plastics, cardboard, bottles', tag: 'Recycle', tagBg: 'bg-green-50', tagText: 'text-green-700' },
  { name: 'Green', hex: '#16a34a', use: 'Organic / food waste — kitchens, markets, estates', tag: 'Organic', tagBg: 'bg-green-50', tagText: 'text-green-700' },
  { name: 'Yellow ☣', hex: '#eab308', use: 'Infectious / medical waste — hospitals, clinics, labs', tag: 'Medical', tagBg: 'bg-yellow-50', tagText: 'text-yellow-700' },
  { name: 'Red ☣', hex: '#dc2626', use: 'Highly infectious / sharps container liners', tag: 'High Risk', tagBg: 'bg-red-50', tagText: 'text-red-700' },
  { name: 'Blue', hex: '#2563eb', use: 'Pharmaceutical waste — expired medicines, drug packaging', tag: 'Pharma', tagBg: 'bg-blue-50', tagText: 'text-blue-700' },
  { name: 'Brown', hex: '#92400e', use: 'Chemical / industrial waste — labs, factories', tag: 'Industrial', tagBg: 'bg-amber-50', tagText: 'text-amber-800' },
  { name: 'Orange', hex: '#ea580c', use: 'Anatomical / pathological waste — theatres, mortuaries', tag: 'Anatomical', tagBg: 'bg-orange-50', tagText: 'text-orange-700' },
  { name: 'Purple', hex: '#7c3aed', use: 'Cytotoxic / cytostatic waste — chemotherapy drugs, PPE', tag: 'Cytotoxic', tagBg: 'bg-purple-50', tagText: 'text-purple-700' },
];

const bagSizes = [
  { label: 'Small', title: '10 – 15 Litres', dims: 'Approx. 18×24″ or 20×30″', uses: 'Desk bins, washrooms, clinics for light waste. Ideal for personal workstations and small office bins.' },
  { label: 'Medium', title: '30 Litres', dims: 'Approx. 24×36″', uses: 'Offices, classrooms, hotel rooms. The most common size for standard pedal bins and reception areas.' },
  { label: 'Medium-Large', title: '50 – 60 Litres', dims: '30×36″ or 36×50″', uses: 'Kitchens, hospital wards, corridors, shops. Suits high-traffic areas needing frequent liner changes.' },
  { label: 'Large', title: '80 – 120 Litres', dims: 'Approx. 36×56″', uses: 'Commercial kitchens, large ward areas, loading bays, market stalls, estate management.' },
  { label: 'Extra Large', title: '240 Litres', dims: 'Wheelie-bin liners', uses: 'Wheelie bin liners for estates, factories, public areas. Heavy-duty gauge to resist tearing from heavy loads.' },
  { label: 'Custom', title: 'Custom Sizes', dims: 'Made to your specification', uses: 'Need a non-standard size or gauge? Contact us for bespoke manufacturing. MOQ applies. Quote within 24 hours.', highlight: true },
];

const sectors = [
  '🏥 Healthcare', '🎓 Education', '🏨 Hospitality', '🏢 Corporate & Government',
  '🛒 Retail & Malls', '🏭 Industrial', '🏘️ Residential Estates', '🧹 Cleaning Companies',
];

const steps = [
  { num: '1', title: 'Sector & Waste Streams', desc: 'Tell us your sector and the types of waste you need to segregate.' },
  { num: '2', title: 'Sizes & Usage', desc: 'Share bin sizes/volumes and expected daily usage per location.' },
  { num: '3', title: 'Choose Specifications', desc: 'Select colors, thickness (gauge), and packaging style (rolls or flat packs).' },
  { num: '4', title: 'Receive a Quote', desc: 'Get a tailored quote within 2 hours on business days.' },
  { num: '5', title: 'Delivery', desc: 'Same/next day in Nairobi; 1–3 days countrywide via courier with tracking.' },
];

const guideSteps = [
  { num: '01', title: 'Pick the Correct Color', text: 'Match the bag color to your waste stream. Using incorrect colors risks compliance penalties and cross-contamination.' },
  { num: '02', title: 'Match Size to Bin Volume', text: 'Measure your bin rim diameter and capacity. A bag that\'s too small splits; too large creates overflow hazards.' },
  { num: '03', title: 'Choose Thickness by Load', text: 'Light waste — standard gauge. Heavy or sharp waste — heavy-duty gauge. Medical waste — extra-thick certified liners.' },
  { num: '04', title: 'Select Seal Type', text: 'Star seal for better leak resistance and even load distribution. Flat seal for lighter general waste applications.' },
  { num: '05', title: 'Check Clinical Requirements', text: 'For clinical waste, ensure printed biohazard symbol, correct color and certified thickness. We supply compliant bags.' },
];

const valueAdded = [
  { icon: '📋', text: 'Free site assessment and sizing guide for institutions' },
  { icon: '🖼️', text: 'Staff training posters on color coding and segregation' },
  { icon: '🔁', text: 'Scheduled deliveries and standing orders available' },
  { icon: '⚡', text: 'Emergency same-day dispatch in Nairobi (stock permitting)' },
  { icon: '📦', text: 'Custom bulk packaging — rolls or flat packs of 50–100 bags' },
  { icon: '🏷️', text: 'Custom branding / labelling for large institutional orders' },
];

const faqs = [
  { q: 'Do you deliver upcountry?', a: 'Yes — via courier or our logistics partners. Tracking is provided for all upcountry orders. Delivery is typically 1–3 business days depending on location.' },
  { q: 'What is the minimum order quantity?', a: 'Standard rolls and flat packs are available from 1 roll / 50 bags. For custom sizes or bespoke orders, minimum order quantities apply — please request a quote for details.' },
  { q: 'Do your clinical bags carry the biohazard symbol?', a: 'Yes. Yellow, red, and other clinical-grade bags in our range carry the printed biohazard symbol as required by Kenya\'s healthcare waste regulations.' },
  { q: 'Can I order a mix of colors and sizes?', a: 'Absolutely. Many of our clients — especially hospitals and hotels — order multiple colors and sizes in a single delivery. Just list your requirements and we\'ll quote accordingly.' },
  { q: 'Do you offer standing orders for ongoing supply?', a: 'Yes. We offer scheduled deliveries and standing orders for institutions that need a reliable monthly or weekly supply. Contact us to set up a supply agreement.' },
  { q: 'Are your bags suitable for food waste?', a: 'Yes — green bags in our range are suitable for organic and food waste in line with Kenya\'s color coding standard. We recommend star-seal construction for food waste to prevent leakage.' },
];

// Featured counties for quick links
const FEATURED_SLUGS = ['nairobi', 'mombasa', 'kisumu', 'nakuru', 'uasin-gishu', 'kiambu', 'machakos', 'kajiado', 'meru', 'kilifi'];

export default function BinBagsPage() {
  const featuredCounties = COUNTIES.filter((c: CountyData) => FEATURED_SLUGS.includes(c.slug));

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="sr-only" aria-hidden="true">
        <h1>Color-Coded Bin Bags in Kenya | Bulk Supply Nationwide | Sylvie</h1>
        <p>Kenya's trusted supplier of color-coded bin bags. Durable, leak-proof bags for healthcare, hospitality, education, corporate and public sector. Bulk supply, fast delivery countrywide — from Nairobi to all 47 counties.</p>
      </div>
      <Header />

      {/* HERO */}
      <section className="bg-green-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <nav className="flex justify-center mb-6">
            <ol className="flex items-center gap-2 text-xs text-green-300">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li className="text-green-100 font-semibold">Bin Bags</li>
            </ol>
          </nav>
          <span className="inline-block bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Kenya's Trusted Bin Bag Supplier
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Color-Coded Bin Bags for<br className="hidden md:block" /> Every Sector in Kenya
          </h1>
          <p className="text-green-200 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Durable, leak-proof, and compliant with Kenya's color coding standards. Bulk supply, fast delivery countrywide — from Nairobi to all 47 counties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">
              Get a Free Quote Today
            </a>
            <a
              href="https://wa.me/254711515752?text=Hi, I need bin bags"
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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['✓ National Delivery', '✓ Color Coding Compliant', '✓ Heavy-Duty Gauges', '✓ Star Seal Leak Resistance', '✓ Same Day Delivery Nairobi'].map((b) => (
              <span key={b} className="bg-white/10 border border-white/20 text-green-100 text-xs font-semibold px-3 py-1.5 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {[
            { n: '9', l: 'Color Codes' },
            { n: '4', l: 'Size Ranges' },
            { n: '47', l: 'Counties Served' },
            { n: 'KSh 12+', l: 'Per Bag From' },
          ].map((s) => (
            <div key={s.l} className="text-center px-4 py-2">
              <div className="text-xl font-bold text-green-800" style={{ fontFamily: "'Fraunces', serif" }}>
                {s.n}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Why Choose Us</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                Kenya's Trusted Bin Bag Supplier
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                We are a Kenyan supplier and manufacturer of color-coded bin bags serving healthcare, hospitality, education, corporate, and public sector clients. Our focus is consistent quality, compliance, and dependable delivery nationwide.
              </p>
              <div className="space-y-4">
                {[
                  ['National Delivery', 'Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and beyond — countrywide coverage.'],
                  ['Consistent Quality', 'Heavy-duty gauges, strong seams, leak-resistant liners for all waste streams.'],
                  ['Full Range of Sizes', 'From small 10L desk-bin liners to extra-large 240L wheelie-bin bags.'],
                  ['Color Coding Compliance', 'Medical, hospitality, office, and municipal waste streams covered.'],
                  ['Reliable Lead Times', 'Same free day delivery for orders within Nairobi (stock permitting).'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Our Commitment</h3>
                <div className="space-y-3">
                  {[
                    ['Compliance First', 'All bags meet Kenyan color-coding standards for waste segregation.'],
                    ['Environment', 'Supporting proper waste streams reduces landfill contamination.'],
                    ['Safety', 'Clinical and hazardous waste bags meet biohazard marking requirements.'],
                    ['Reliability', 'Consistent stock availability and fast dispatch — no supply surprises.'],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900">{title}: </span>
                        <span className="text-slate-600">{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Our Credentials</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {['Registered Kenyan business', 'Biohazard-compliant clinical bag range', 'Bulk orders for institutions and government', 'Standing order & scheduled delivery available'].map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
                <a href="tel:+254711515752" className="mt-4 block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  Call: 0711 515 752
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLOR CODES */}
      <section className="py-16 bg-slate-50" id="colors">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Kenya Color Coding Standard</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Color Codes in Kenya
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Every bin bag color has a designated waste stream. Using the correct color is a legal and health requirement for many sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {colorCodes.map((color) => (
              <div key={color.name} className="bg-white border border-slate-200 rounded-xl p-4 text-center transition-all hover:shadow-md">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 border-2 border-slate-200" style={{ backgroundColor: color.hex }} />
                <p className="font-bold text-slate-800 text-sm">{color.name}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{color.use}</p>
                <span className={`inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${color.tagBg} ${color.tagText}`}>
                  {color.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIZES */}
      <section className="py-16 bg-white" id="sizes">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Available Sizes</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Sizes & Recommended Use
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Match the bag to your bin volume and rim diameter for a proper fit.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bagSizes.map((size) => (
              <div
                key={size.title}
                className={`border rounded-xl p-6 transition-all ${size.highlight ? 'bg-green-50 border-green-300' : 'bg-white border-slate-200 hover:border-green-300'}`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-green-600 mb-1">{size.label}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-1" style={{ fontFamily: "'Fraunces', serif" }}>{size.title}</h3>
                <p className="text-xs text-slate-400 mb-3">{size.dims}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{size.uses}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUYER'S GUIDE */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Buyer's Guide</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              How to Choose the Right Bin Bag
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Five steps to selecting the correct bag for your waste stream, facility and volume.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guideSteps.map((step) => (
              <div key={step.num} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="text-3xl font-bold text-green-100 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>{step.num}</div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.text}</p>
              </div>
            ))}
            <div className="bg-green-800 border border-green-700 rounded-xl p-5 text-white">
              <div className="text-3xl font-bold text-white/20 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>?</div>
              <h3 className="font-bold text-white text-sm mb-1">Not sure? Ask us.</h3>
              <p className="text-xs text-green-200 leading-relaxed">We offer a free site assessment and sizing guide for institutions. Call 0711 515 752 or WhatsApp for fast advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Who We Serve</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Sectors We Supply</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectors.map((sector) => (
              <div key={sector} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-center hover:border-green-300 hover:bg-green-50 transition-all">
                <p className="text-slate-700 font-semibold text-sm">{sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">The Process</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>How to Order</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-green-800 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1" style={{ fontFamily: "'Fraunces', serif" }}>{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE ADDED */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Extra Value</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Value-Added Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {valueAdded.map((item) => (
              <div key={item.text} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-base flex-shrink-0">{item.icon}</div>
                <span className="text-sm font-semibold text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Pricing</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Transparent Pricing</h2>
          </div>
          <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-8 text-center text-white">
            <div className="text-xs text-green-300 uppercase tracking-wider mb-2">Starting from</div>
            <div className="text-5xl font-bold mb-1" style={{ fontFamily: "'Fraunces', serif" }}>KSh 12</div>
            <div className="text-sm text-green-200 mb-5">per bin bag</div>
            <p className="text-sm text-green-200 mb-6">Indicative pricing — volume, gauge and color affect the final rate. Request a quote for current pricing on your specific order.</p>
            <a href="#quote" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all">
              Get My Custom Quote
            </a>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">Standard packaging: rolls of 1–50 bags or flat packs of 50–100 bags. Minimum order quantities apply for bespoke sizes.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={faq.q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden" open={idx === 0}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-green-50 transition-colors list-none">
                  <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

{/* COUNTY GRID */}
<section className="py-16 bg-slate-50" id="counties">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
    <div className="text-center mb-10">
      <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Nationwide Coverage</p>
      <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
        We Deliver to All 47 Counties in Kenya
      </h2>
      <p className="text-slate-500 mt-3 max-w-xl mx-auto">
        Fast, reliable bin bag delivery to every county — from Nairobi to remote locations.
      </p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
      {COUNTIES.filter(c => FEATURED_SLUGS.includes(c.slug)).map((county: CountyData) => (
        <Link
          key={county.slug}
          href={`/bin-bags/${county.slug}`}
          className="bg-white border border-slate-200 hover:border-green-400 hover:bg-green-50 rounded-xl px-4 py-4 transition-all group"
        >
          <p className="font-bold text-slate-900 text-sm group-hover:text-green-800">{county.name} County</p>
          <p className="text-xs text-slate-500 mt-0.5">{county.majorTowns.slice(0, 2).join(', ')}</p>
          <p className="text-xs text-green-600 font-semibold mt-1">{county.responseTime} →</p>
        </Link>
      ))}
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">All 47 Counties — Click to View Local Page</p>
      <div className="flex flex-wrap gap-2">
        {COUNTIES.map((county: CountyData) => (
          <Link
            key={county.slug}
            href={`/bin-bags/${county.slug}`}
            className="text-xs font-medium text-slate-600 hover:text-green-700 bg-slate-50 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-all border border-slate-200 hover:border-green-300"
          >
            {county.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>



      {/* QUOTE FORM */}
      <section className="py-16 bg-white" id="quote">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Get Started</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Request a Free Quote</h2>
            <p className="text-slate-500 mt-3">We respond within 2 hours on business days with pricing tailored to your exact requirements.</p>
          </div>
          <Suspense fallback={<div className="h-96 bg-slate-50 rounded-2xl border border-slate-200 animate-pulse" />}>
            <BinBagQuoteForm />
          </Suspense>
          <p className="text-center text-xs text-slate-400 mt-4">
            Or call us directly: <a href="tel:+254711515752" className="text-green-700 font-bold">0711 515 752</a>
          </p>
        </div>
      </section>

      
      {/* SEO TEXT */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-slate-500 text-sm leading-relaxed">
          <p>
            Looking for <strong>color-coded bin bags in Kenya</strong>? Sylvie Waste and Garbage Collection Limited supplies <strong>bin bags in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret</strong> and all 47 counties nationwide. Our range covers black general waste bags, yellow medical waste bags, green organic bags, clear recyclable bags, red clinical bags and more — compliant with Kenya's waste segregation standards. Bulk orders welcome. <strong>Same-day delivery in Nairobi</strong> for in-stock items.
          </p>
        </div>
      </section>


      <Footer />
    </div>
  );
}