import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SanitaryBinQuoteForm from '@/components/SanitaryBinQuoteForm';
import { COUNTIES } from '@/lib/counties';

const SITE = 'https://www.sylviegarbagecollection.co.ke';

export const metadata: Metadata = {
  title: 'Sanitary Bin Services in Kenya | Pedal & Automatic Bins | Sylvie',
  description: 'Professional sanitary bin rental and servicing across all 47 counties in Kenya. Pedal and automatic bins for offices, schools, hospitals, hotels and factories. Discreet, compliant, eco-friendly. Get a free quote today.',
  keywords: 'sanitary bin services Kenya, sanitary bin rental Kenya, feminine hygiene bins Kenya, pedal sanitary bins Kenya, automatic sanitary bins Kenya, washroom services Nairobi, sanitary bin Mombasa, sanitary bin Kisumu, sanitary bin Nakuru, waste disposal certificates Kenya',
  openGraph: {
    title: 'Sanitary Bin Services Across All 47 Counties in Kenya | Sylvie',
    description: 'Supply, rental and scheduled servicing of pedal and automatic sanitary bins for offices, schools, hospitals, hotels and factories across Kenya.',
    url: `${SITE}/sanitary-bins`,
    type: 'website',
    locale: 'en_KE',
  },
  alternates: { canonical: `${SITE}/sanitary-bins` },
  robots: { index: true, follow: true },
};

const schemas = [
  {
    '@context': 'https://schema.org','@type': 'LocalBusiness',
    name: 'Sylvie Waste and Garbage Collection Limited',
    url: SITE, telephone: '+254711515752',
    email: 'sylviegarbagecollection@gmail.com',
    address: { '@type': 'PostalAddress', streetAddress: 'Dale House, Fox Close Off Rhapta Road', addressLocality: 'Westlands', addressRegion: 'Nairobi', addressCountry: 'KE' },
    areaServed: { '@type': 'Country', name: 'Kenya' },
    openingHours: 'Mo-Sa 08:00-18:00',
  },
  {
    '@context': 'https://schema.org','@type': 'Service',
    name: 'Sanitary Bin Rental and Servicing Kenya',
    description: 'Professional sanitary bin supply, rental and scheduled servicing across all 47 counties in Kenya.',
    provider: { '@type': 'Organization', name: 'Sylvie Waste and Garbage Collection Limited', url: SITE },
    areaServed: { '@type': 'Country', name: 'Kenya' },
    serviceType: 'Sanitary Bin Rental and Servicing',
  },
  {
    '@context': 'https://schema.org','@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How many sanitary bins do I need?', acceptedAnswer: { '@type': 'Answer', text: 'Typically one bin per female washroom cubicle. High-traffic sites may need larger capacity or more frequent servicing.' } },
      { '@type': 'Question', name: 'Do you provide disposal certificates?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we issue waste transfer notes and disposal certificates after every service cycle.' } },
      { '@type': 'Question', name: 'What counties do you cover?', acceptedAnswer: { '@type': 'Answer', text: 'All 47 counties in Kenya including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Meru, Embu, Machakos and all remote locations.' } },
      { '@type': 'Question', name: 'How often do you service?', acceptedAnswer: { '@type': 'Answer', text: 'Weekly, bi-weekly or monthly — we recommend a schedule based on footfall and industry.' } },
      { '@type': 'Question', name: 'Are the bins odour-free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our bins use antimicrobial liners and deodorising cartridges to control odours and bacteria.' } },
      { '@type': 'Question', name: 'Can you handle multi-branch organisations?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — we manage national rollouts, central billing and SLA reporting.' } },
    ],
  },
  {
    '@context': 'https://schema.org','@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Sanitary Bin Services', item: `${SITE}/sanitary-bins` },
    ],
  },
];

const FEATURED_SLUGS = ['nairobi','mombasa','kisumu','nakuru','uasin-gishu','kiambu','machakos','kajiado','meru','kilifi','kisii','kakamega'];

