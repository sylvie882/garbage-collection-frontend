// src/app/page.tsx
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
    console.log('🔄 [HOME] Fetching services...');
    const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/services', {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status}`);
    }
    
    const services = await response.json();
    console.log('✅ [HOME] Services fetched:', services.length);
    
    return Array.isArray(services) ? services : [];
  } catch (error) {
    console.error('❌ [HOME] Error fetching services:', error);
    return [];
  }
}

// SEO-optimized metadata with all locations
export const metadata = {
  title: 'Sylvie Garbage Collection | Professional Waste Management Services Kenya',
  description: 'Kenya\'s premier digital waste management company serving Nairobi, Nakuru, Narok, Laikipia and all counties. Reliable garbage collection in Karen, Runda, Westlands, Milimani, Nanyuki, Kilgoris and 500+ locations.',
  keywords: 'garbage collection Kenya, waste management Nairobi, recycling services Nakuru, eco-friendly disposal Narok, Laikipia waste collection, Sylvie garbage services, Karen garbage collection, Runda waste management, Westlands recycling, Milimani disposal, Nanyuki garbage services, Kilgoris waste collection',
  openGraph: {
    title: 'Sylvie Garbage Collection - Professional Waste Management Kenya',
    description: 'Digital waste management solutions serving all Kenyan counties including Nairobi, Nakuru, Narok, Laikipia with reliable garbage collection and recycling services.',
    type: 'website',
    locale: 'en_KE',
  },
};

// All locations data for SEO - NOT displayed to users
const seoLocations = {
  nairobi: [
    'The New Horse Shoe Village', 'Barton Estate', 'Whispers Estate', 'Migaa Golf Estate',
    'Daisy Road', 'Tara Road', 'Fairview Estate', 'Riverrun Estates', 'Amani Ridge',
    // ... include all 500+ Nairobi locations from your list
  ],
  nakuru: [
    'Milimani Estate', 'Kiamunyi Estate', 'Naka Estate', 'Ngata Estate', 'Section 58 Estate',
    'Nairobi-Nakuru Highway', 'Naivasha-Nakuru Highway', 'Villa View Estate', 
    // ... all Nakuru locations
  ],
  narok: [
    'Kilgoris', 'Emurua Dikirr', 'Narok North', 'Narok East', 'Narok West', 'Narok South'
  ],
  laikipia: [
    'Laikipia West', 'Laikipia East', 'Laikipia North', 'Nanyuki', 'Dol Dol', 'Rumuruti'
  ]
};

