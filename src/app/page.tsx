// src/app/page.tsx (DEBUG VERSION)
import Carousel from '../components/Carousel';
import Link from 'next/link';
import { serviceApi } from '../lib/api';
import { Service } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import FloatingButtons from '../components/FloatingButtons'; // Add this import

async function getServices(): Promise<Service[]> {
  try {
    console.log('🔄 [HOME] Fetching services...');
    const response = await serviceApi.getAll();
    console.log('✅ [HOME] Services fetched:', response.data.length);
    return response.data;
  } catch (error) {
    console.error('❌ [HOME] Error fetching services:', error);
    return [];
  }
}

export default async function Home() {
  const services = await getServices();
  const displayedServices = services.slice(0, 6);

  console.log('📊 [HOME] Services to display:', displayedServices.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 w-full overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full">
        <Carousel />
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-green-600">Sylvie</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kenya's premier digital waste management company providing innovative 
              solutions for homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Digital First',
                description: 'Schedule pickups, view invoices, and make payments through our smart technology platform.',
                icon: '📱',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Eco-Friendly',
                description: 'Committed to 100% recycling and promoting a sustainable environment through resource recovery.',
                icon: '🌱',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer support to address all your waste management needs promptly.',
                icon: '🛡️',
                gradient: 'from-orange-500 to-amber-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
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
              Comprehensive waste management and environmental solutions tailored to your specific needs.
            </p>
          </div>

          {displayedServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {displayedServices.map((service) => (
                  <div key={service.id} className="transform hover:-translate-y-2 transition-all duration-500">
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link 
                  href="/services"
                  className="group bg-gradient-to-r from-green-800 to-emerald-800 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-green-900 hover:to-emerald-900 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-green-700/30 hover:scale-105"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Explore All Services
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
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

      {/* Stats Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Happy Clients' },
              { number: '1000+', label: 'Projects Completed' },
              { number: '24/7', label: 'Customer Support' },
              { number: '100%', label: 'Eco-Friendly' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-orange-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 bg-green-800">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Join hundreds of satisfied customers who trust Sylvie Garbage Collection for their waste management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/quote" 
              className="bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:bg-orange-600 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              Get Free Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-green-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Floating WhatsApp and Scroll-to-Top Buttons */}
      <FloatingButtons />
    </div>
  );
}