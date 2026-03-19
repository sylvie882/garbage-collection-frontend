import Carousel from '../components/Carousel';
import Link from 'next/link';
import { Service } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import FloatingButtons from '../components/FloatingButtons';
import CookieConsent from '../components/CookieConsent';
import FaqSection from '@/components/FaqSection';

async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch('https://api.sylviegarbagecollection.co.ke/api/services', { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

export const metadata = {
  title: 'Sylvie Garbage Collection | Professional Waste Management Kenya',
  description: "Kenya's premier digital waste management company serving Nairobi, Nakuru, Narok, Laikipia and 500+ locations.",
  openGraph: { title: 'Sylvie Garbage Collection', description: 'Digital waste management solutions across Kenya.', type: 'website', locale: 'en_KE' },
};

const seoLocations = {
  nairobi: ['The New Horse Shoe Village','Barton Estate','Whispers Estate','Migaa Golf Estate','Daisy Road','Tara Road','Fairview Estate','Riverrun Estates','Amani Ridge'],
  nakuru: ['Milimani Estate','Kiamunyi Estate','Naka Estate','Ngata Estate','Section 58 Estate','Villa View Estate'],
  narok: ['Kilgoris','Emurua Dikirr','Narok North','Narok East','Narok West','Narok South'],
  laikipia: ['Laikipia West','Laikipia East','Laikipia North','Nanyuki','Dol Dol','Rumuruti'],
};

export default async function Home() {
  const services = await getServices();
  const displayedServices = services.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="sr-only" aria-hidden="true">
        <h1>Sylvie Garbage Collection - Professional Waste Management Kenya</h1>
        {Object.entries(seoLocations).map(([county, locs]) => (
          <p key={county}>{county}: {locs.join(', ')}</p>
        ))}
      </div>

      <Header />

      {/* Hero Carousel */}
      <section className="w-full pt-0">
        <Carousel />
      </section>

      {/* Stats strip */}
      <div className="bg-green-800">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-green-700">
          {[
            { n: '500+', l: 'Locations Served' },
            { n: '1,000+', l: 'Happy Clients' },
            { n: '24/7', l: 'Support' },
            { n: '100%', l: 'Eco-Friendly' },
          ].map((s) => (
            <div key={s.l} className="text-center px-4 py-1">
              <div className="text-xl font-bold text-white" style={{ fontFamily: "'Fraunces', serif" }}>{s.n}</div>
              <div className="text-xs text-green-200 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Why Choose Sylvie</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
              The Smart Choice for <span className="text-green-700">Waste Management</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">Kenya's premier digital waste management company providing modern solutions for homes and businesses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Digital First', desc: 'Schedule pickups, view invoices and make payments through our smart platform.', bg: 'bg-blue-50', ring: 'ring-blue-100' },
              { title: 'Eco-Friendly', desc: 'Committed to 100% recycling and sustainable disposal across all service areas.', bg: 'bg-green-50', ring: 'ring-green-100' },
              { title: '24/7 Support', desc: 'Round-the-clock customer support for all your waste management needs.', bg: 'bg-orange-50', ring: 'ring-orange-100' },
              { title: 'Wide Coverage', desc: '500+ locations across Nairobi, Nakuru, Narok and Laikipia counties.', bg: 'bg-purple-50', ring: 'ring-purple-100' },
              { title: 'Transparent Pricing', desc: 'Competitive rates with no hidden charges for residential and commercial clients.', bg: 'bg-teal-50', ring: 'ring-teal-100' },
              { title: 'Certified Team', desc: 'Trained professionals ensuring safe, compliant waste handling every time.', bg: 'bg-amber-50', ring: 'ring-amber-100' },
            ].map((f, i) => (
              <div key={i} className={`${f.bg} ring-1 ${f.ring} rounded-2xl p-7 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
                <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Fraunces', serif" }}>{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Our Services</p>
              <h2 className="text-4xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Professional <span className="text-green-700">Solutions</span></h2>
            </div>
            <Link href="/services" className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1 group">
              View all services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          {displayedServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedServices.map((service) => (
                <div key={service.id} className="hover:-translate-y-1 transition-all duration-300">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 mb-6">Our service catalog is being updated. Check back soon.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-800 transition-colors">Contact Our Team</Link>
            </div>
          )}
        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Service Coverage</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Serving <span className="text-green-700">All Kenya</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto">Comprehensive waste management across multiple counties with reliable local teams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { county: 'Nairobi County', areas: '500+ locations', icon: '🏙️', href: '/services/nairobi', color: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' },
              { county: 'Nakuru County', areas: '30+ locations', icon: '🏔️', href: '/services/nakuru', color: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50' },
              { county: 'Narok County', areas: '6 major areas', icon: '🦁', href: '/services/narok', color: 'border-orange-200 hover:border-orange-400 hover:bg-orange-50' },
              { county: 'Laikipia County', areas: '6 key locations', icon: '🏞️', href: '/services/laikipia', color: 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50' },
            ].map((c, i) => (
              <Link key={i} href={c.href} className={`group border-2 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${c.color} bg-white`}>
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1 text-base group-hover:text-green-800 transition-colors" style={{ fontFamily: "'Fraunces', serif" }}>{c.county}</h3>
                <p className="text-sm text-green-600 font-semibold">{c.areas}</p>
              </Link>
            ))}
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-7 text-center">
            <p className="text-slate-600 text-sm mb-4">Not sure if we serve your area? Contact us — we are constantly expanding.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors">Contact Us</Link>
              <Link href="/quote" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">Get Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* CTA */}
      <section className="py-24 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Fraunces', serif" }}>Ready to Get Started?</h2>
          <p className="text-green-200 text-lg mb-10 leading-relaxed">Join hundreds of satisfied clients across Kenya who trust Sylvie for clean, reliable, eco-friendly waste management.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl text-base">Get Free Quote</Link>
            <Link href="/contact" className="bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">Contact Us</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 justify-center text-green-300 text-sm">
            {['Free Quote','No Hidden Charges','24/7 Support','Eco-Friendly'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><span className="text-green-400">✓</span>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
}