export default async function Home() {
  const services = await getServices();
  const displayedServices = services.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-25 via-white to-green-25 pt-4 w-full overflow-x-hidden">
      {/* Hidden SEO content with all locations */}
      <div className="sr-only" aria-hidden="true">
        <h1>Sylvie Garbage Collection - Professional Waste Management Services Across Kenya</h1>
        
        <h2>Service Areas Covered</h2>
        
        <h3>Nairobi County Waste Management Services</h3>
        <p>
          Professional garbage collection and waste management services in Nairobi covering 
          {seoLocations.nairobi.slice(0, 50).join(', ')} and 450+ other locations throughout Nairobi County. 
          We provide reliable waste disposal solutions for residential and commercial properties.
        </p>

        <h3>Nakuru County Garbage Collection</h3>
        <p>
          Comprehensive waste management services in Nakuru County including 
          {seoLocations.nakuru.join(', ')}. Our Nakuru team ensures eco-friendly disposal and recycling services.
        </p>

        <h3>Narok County Waste Disposal</h3>
        <p>
          Reliable garbage collection in Narok County serving {seoLocations.narok.join(', ')}. 
          We offer sustainable waste management solutions for the Narok region.
        </p>

        <h3>Laikipia County Recycling Services</h3>
        <p>
          Professional waste management in Laikipia County covering {seoLocations.laikipia.join(', ')}. 
          Environmentally friendly disposal services for Laikipia residents and businesses.
        </p>

        <p>
          Sylvie Garbage Collection is Kenya's leading waste management company serving over 500 locations 
          across multiple counties. We provide digital-first garbage collection, recycling services, 
          and eco-friendly waste disposal solutions for homes, businesses, and institutions throughout Kenya.
        </p>
      </div>

      <Header />

      {/* Hero Section - Now properly at the top without extra spacing */}
      <section className="relative w-full">
        <Carousel />
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-100 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-orange-100 rounded-full opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-green-600">Sylvie</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kenya's premier digital waste management company providing innovative 
              solutions for homes and businesses across all counties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Digital First',
                description: 'Schedule pickups, view invoices, and make payments through our smart technology platform.',
                icon: '📱',
                color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
                accent: 'bg-blue-100'
              },
              {
                title: 'Eco-Friendly',
                description: 'Committed to 100% recycling and promoting a sustainable environment through resource recovery.',
                icon: '🌱',
                color: 'bg-gradient-to-br from-green-500 to-emerald-500',
                accent: 'bg-green-100'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer support to address all your waste management needs promptly.',
                icon: '🛡️',
                color: 'bg-gradient-to-br from-orange-500 to-amber-500',
                accent: 'bg-orange-100'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 ${feature.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 ${feature.color} rounded-bl-3xl opacity-10`}></div>
                  
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${feature.color} flex items-center justify-center text-3xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center relative z-10">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center relative z-10">{feature.description}</p>
                  
                  {/* Hover Effect Line */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 ${feature.color.split(' ')[2]} group-hover:w-20 transition-all duration-500 rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-green-25 via-white to-blue-25 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-100 rounded-full opacity-15"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 text-green-600 font-semibold text-sm uppercase tracking-wider mb-4">
              <div className="w-8 h-px bg-green-600"></div>
              Our Services
              <div className="w-8 h-px bg-green-600"></div>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional <span className="text-green-600">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive waste management and environmental solutions tailored to your specific needs across Kenya.
            </p>
          </div>

          {displayedServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {displayedServices.map((service) => (
                  <div key={service.id} className="transform hover:-translate-y-3 transition-all duration-500">
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>

              {services.length > 6 && (
                <div className="text-center">
                  <Link 
                    href="/services"
                    className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 relative overflow-hidden"
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <span>View All Services</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <p className="text-gray-600 mt-4">
                    Showing 6 of {services.length} services
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Services Coming Soon</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We're currently updating our service catalog. Please check back soon or contact us for immediate assistance.
              </p>
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 inline-flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Our Team
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Service Coverage Section - User Friendly */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-transparent opacity-50"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 text-green-600 font-semibold text-sm uppercase tracking-wider mb-4">
              <div className="w-8 h-px bg-green-600"></div>
              Service Coverage
              <div className="w-8 h-px bg-green-600"></div>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Serving <span className="text-green-600">All Kenya</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive waste management services across multiple counties throughout Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                county: 'Nairobi County',
                description: 'Complete waste management solutions across Nairobi',
                areas: '500+ locations',
                color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
                accent: 'bg-blue-50',
                link: '/services/nairobi',
                icon: '🏙️'
              },
              {
                county: 'Nakuru County',
                description: 'Reliable garbage collection in Nakuru region',
                areas: '30+ locations',
                color: 'bg-gradient-to-br from-purple-500 to-pink-500',
                accent: 'bg-purple-50',
                link: '/services/nakuru',
                icon: '🏔️'
              },
              {
                county: 'Narok County',
                description: 'Eco-friendly disposal services in Narok',
                areas: '6 major areas',
                color: 'bg-gradient-to-br from-orange-500 to-red-500',
                accent: 'bg-orange-50',
                link: '/services/narok',
                icon: '🦁'
              },
              {
                county: 'Laikipia County',
                description: 'Professional waste management in Laikipia',
                areas: '6 key locations',
                color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
                accent: 'bg-indigo-50',
                link: '/services/laikipia',
                icon: '🏞️'
              }
            ].map((county, index) => (
              <Link 
                key={index} 
                href={county.link}
                className="block group"
              >
                <div className="relative bg-white rounded-3xl p-8 text-center h-full transform hover:-translate-y-3 transition-all duration-500 shadow-2xl hover:shadow-3xl border border-gray-100 hover:border-green-200 overflow-hidden">
                  {/* Background Accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${county.color}`}></div>
                  <div className={`absolute inset-0 ${county.accent} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${county.color} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 shadow-lg`}>
                    {county.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors relative z-10">
                    {county.county}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed relative z-10">
                    {county.description}
                  </p>
                  <p className="text-green-600 font-semibold relative z-10">{county.areas}</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600 text-sm font-semibold relative z-10">
                    <span>View Services</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-200 rounded-3xl transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* County Service Links */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 mb-12 shadow-2xl border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Explore Our County Services
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: 'Nairobi Services', icon: '🏙️', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800', href: '/services/nairobi' },
                { name: 'Nakuru Services', icon: '🏔️', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800', href: '/services/nakuru' },
                { name: 'Narok Services', icon: '🦁', color: 'bg-orange-100 hover:bg-orange-200 text-orange-800', href: '/services/narok' },
                { name: 'Laikipia Services', icon: '🏞️', color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800', href: '/services/laikipia' }
              ].map((service, index) => (
                <Link 
                  key={index}
                  href={service.href} 
                  className={`${service.color} px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 shadow-lg hover:shadow-xl`}
                >
                  <span>{service.icon}</span>
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Call to action for area check */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Not sure if we serve your area? Check our detailed coverage or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/coverage"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                View Full Coverage Map
              </Link>
              <Link 
                href="/contact"
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Us Directly
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 right-10 w-20 h-20 bg-orange-200 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-amber-200 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Locations Served', icon: '📍' },
              { number: '1000+', label: 'Happy Clients', icon: '😊' },
              { number: '24/7', label: 'Customer Support', icon: '🛡️' },
              { number: '100%', label: 'Eco-Friendly', icon: '🌱' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="text-4xl mb-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-orange-800 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-green-800 to-emerald-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full opacity-5"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Join hundreds of satisfied customers across Kenya who trust Sylvie Garbage Collection for their waste management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/quote" 
              className="group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              Get Free Quote
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <Link 
              href="/contact" 
              className="group bg-white text-green-800 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 shadow-xl hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-green-800 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
}