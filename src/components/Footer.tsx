import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' },
    { name: 'Free Quote', href: '/quote' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
  ];

  const structuredData = {
    '@context': 'https://schema.org','@type': 'Organization','name': 'Sylvie Garbage Collection',
    'url': 'https://sylviegarbagecollection.co.ke','telephone': '+254-711-515752',
    'email': 'sylviegarbagecollection@gmail.com',
    'address': { '@type': 'PostalAddress','streetAddress': 'Dale House, Fox Close Off Rhapta Road','addressLocality': 'Westlands','addressRegion': 'Nairobi','addressCountry': 'KE' },
    'openingHours': ['Mo-Su 00:00-23:59'],
  };

  return (
    <footer className="bg-slate-900 text-slate-300" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="sr-only" aria-hidden="true">
        <h1>Sylvie Garbage Collection - Professional Waste Management Kenya</h1>
        <p>Kenya's leading digital waste management company providing garbage collection, recycling and cleaning services across Nairobi, Nakuru, Narok and Laikipia.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden bg-green-900 border border-green-800">
                <Image src="/logo.jpeg" alt="Sylvie Garbage Collection" fill className="object-contain p-1" />
              </div>
              <div>
                <p className="font-bold text-white text-sm" style={{ fontFamily: "'Fraunces', serif" }}>Sylvie Garbage Collection</p>
                <p className="text-xs text-slate-500">Professional Waste Management</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">Kenya's leading digital waste management company. Eco-friendly, reliable and always on time across 500+ locations.</p>
            <div className="flex flex-wrap gap-2">
              {['Nairobi','Nakuru','Narok','Laikipia'].map(c => (
                <span key={c} className="text-xs bg-green-900/50 text-green-300 border border-green-800 px-2.5 py-1 rounded-lg">{c}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navigation.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Our Expertise</h4>
            <ul className="space-y-2.5">
              {['Residential Collection','Commercial Waste','Recycling Programs','Pest Control','Cleaning Services','Bulk Removal'].map(s => (
                <li key={s} className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-1 h-1 bg-green-500 rounded-full flex-shrink-0" />{s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Address</p>
                <p className="text-sm text-slate-300">Dale House, Fox Cl Off Rhapta Rd<br />Westlands, Nairobi, Kenya</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                <a href="tel:+254711515752" className="text-sm font-semibold text-white hover:text-green-400 transition-colors">+254 711 515 752</a>
                <span className="ml-2 text-xs bg-orange-600 text-white px-1.5 py-0.5 rounded font-medium">24/7</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Email</p>
                <a href="mailto:sylviegarbagecollection@gmail.com" className="text-sm text-slate-300 hover:text-white transition-colors break-all">sylviegarbagecollection@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Sylvie Garbage Collection Services. All rights reserved.</p>
          <div className="flex gap-5">
            {legalLinks.map(l => (
              <Link key={l.name} href={l.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{l.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
