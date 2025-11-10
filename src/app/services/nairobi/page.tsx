// src/app/services/nairobi/page.tsx
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Nairobi Garbage Collection Services | Sylvie Waste Management',
  description: 'Professional garbage collection and waste management services in Nairobi. Serving Karen, Runda, Westlands, Kilimani, Lavington, and 500+ locations across Nairobi County.',
  keywords: 'Nairobi garbage collection, waste management Nairobi, Karen garbage services, Runda waste disposal, Westlands recycling, Kilimani garbage collection, Lavington waste management',
};

const nairobiLocations = [
  // Central Nairobi
  'Kilimani', 'Lavington', 'Westlands', 'Parklands', 'Kileleshwa', 'Spring Valley',
  'Upper Hill', 'Hurlingham', 'Adams Arcade', 'Ngong Road', 'Valley Road',
  
  // Karen & Langata Areas
  'Karen', 'Karen Road', 'Karen Brooks Estate', 'Karen Greens Estate', 
  'Karen Ridge Estate', 'Langata', 'Langata Road', 'Langata Forest View Estate',
  'Ololua Ridge', 'Ngong Forest View', 'Mbagathi Way',
  
  // Runda & Surrounding
  'Runda', 'Runda Estate', 'Runda Mumwe', 'Runda Grove', 'Runda Riviera',
  'Runda Kigwaru', 'Runda Water', 'Garden Estate', 'Thome Estate', 'Ridgeways',
  
  // Westlands & Surrounding
  'Westlands', 'Loresho', 'Loresho Ridge', 'Loresho Lane', 'Kitisuru', 
  'Kitisuru Country Homes', 'Muthaiga', 'Muthaiga North', 'Muthaiga South',
  'Nyari', 'Kyuna', 'Kyuna Road', 'Kyuna Crescent',
  
  // Embakasi & Eastlands
  'Utawala', 'Ruai', 'Mihango', 'Kayole', 'Donholm', 'Buruburu', 
  'Uhuru Estate', 'Embakasi', 'Kitengela', 'Athi River',
  
  // Other Major Areas
  'South B', 'South C', 'Nairobi West', 'Industrial Area', 'Upper Kabete',
  'Lower Kabete', 'Kikuyu', 'Dagoretti', 'Kawangware', 'Kangemi',
  
  // Estates & Compounds
  'The New Horse Shoe Village', 'Barton Estate', 'Whispers Estate', 
  'Migaa Golf Estate', 'Fairview Estate', 'Riverrun Estates', 
  'Amani Ridge', 'Zaria Village', 'Mind Bridge Gardens',
  'Mhasibu Silver Birch Estate', 'Royale Ville Gardens',
  
  // Roads & Specific Locations
  'Daisy Road', 'Tara Road', 'Marula Lane', 'Acacia Drive', 'Gitanga Road',
  'Muthithi Road', 'Mpaka Road', 'Argwings Kodhek Road', 'Ring Road Kilimani',
  'Lenana Road', 'Ngong Avenue', 'Mombasa Road', 'Southern Bypass',
  'Northern Bypass', 'Eastern Bypass'
];

export default function NairobiServices() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 text-blue-200 font-semibold text-sm uppercase tracking-wider mb-4">
            <div className="w-8 h-px bg-blue-200"></div>
            Nairobi County
            <div className="w-8 h-px bg-blue-200"></div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Nairobi Garbage Collection Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Professional waste management solutions serving over 500 locations across Nairobi County. 
            Reliable, eco-friendly garbage collection for homes and businesses.
          </p>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Service Areas in <span className="text-blue-600">Nairobi</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive waste management services throughout Nairobi County, 
              covering all major residential and commercial areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {nairobiLocations.map((location, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-800 font-medium">{location}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Don't see your specific location? We likely still serve your area!
            </p>
            <Link 
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center gap-3"
            >
              Contact Us to Confirm
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nairobi Waste Management <span className="text-green-600">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Residential Collection',
                description: 'Regular garbage pickup for homes and apartments across Nairobi',
                icon: '🏠'
              },
              {
                title: 'Commercial Services',
                description: 'Waste management solutions for businesses and offices',
                icon: '🏢'
              },
              {
                title: 'Recycling Programs',
                description: 'Eco-friendly recycling services for sustainable disposal',
                icon: '♻️'
              },
              {
                title: 'Bulk Waste Removal',
                description: 'Specialized collection for large items and cleanouts',
                icon: '🚛'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-3xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready for Reliable Waste Management in Nairobi?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of Nairobi residents and businesses who trust Sylvie for their garbage collection needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/quote" 
              className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              Get Nairobi Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-blue-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Call Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}