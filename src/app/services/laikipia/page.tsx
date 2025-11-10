// src/app/services/laikipia/page.tsx
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Laikipia Garbage Collection Services | Sylvie Waste Management',
  description: 'Professional garbage collection and waste management services in Laikipia County. Serving Nanyuki, Rumuruti, Dol Dol, and all major areas across the county.',
  keywords: 'Laikipia garbage collection, waste management Laikipia, Nanyuki garbage services, Rumuruti waste disposal, Dol Dol recycling, Laikipia County waste management',
};

const laikipiaLocations = [
  // Major Towns
  'Nanyuki Town', 'Rumuruti Town', 'Dol Dol', 'Nyahururu',
  'Kinamba', 'Sipili', 'Ol-Moran', 'Mukogodo',
  
  // Constituencies
  'Laikipia East', 'Laikipia West', 'Laikipia North',
  
  // Specific Areas
  'Mount Kenya Region', 'Lewa Conservancy', 'Ol Pejeta Conservancy',
  'Nanyuki Airbase', 'Nanyuki Industrial Area', 'Nanyuki Market',
  'Rumuruti Market', 'Dol Dol Trading Centre',
  
  // Estates & Residential Areas
  'Nanyuki Estates', 'Rumuruti Estates', 'Dol Dol Residential Areas',
  
  // Roads & Highways
  'Nairobi-Nanyuki Highway', 'Nyahururu-Nanyuki Road',
  'Rumuruti-Maralal Road', 'Dol Dol-Wamba Road'
];

export default function LaikipiaServices() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 text-indigo-200 font-semibold text-sm uppercase tracking-wider mb-4">
            <div className="w-8 h-px bg-indigo-200"></div>
            Laikipia County
            <div className="w-8 h-px bg-indigo-200"></div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Laikipia Garbage Collection Services
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Professional waste management solutions serving Laikipia County including 
            Nanyuki, Rumuruti, Dol Dol, and surrounding conservancy areas.
          </p>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Service Areas in <span className="text-indigo-600">Laikipia</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive waste management coverage throughout Laikipia County, 
              from urban centers to rural communities and conservancies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {laikipiaLocations.map((location, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-800 font-medium">{location}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Conservancy & Wildlife Area Services</h3>
            <p className="text-gray-600 mb-6">
              We provide specialized waste management solutions for conservancies, 
              wildlife facilities, and tourism establishments in Laikipia.
            </p>
            <Link 
              href="/contact"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              Conservancy Waste Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Laikipia Waste Management <span className="text-purple-600">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Town Services',
                description: 'Regular garbage collection in Nanyuki and urban areas',
                icon: '🏙️'
              },
              {
                title: 'Conservancy Waste',
                description: 'Specialized solutions for wildlife conservancies',
                icon: '🦒'
              },
              {
                title: 'Commercial Collection',
                description: 'Business waste management for shops and industries',
                icon: '🏭'
              },
              {
                title: 'Rural Services',
                description: 'Waste management for rural communities and townships',
                icon: '🏞️'
              },
              {
                title: 'Military Base Services',
                description: 'Waste solutions for military installations',
                icon: '🎖️'
              },
              {
                title: 'Eco-Friendly Disposal',
                description: 'Environmentally conscious waste disposal methods',
                icon: '♻️'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
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
      <section className="py-20 bg-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Professional Waste Management in Laikipia
          </h2>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Join businesses, conservancies, and residents across Laikipia County who trust Sylvie for reliable garbage collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/quote" 
              className="bg-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:bg-purple-600 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              Get Laikipia Quote
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-indigo-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Call Our Laikipia Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}