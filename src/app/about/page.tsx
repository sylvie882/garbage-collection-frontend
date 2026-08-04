import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Sylvie Garbage Collection | Waste Management Experts Kenya',
  description: "Learn about Sylvie Garbage Collection — Nairobi's leading waste management company. 100% recycling commitment since 2020.",
};

const structuredData = {
  '@context': 'https://schema.org','@type': 'Organization','name': 'Sylvie Garbage Collection',
  'url': 'https://www.sylviegarbagecollection.co.ke/about','foundingDate': '2020',
  'areaServed': ['Nairobi','Nakuru','Narok','Laikipia'],
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="sr-only" aria-hidden="true"><h1>About Sylvie Garbage Collection - Waste Management Experts Kenya</h1></div>

      <Header />

      {/* Page Header */}
      <section className="bg-green-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-3">Who We Are</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>About Sylvie Garbage Collection</h1>
          <p className="text-green-200 text-lg leading-relaxed max-w-2xl mx-auto">Kenya's leading digital waste management company providing eco-friendly solutions for homes and businesses since 2020.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>Professional Garbage Collection Across Kenya</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Sylvie Garbage Collection is a leading company in the waste management field, providing specific solutions for every customer. With extensive experience in residential and industrial waste management, we offer expert services that remove responsibility from waste-generating companies through our 100% recycling commitment.</p>
              <p className="text-slate-600 leading-relaxed mb-8">Our staff are responsible, qualified, fully trained and inducted at every site. Stringent employment and medical checks are in place for all staff including cleaners, supervisors, team leaders and managers.</p>
              <div className="grid grid-cols-2 gap-3">
                {['Residential Garbage Collection','Commercial Waste Management','Industrial Waste Disposal','Recycling Programs','Pest Control Services','Cleaning & Sanitation'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Fraunces', serif" }}>Why Choose Sylvie?</h3>
              <div className="space-y-4">
                {[
                  ['Experienced & Qualified Staff','Trained professionals with full H&S compliance'],
                  ['100% Recycling Commitment','Maximum diversion from landfill'],
                  ['Health & Safety Compliant','Rigorous checks for all team members'],
                  ['Eco-Friendly Solutions','Sustainable methods protecting the environment'],
                  ['Affordable Pricing','Competitive rates with flexible plans'],
                  ['Multiple County Coverage','Nairobi, Nakuru, Narok & Laikipia'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div><p className="font-semibold text-slate-900 text-sm">{title}</p><p className="text-slate-500 text-xs mt-0.5">{desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Commitment */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Sustainability</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Our Environmental Commitment</h2>
            <p className="text-slate-500 leading-relaxed">At Sylvie Garbage Collection, we strive to conserve precious resources by focusing on waste reduction and the sorting and transportation of recyclables to recovery facilities. We hope to achieve zero waste to landfill while keeping costs low for our valued customers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '100% Recycling', desc: 'Committed to maximum recycling and minimal landfill use across all service areas.' },
              { title: 'Eco-Friendly Methods', desc: 'Sustainable waste management practices that protect Kenya\'s environment.' },
              { title: 'Fully Certified', desc: 'Licensed and compliant with all Kenyan environmental regulations.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 text-center hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-5 h-5 bg-green-600 rounded-full" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Our Foundation</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Vision, Mission & Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Vision', title: 'Innovate for Impact', body: 'To become a highly innovative and sought-after waste management solution provider in Kenya and beyond, recognized for our commitment to environmental sustainability.' },
              { label: 'Mission', title: 'Clean Environments', body: 'To help our clients maintain clean, healthy environments through efficient waste management solutions that cut unnecessary costs and improve efficiency.' },
              { label: 'Values', title: 'Excellence Always', body: 'We are committed to excellence, reliability, innovation, professionalism and integrity. We do what we say — and we do it well the first time.' },
            ].map((v, i) => (
              <div key={i} className={`rounded-2xl p-8 border ${i === 1 ? 'bg-green-800 border-green-700 text-white' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${i === 1 ? 'text-green-300' : 'text-green-600'}`}>{v.label}</p>
                <h3 className={`text-xl font-bold mb-3 ${i === 1 ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: "'Fraunces', serif" }}>{v.title}</h3>
                <p className={`text-sm leading-relaxed ${i === 1 ? 'text-green-200' : 'text-slate-500'}`}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Ready for Professional Waste Management?</h2>
          <p className="text-green-200 mb-8">Join hundreds of satisfied customers across Kenya who trust Sylvie.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all">Contact Us Today</Link>
            <Link href="/services" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all">View Services</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
