// src/app/about/page.tsx
import Link from 'next/link';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';

// SEO Metadata
export const metadata = {
  title: 'About Sylvie Garbage Collection | Waste Management Experts in Kenya',
  description: 'Learn about Sylvie Garbage Collection - Nairobi\'s leading waste management company. 100% recycling commitment, experienced staff, and eco-friendly solutions since 2020.',
  keywords: 'about Sylvie garbage collection, waste management company Nairobi, recycling services Kenya, eco-friendly garbage collection, Sylvie about us, waste management experts',
  openGraph: {
    title: 'About Sylvie Garbage Collection | Waste Management Experts in Kenya',
    description: 'Leading waste management company in Nairobi providing 100% recycling solutions and eco-friendly garbage collection services.',
    type: 'website',
    locale: 'en_KE',
    images: [
      {
        url: '/images/sylvie-about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Sylvie Garbage Collection Team',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Sylvie Garbage Collection',
  'description': 'Professional waste management and garbage collection services in Nairobi, Kenya',
  'url': 'https://sylviegarbagecollection.co.ke/about',
  'logo': 'https://sylviegarbagecollection.co.ke/images/logo.png',
  'foundingDate': '2020',
  'areaServed': ['Nairobi', 'Nakuru', 'Narok', 'Laikipia'],
  'serviceType': [
    'Residential Garbage Collection',
    'Commercial Waste Management',
    'Recycling Services',
    'Industrial Waste Disposal'
  ],
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Nairobi',
    'addressCountry': 'KE'
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+254-XXX-XXXXXX',
    'contactType': 'customer service'
  },
  'sameAs': [
    'https://www.facebook.com/sylviegarbage',
    'https://www.instagram.com/sylviegarbage',
    'https://twitter.com/sylviegarbage'
  ]
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>About Sylvie Garbage Collection - Waste Management Experts in Kenya</h1>
        <h2>Professional Garbage Collection Services in Nairobi</h2>
        <p>
          Sylvie Garbage Collection is a leading waste management company based in Nairobi, Kenya, 
          providing comprehensive garbage collection, recycling, and waste disposal services since 2020. 
          We serve residential, commercial, and industrial clients across Nairobi County, Nakuru County, 
          Narok County, and Laikipia County.
        </p>
        <h3>Our Waste Management Expertise</h3>
        <p>
          Specializing in 100% recycling solutions, Sylvie Garbage Collection offers reliable waste management 
          services including residential garbage pickup, commercial waste disposal, industrial cleaning, 
          and environmental conservation programs. Our team of qualified professionals ensures proper waste 
          segregation, transportation, and eco-friendly disposal methods.
        </p>
        <h4>Service Areas in Nairobi</h4>
        <p>
          We provide garbage collection services throughout Nairobi including Karen, Runda, Westlands, 
          Kilimani, Lavington, Parklands, and surrounding areas. Our coverage extends to over 500 locations 
          across Kenya with reliable weekly and monthly collection schedules.
        </p>
      </div>

      <Header />
      
      {/* Carousel Section */}
      <Carousel />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              ABOUT SYLVIE GARBAGE COLLECTION
            </h1>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Leading waste management experts in Kenya providing reliable garbage collection and 
              100% recycling solutions since 2020.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Professional Garbage Collection Services in Nairobi Kenya
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sylvie Garbage Collection is a leading company in the waste management field, providing 
                specific solutions for every customer. With extensive experience in residential & industrial 
                waste management, we offer expert services that remove responsibility from waste-generating 
                companies through our 100% recycling commitment.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our staff are responsible, qualified, fully trained, experienced and inducted at every site. 
                Stringent employment and medical checks are in place for all staff including cleaners, 
                supervisors, team leaders and managers. All staff are trained to comply with company policy, 
                Workplace Health and Safety and safe work place methods.
              </p>
              <div className="bg-green-50 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-bold text-green-800 mb-3">Our Expertise Includes:</h3>
                <ul className="grid grid-cols-2 gap-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Residential Garbage Collection
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Commercial Waste Management
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Industrial Waste Disposal
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Recycling Programs
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-8">
              <h3 className="text-xl font-bold text-green-800 mb-4">Why Choose Sylvie Garbage Collection?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Experienced & Qualified Staff
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  100% Recycling Commitment
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Health & Safety Compliant
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Residential & Industrial Services
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Eco-Friendly Solutions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Affordable Pricing
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Reliable Scheduling
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Multiple County Coverage
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Environmental Commitment */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Our Environmental Commitment & Sustainability
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-center max-w-4xl mx-auto">
            At Sylvie Garbage Collection, we strive to conserve precious resources by focusing on waste reduction 
            as well as the sorting and transportation of recyclables to recovery facilities. As a last resort, 
            we dispose of the ultimate waste at the recommended landfill site. As a waste management company, 
            our competitive advantage stems from our ability to generate new ideas that take into account our 
            unique local conditions in Kenya.
          </p>
          <p className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">
            We hope to eventually achieve zero waste to landfill by continuing to empower our thriving informal 
            sector while keeping costs low for our valued customers across Nairobi, Nakuru, Narok, and Laikipia counties.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">♻️</span>
              </div>
              <h4 className="font-bold text-green-800 mb-2">100% Recycling</h4>
              <p className="text-sm text-gray-600">Committed to maximum recycling and minimal landfill use</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🌱</span>
              </div>
              <h4 className="font-bold text-green-800 mb-2">Eco-Friendly</h4>
              <p className="text-sm text-gray-600">Sustainable waste management practices</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🏆</span>
              </div>
              <h4 className="font-bold text-green-800 mb-2">Certified</h4>
              <p className="text-sm text-gray-600">Fully licensed and compliant with regulations</p>
            </div>
          </div>
        </section>

        {/* Services Highlights */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-orange-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">🐜</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Pest Control & Sanitation Solutions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We are a company committed to developing solutions that accommodate continuing growth through 
              research, innovation and a firm commitment to deliver value-added services to our customers. 
              Our regular garbage collection prevents pest infestations and maintains clean, healthy environments 
              for residential and commercial properties throughout Kenya.
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">🏠</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Community Clean Up Programs
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our company's mission is to deliver value-added services that protect people and improve the 
              environment. We aim to be a company that uses its industry knowledge and experience, to provide 
              sustainable environmental protection solutions and services. We organize regular clean-up exercises 
              for residential communities across Nairobi and surrounding counties.
            </p>
          </div>
        </section>

        {/* Vision, Mission & Values */}
        <section className="grid md:grid-cols-3 gap-8">
          {/* Vision */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-4">OUR VISION</h2>
            <p className="text-gray-600 leading-relaxed">
              To become a highly innovative and sought after waste management solution provider in Kenya and beyond, 
              recognized for our commitment to environmental sustainability and customer satisfaction in garbage 
              collection services.
            </p>
          </div>

          {/* Mission */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-4">OUR MISSION</h2>
            <p className="text-gray-600 leading-relaxed">
              To help our clients maintain clean, healthy environments through efficient waste management 
              solutions that cut unnecessary costs, improve efficiency and offer value to their communities 
              across Nairobi, Nakuru, Narok, and Laikipia counties.
            </p>
          </div>

          {/* Values */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-4">OUR VALUES</h2>
            <p className="text-gray-600 leading-relaxed">
              We are committed to the values of excellence, reliability, growth, innovation,
              professionalism and integrity. We do what we say and do it well the – first time! 
              Our commitment to 100% recycling and environmental protection guides every service we provide.
            </p>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Professional Waste Management?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers across Kenya who trust Sylvie Garbage Collection for reliable, 
            eco-friendly waste management solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact Us Today
            </Link>
            <Link 
              href="/services" 
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors text-lg inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}