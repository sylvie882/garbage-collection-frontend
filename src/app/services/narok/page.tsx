// src/app/services/narok/page.tsx
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Narok Garbage Collection Services | Sylvie Waste Management',
  description: 'Professional garbage collection and waste management services in Narok County. Serving Kilgoris, Narok Town, and all major areas across the county.',
  keywords: 'Narok garbage collection, waste management Narok, Kilgoris garbage services, Narok Town waste disposal, Maasai Mara waste management',
};

const narokLocations = [
  // Major Towns
  'Narok Town', 'Kilgoris Town', 'Emurua Dikirr', 'Ololulung-a',
  
  // Constituencies
  'Narok North', 'Narok South', 'Narok East', 'Narok West',
  'Kilgoris Constituency', 'Emurua Dikirr Constituency',
  
  // Specific Areas
  'Maasai Mara', 'Mara Serena', 'Sekenani', 'Talek', 'Mara Rianta',
  'Nkoilale', 'Mulot', 'Mogondo', 'Siana', 'Ewaso Ngiro',
  'Narok Stadium Area', 'Narok University', 'Narok Market',
  
  // Roads & Highways
  'Nairobi-Narok Highway', 'Bomet-Narok Road', 'Kilgoris-Lolgorien Road',
  'Narok-Maasai Mara Road'
];

export default function NarokServices() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 text-orange-200 font-semibold text-sm uppercase tracking-wider mb-4">
            <div className="w-8 h-px bg-orange-200"></div>
            Narok County
            <div className="w-8 h-px bg-orange-200"></div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Narok Garbage Collection Services
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Professional waste management solutions serving Narok County including 
            Narok Town, Kilgoris, and the Maasai Mara region.
          </p>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Service Areas in <span className="text-orange-600">Narok</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive waste management coverage throughout Narok County, 
              from urban centers to wildlife conservation areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {narokLocations.map((location, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-800 font-medium">{location}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Specialized Tourism Area Services</h3>
            <p className="text-gray-600 mb-6">
              We provide specialized waste management solutions for lodges, camps, and tourism facilities 
              in the Maasai Mara and surrounding conservation areas.
            </p>
            <Link 
              href="/contact"
              className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              Tourism Waste Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Narok Waste Management <span className="text-red-600">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Town Services',
                description: 'Regular garbage collection in Narok Town and urban areas',
                icon: '🏙️'
              },
              {
                title: 'Tourism Waste',
                description: 'Specialized solutions for lodges and camps in Maasai Mara',
                icon: '🦁'
              },
              {
                title: 'Commercial Collection',
                description: 'Business waste management for shops and markets',
                icon: '🏪'
              },
              {
                title: 'Rural Services',
                description: 'Waste management for rural communities and townships',
                icon: '🌾'
              },
              {
                title: 'Event Cleanup',
                description: 'Waste management for cultural events and gatherings',
                icon: '🎪'
              },
              {
                title: 'Eco-Friendly Disposal',
                description: 'Environmentally conscious waste disposal methods',
                icon: '♻️'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-800 text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Professional Waste Management in Narok
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Join businesses and residents across Narok County who trust Sylvie for reliable garbage collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/quote" 
              className="bg-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:bg-red-600 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              Get Narok Quote
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-orange-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Call Our Narok Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}