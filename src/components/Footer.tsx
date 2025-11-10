import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Free Quote', href: '/quote' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
  ];

  // Structured Data for Local Business
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Sylvie Garbage Collection',
    'alternateName': 'Sylvie Waste Management',
    'description': 'Professional waste management and garbage collection services in Nairobi, Kenya',
    'url': 'https://sylviegarbagecollection.co.ke',
    'logo': 'https://sylviegarbagecollection.co.ke/logo.jpeg',
    'foundingDate': '2020',
    'founder': {
      '@type': 'Person',
      'name': 'Sylvie Garbage Collection Team'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Dale House, Fox Close Off Rhapta Road',
      'addressLocality': 'Westlands',
      'addressRegion': 'Nairobi',
      'addressCountry': 'KE',
      'postalCode': '00100'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+254-711-515752',
      'email': 'sylviegarbagecollection@gmail.com',
      'contactType': 'customer service',
      'areaServed': ['KE'],
      'availableLanguage': ['English', 'Swahili']
    },
    'sameAs': [
      'https://www.facebook.com/sylviegarbagecollection',
      'https://www.instagram.com/sylviegarbagecollection',
      'https://twitter.com/sylviegarbage'
    ],
    'areaServed': [
      'Nairobi County',
      'Nakuru County', 
      'Narok County',
      'Laikipia County',
      'Kenya'
    ],
    'serviceType': [
      'Garbage Collection',
      'Waste Disposal',
      'Recycling Services',
      'Pest Control',
      'Cleaning Services',
      'Commercial Waste Management',
      'Residential Waste Collection'
    ],
    'openingHours': [
      'Mo-Su 00:00-23:59'
    ],
    'priceRange': '$$',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Waste Management Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Residential Garbage Collection',
            'description': 'Regular waste pickup for homes and apartments'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Commercial Waste Management',
            'description': 'Business waste disposal solutions'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Recycling Services',
            'description': 'Eco-friendly waste sorting and processing'
          }
        }
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Sylvie Garbage Collection - Professional Waste Management Services Kenya</h1>
        <h2>Leading Garbage Collection Company in Nairobi & Beyond</h2>
        <p>
          Sylvie Garbage Collection is Kenya's premier digital waste management company providing 
          comprehensive garbage collection, recycling, and environmental services across Nairobi County, 
          Nakuru County, Narok County, and Laikipia County. We serve both residential and commercial 
          clients with reliable, eco-friendly waste management solutions.
        </p>
        
        <h3>Our Waste Management Services</h3>
        <ul>
          <li>Residential Garbage Collection - Regular waste pickup for homes and apartments</li>
          <li>Commercial Waste Management - Business waste disposal solutions</li>
          <li>Recycling Services - 100% recycling commitment and eco-friendly disposal</li>
          <li>Pest Control Services - Effective pest elimination and prevention</li>
          <li>Cleaning Services - Professional cleaning and sanitation solutions</li>
          <li>Bulk Waste Removal - Large item and construction waste disposal</li>
        </ul>

        <h4>Service Areas Covered</h4>
        <p>
          We provide garbage collection services throughout Kenya with focus on Nairobi (Karen, Runda, 
          Westlands, Kilimani, Lavington), Nakuru (Milimani, Naivasha), Narok, and Laikipia counties. 
          Our reliable weekly and monthly collection schedules ensure clean environments for all our clients.
        </p>

        <h5>Contact Information</h5>
        <p>
          <strong>Address:</strong> Dale House, Fox Close Off Rhapta Road, Westlands, Nairobi, Kenya<br/>
          <strong>Phone:</strong> +254 711 515 752 (24/7 Emergency Services)<br/>
          <strong>Email:</strong> sylviegarbagecollection@gmail.com<br/>
          <strong>Business Hours:</strong> Monday - Sunday, 24/7 Operations
        </p>

        <h6>Why Choose Sylvie Garbage Collection?</h6>
        <ul>
          <li>Experienced and qualified waste management professionals</li>
          <li>100% recycling commitment and environmental sustainability</li>
          <li>24/7 customer support and emergency services</li>
          <li>Affordable pricing with flexible service plans</li>
          <li>Modern equipment and eco-friendly disposal methods</li>
          <li>Same-day service available in most areas</li>
          <li>Serving residential, commercial, and industrial clients</li>
        </ul>

        <p>
          Sylvie Garbage Collection is committed to creating cleaner, healthier environments across Kenya 
          through professional waste management services. Contact us today for free quotes and customized 
          waste solutions tailored to your specific needs.
        </p>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo.jpeg"
                  alt="Sylvie Garbage Collection - Professional Waste Management Services Kenya"
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sylvie Garbage Collection</h1>
                <p className="text-xs text-gray-400 -mt-1">Professional Waste Management Services</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Kenya's leading digital waste management company providing comprehensive 
              garbage collection and recycling services to homes and businesses across 
              Nairobi, Nakuru, Narok, and Laikipia counties.
            </p>
            
            {/* Service Coverage Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-xs border border-green-500/30">
                🏙️ Nairobi County
              </span>
              <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-xs border border-green-500/30">
                🏔️ Nakuru County
              </span>
              <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-xs border border-green-500/30">
                🦁 Narok County
              </span>
              <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-xs border border-green-500/30">
                🏞️ Laikipia County
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Waste Management Services</h3>
            <div className="grid grid-cols-1 gap-3">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm block py-1 hover:translate-x-1 transform transition-transform"
                  title={`Sylvie Garbage Collection ${item.name} - Waste Management Services`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Service Highlights */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-white text-sm">Our Expertise</h4>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Residential Garbage Collection
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Commercial Waste Management
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  100% Recycling Commitment
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Eco-Friendly Solutions
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Our Team</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
                <div>
                  <span className="text-gray-300 text-sm block">
                    Dale House, Fox Cl Off Rhapta Rd
                  </span>
                  <span className="text-gray-400 text-xs block mt-1">
                    Westlands, Nairobi, Kenya
                  </span>
                  <span className="text-green-300 text-xs block mt-1">
                    Serving Nairobi, Nakuru, Narok & Laikipia
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a 
                  href="mailto:sylviegarbagecollection@gmail.com" 
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                  title="Email Sylvie Garbage Collection for Waste Management Services"
                >
                  sylviegarbagecollection@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a 
                  href="tel:+254711515752" 
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                  title="Call Sylvie Garbage Collection for Emergency Waste Collection"
                >
                  +254 711 515 752
                </a>
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  24/7
                </span>
              </div>
            </div>

            {/* Emergency Services Notice */}
            <div className="mt-6 p-3 bg-gray-800 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-white text-sm mb-1">Emergency Services</h4>
              <p className="text-gray-300 text-xs">
                Need immediate waste collection? Call us anytime for emergency garbage disposal services across Kenya.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Sylvie Garbage Collection Services. 
              <span className="text-green-300 ml-1">Professional Waste Management Across Kenya.</span>
            </p>
            <div className="flex space-x-6 text-sm">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-xs"
                  title={`Sylvie Garbage Collection ${link.name}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}