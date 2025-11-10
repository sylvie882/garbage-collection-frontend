// src/app/services/nakuru/page.tsx
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Nakuru Garbage Collection Services | Sylvie Waste Management',
  description: 'Professional garbage collection and waste management services in Nakuru. Serving Milimani, Kiamunyi, Naivasha, and all major areas across Nakuru County.',
  keywords: 'Nakuru garbage collection, waste management Nakuru, Milimani garbage services, Naivasha waste disposal, Kiamunyi recycling, Nakuru County waste management',
};

const nakuruLocations = [
  // Nakuru Town Areas
  'Milimani Estate', 'Kiamunyi Estate', 'Naka Estate', 'Ngata Estate', 
  'Section 58 Estate', 'Shabab', 'London', 'Rhoda', 'Kapkures',
  'Kaptembwo', 'Barut', 'Nakuru East', 'Menengai', 'Flamingo',
  'Kivumbini', 'Biashara', 'Freehold', 'Lake View', 'Ponda Mali',
  
  // Naivasha Areas
  'Naivasha Town', 'Karagita', 'Kamere', 'Kihoto', 'Mirera',
  'Kongoni', 'Mai Mahiu', 'Longonot', 'Villa View Estate',
  'Northlake Breeze Estate', 'Lakeshore Properties', 'La Casa Estate',
  'Blume Estate', 'Lake View Estate', 'Green Park Estate',
  
  // Other Towns in Nakuru County
  'Gilgil Town', 'Gilgil Estate', 'Bahati', 'Subukia', 'Njoro',
  'Molo Town', 'Elburgon', 'Turbo', 'Kuresoi', 'Rongai',
  'Solai', 'Mau Narok', 'Dundori', 'Kabazi',
  
  // Major Roads & Highways
  'Nairobi-Nakuru Highway', 'Naivasha-Nakuru Highway', 'Eldoret-Nakuru Road',
  'Molo Road', 'Bahati Road', 'Kampi Ya Moto'
];

export default function NakuruServices() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 text-purple-200 font-semibold text-sm uppercase tracking-wider mb-4">
            <div className="w-8 h-px bg-purple-200"></div>
            Nakuru County
            <div className="w-8 h-px bg-purple-200"></div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Nakuru Garbage Collection Services
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Professional waste management solutions serving Nakuru County including 
            Nakuru Town, Naivasha, Gilgil, and surrounding areas.
          </p>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Service Areas in <span className="text-purple-600">Nakuru</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive waste management coverage throughout Nakuru County, 
              from urban centers to suburban communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {nakuruLocations.map((location, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-800 font-medium">{location}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Nakuru County Coverage</h3>
            <p className="text-gray-600 mb-6">
              We serve all constituencies in Nakuru County including Nakuru Town East, 
              Nakuru Town West, Naivasha, Gilgil, Subukia, Bahati, and Rongai.
            </p>
            <Link 
              href="/contact"
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              Check Your Specific Area
            </Link>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nakuru Waste Management <span className="text-pink-600">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Services',
                description: 'Regular garbage collection for homes and residential areas',
                icon: '🏠'
              },
              {
                title: 'Commercial Waste',
                description: 'Business waste management for shops and offices',
                icon: '🏪'
              },
              {
                title: 'Hotel & Restaurant',
                description: 'Specialized waste solutions for hospitality industry',
                icon: '🏨'
              },
              {
                title: 'Agricultural Waste',
                description: 'Farm and agricultural waste management',
                icon: '🚜'
              },
              {
                title: 'Recycling Services',
                description: 'Eco-friendly recycling and waste separation',
                icon: '♻️'
              },
              {
                title: 'Bulk Collection',
                description: 'Large item and construction waste removal',
                icon: '📦'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
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
      <section className="py-20 bg-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Get Professional Waste Management in Nakuru
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Join the growing number of Nakuru residents and businesses choosing Sylvie for reliable garbage collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/quote" 
              className="bg-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:bg-pink-600 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              Get Nakuru Quote
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-purple-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Call Our Nakuru Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}