export default function SanitaryBinsPage() {
  const featured = COUNTIES.filter(c => FEATURED_SLUGS.includes(c.slug));

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <div className="sr-only" aria-hidden="true">
        <h1>Sanitary Bin Services in Kenya — All 47 Counties</h1>
        <p>Professional sanitary bin rental and servicing across Kenya. Pedal and automatic sanitary bins for offices, schools, hospitals, hotels, malls and factories. Waste disposal certificates provided. Serving {COUNTIES.map(c => c.name).join(', ')}.</p>
      </div>
      <Header />

      {/* HERO */}
      <section className="bg-green-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <nav className="flex justify-center mb-6"><ol className="flex items-center gap-2 text-xs text-green-300"><li><Link href="/" className="hover:text-white">Home</Link></li><li>/</li><li className="text-green-100 font-semibold">Sanitary Bin Services</li></ol></nav>
          <span className="inline-block bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">All 47 Counties in Kenya</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Hygienic, Compliant Sanitary Bin<br className="hidden md:block" /> Services Across Kenya
          </h1>
          <p className="text-green-200 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            We supply, rent and service pedal and automatic sanitary bins for offices, schools, hospitals, malls, hotels and factories — on-time, discreet and compliant with Kenyan hygiene standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">Get a Free Quote Today</a>
            <a href="https://wa.me/254711515752?text=Hi, I need sanitary bin services" target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['All 47 Counties Covered','Disposal Certificates Issued','Discreet Female Hygiene','Eco-Conscious Disposal','PPE-Compliant Teams'].map(b => (
              <span key={b} className="bg-white/10 border border-white/20 text-green-100 text-xs font-semibold px-3 py-1.5 rounded-full">✓ {b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {[{n:'47',l:'Counties Covered'},{n:'2',l:'Bin Options'},{n:'3',l:'Service Frequencies'},{n:'100%',l:'Eco-Friendly Disposal'}].map(s => (
            <div key={s.l} className="text-center px-4 py-2">
              <div className="text-xl font-bold text-green-800" style={{ fontFamily: "'Fraunces', serif" }}>{s.n}</div>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>Kenya's Trusted Sanitary Bin Rental Partner</h2>
              <p className="text-slate-600 leading-relaxed mb-5">We provide professional sanitary bin rental and servicing in every county in Kenya. Our pedal and automatic sanitary bins offer safe, discreet disposal of feminine hygiene waste — helping your business stay compliant, clean and welcoming.</p>
              <div className="space-y-4">
                {[
                  ['Nationwide Reach','Deliveries and servicing in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret and all 47 counties.'],
                  ['Two Bin Options','Contactless automatic bins or hands-free pedal bins to fit your budget and hygiene goals.'],
                  ['Regular Servicing','Weekly, bi-weekly or monthly servicing to match foot traffic and your schedule.'],
                  ['Compliance & Documentation','Waste transfer notes and disposal certificates after every service visit.'],
                  ['Discreet, Odour-Free','Antimicrobial liners and deodorising cartridges between service visits.'],
                  ['Transparent Pricing','Simple rental + service fee. No hidden charges ever.'],
                ].map(([t,d]) => (
                  <div key={t} className="flex gap-3">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg></div>
                    <div><p className="font-semibold text-slate-900 text-sm">{t}</p><p className="text-slate-500 text-xs mt-0.5">{d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Our Commitment</h3>
                <div className="space-y-3">
                  {[['Hygiene First','Contactless or hands-free options reduce cross-contamination.'],['People & Dignity','Female hygiene supported with privacy and respect.'],['Environment','Approved disposal routes and minimal plastic waste.'],['Compliance','Adherence to local public health and environmental regulations.']].map(([t,d]) => (
                    <div key={t} className="flex gap-2 text-sm"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"/><div><span className="font-semibold text-slate-900">{t}: </span><span className="text-slate-600">{d}</span></div></div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Our Credentials</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {['Registered Kenyan business','Trained technicians','PPE-compliant service teams','Licensed waste disposal partners'].map(c => (
                    <li key={c} className="flex items-center gap-2"><span className="text-green-400">✓</span>{c}</li>
                  ))}
                </ul>
                <a href="tel:+254711515752" className="mt-4 block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">Call: 0711 515 752</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIN TYPES */}
      <section className="py-16 bg-slate-50" id="bins">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Our Products</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Choose Your Sanitary Bin</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Both options include delivery, installation, servicing, liner replacement and disposal certificates.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { type:'Pedal Sanitary Bin', subtitle:'Hands-Free — Best Value', tag:'Most Popular', tagColor:'bg-green-100 text-green-800', desc:'Durable, slim design fits most washroom cubicles. Cost-effective compliance for offices, schools and SMEs.', features:['Hands-free foot pedal operation','Antimicrobial liners included','Scented deodorising cartridges','Slim design — fits all cubicles','15L or 20L capacity','Best for cost-effective compliance'], border:'border-green-500', cta:'?bin=pedal' },
              { type:'Automatic Sanitary Bin', subtitle:'Sensor-Activated — Premium Hygiene', tag:'Premium', tagColor:'bg-orange-100 text-orange-800', desc:'Contactless sensor-activated bin for maximum hygiene. Premium look for hospitals, hotels and high-end facilities.', features:['Contactless sensor lid','Zero hand contact','Advanced odour control','Premium finish','Ideal for hospitals & hotels','Impresses clients and visitors'], border:'border-orange-400', cta:'?bin=automatic' },
            ].map(bin => (
              <div key={bin.type} className={`bg-white rounded-2xl border-2 ${bin.border} p-7 flex flex-col`}>
                <div className="flex items-start justify-between mb-4">
                  <div><h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>{bin.type}</h3><p className="text-slate-500 text-sm mt-0.5">{bin.subtitle}</p></div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${bin.tagColor}`}>{bin.tag}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{bin.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {bin.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"><svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg></div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/sanitary-bins/quote${bin.cta}`} className="block w-full bg-green-700 hover:bg-green-800 text-white text-center font-bold py-3 rounded-xl text-sm transition-colors">
                  Get Quote for {bin.type.split(' ')[0]} Bin
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">The Process</p><h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>How It Works</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{n:'1',t:'Site Assessment',d:'Free assessment to choose bin type, capacity and service frequency.'},{n:'2',t:'Delivery & Installation',d:'Nationwide delivery and professional setup by trained technicians.'},{n:'3',t:'Scheduled Servicing',d:'On-time liner replacement, cleaning and certified waste removal.'},{n:'4',t:'Ongoing Support',d:'Responsive customer service, emergency call-outs and replacement guarantees.'}].map(s => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 bg-green-800 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{ fontFamily: "'Fraunces', serif" }}>{s.n}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>{s.t}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10"><p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Industries We Serve</p><h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Trusted by Every Industry</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Offices & Corporate Buildings','Schools, Colleges & Universities','Hospitals & Clinics','Hotels, Restaurants & Malls','Manufacturing & Warehouses','Government & NGOs','Gyms & Co-Working Spaces','Events & Temporary Sites'].map(i => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl px-4 py-4 text-center hover:border-green-300 hover:bg-green-50 transition-all"><p className="text-slate-700 font-semibold text-sm">{i}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTY GRID */}
      <section className="py-16 bg-white" id="counties">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Nationwide Coverage</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>We Serve All 47 Counties in Kenya</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Click your county to see local details, towns covered and get a county-specific quote.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {featured.map(county => (
              <Link key={county.slug} href={`/sanitary-bins/${county.slug}`}
                className="bg-slate-50 border border-slate-200 hover:border-green-400 hover:bg-green-50 rounded-xl px-4 py-4 transition-all group">
                <p className="font-bold text-slate-900 text-sm group-hover:text-green-800">{county.name} County</p>
                <p className="text-xs text-slate-500 mt-0.5">{county.majorTowns.slice(0,2).join(', ')}</p>
                <p className="text-xs text-green-600 font-semibold mt-1">{county.responseTime} →</p>
              </Link>
            ))}
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">All 47 Counties — Click to View Local Page</p>
            <div className="flex flex-wrap gap-2">
              {COUNTIES.map(county => (
                <Link key={county.slug} href={`/sanitary-bins/${county.slug}`}
                  className="text-xs font-medium text-slate-600 hover:text-green-700 bg-white hover:bg-green-50 px-3 py-1.5 rounded-lg transition-all border border-slate-200 hover:border-green-300">
                  {county.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="sr-only"><p>Sanitary bin services in: {COUNTIES.map(c => `${c.name} (${c.majorTowns.join(', ')})`).join(' · ')}</p></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10"><p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">FAQ</p><h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Common Questions</h2></div>
          <div className="space-y-3">
            {[
              {q:'How many sanitary bins do I need?',a:'Typically one bin per female washroom cubicle. High-traffic sites such as hospitals or malls may need larger capacity or more frequent servicing.'},
              {q:'Do you provide disposal certificates?',a:'Yes — we issue waste transfer notes and disposal certificates after every service cycle to keep your business compliant.'},
              {q:'How often do you service the bins?',a:'We offer weekly, bi-weekly or monthly servicing. We recommend a schedule based on foot traffic, facility type and budget.'},
              {q:'What counties do you cover?',a:'All 47 counties in Kenya — including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Meru, Embu, Machakos and all remote locations.'},
              {q:'Are the bins discreet and odour-free?',a:'Yes. Our bins use antimicrobial liners and deodorising cartridges to control odours and bacteria between service visits.'},
              {q:'Can you handle multi-branch organisations?',a:'Yes. We manage national rollouts, central billing and SLA reporting for organisations with multiple sites.'},
              {q:'What is the difference between pedal and automatic bins?',a:'Pedal bins are hands-free and cost-effective — great for offices and schools. Automatic sensor bins are contactless and premium, ideal for hospitals and high-end facilities.'},
              {q:'What contract terms do you offer?',a:'Flexible terms from 3 to 24 months. Our 12-month contract offers best value including a free first servicing visit.'},
            ].map(({q,a}) => (
              <details key={q} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
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
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Request a Free Site Survey &amp; Quote</h2>
            <p className="text-slate-500 mt-3">We respond within 24 hours with accurate pricing for your specific site.</p>
          </div>
          <Suspense fallback={<div className="h-96 bg-white rounded-2xl border border-slate-200 animate-pulse" />}>
            <SanitaryBinQuoteForm />
          </Suspense>
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-slate-500 text-sm leading-relaxed">
          <p>Looking for <strong>sanitary bin services in Kenya</strong>? Sylvie Waste and Garbage Collection Limited offers <strong>sanitary bin rental</strong>, feminine hygiene bins and washroom servicing in{' '}
            {['nairobi','mombasa','kisumu','nakuru','uasin-gishu','kiambu','nyeri','meru','embu','machakos'].map((slug, i, arr) => {
              const c = COUNTIES.find(x => x.slug === slug);
              if (!c) return null;
              return <span key={slug}><Link href={`/sanitary-bins/${slug}`} className="text-green-700 hover:underline">{c.name}</Link>{i < arr.length - 1 ? ', ' : ''}</span>;
            })} and every county nationwide. Choose <strong>pedal sanitary bins</strong> or <strong>automatic sanitary bins</strong> with scheduled service visits and proper <strong>waste disposal certificates</strong>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
