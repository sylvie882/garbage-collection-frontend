import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Laikipia Garbage Collection Services | Sylvie Waste Management',
  description: 'Professional garbage collection and waste management services in Laikipia County. Reliable, eco-friendly solutions for homes and businesses.',
};

const locations = [Laikipia West, Laikipia East, Laikipia North, Nanyuki Town, Dol Dol, Rumuruti, Nyahururu, Ol Pejeta, Naro Moru, Mukogodo].map(l => l.trim());

export default function LaikipiaServices() {
  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      <section className="bg-green-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-3">Laikipia County</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Laikipia Garbage Collection Services
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Professional waste management solutions serving 6 key locations locations across Laikipia County. Reliable, eco-friendly collection for homes and businesses.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Coverage</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Service Areas in <span className="text-green-700">Laikipia</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {locations.map((location, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-200 rounded-xl transition-all">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                <span className="text-slate-700 text-sm font-medium">{location}</span>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-7 text-center">
            <p className="text-slate-600 text-sm mb-4">Don't see your area? We likely still serve your location — contact us to confirm.</p>
            <Link href="/contact" className="bg-green-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors inline-block">Confirm Your Area</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Our Services</p>
            <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>
              Laikipia Waste Management Solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Residential Collection', desc: 'Regular garbage pickup for homes and apartments' },
              { title: 'Commercial Services', desc: 'Waste solutions for businesses and offices' },
              { title: 'Recycling Programs', desc: 'Eco-friendly sorting and recycling services' },
              { title: 'Bulk Waste Removal', desc: 'Large item and construction waste disposal' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-4 h-4 bg-green-600 rounded-full" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm" style={{ fontFamily: "'Fraunces', serif" }}>{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Ready for Reliable Waste Management in Laikipia?
          </h2>
          <p className="text-green-200 mb-8">Join hundreds of clients who trust Sylvie for clean, eco-friendly waste collection.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all">Get Free Quote</Link>
            <Link href="/contact" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
