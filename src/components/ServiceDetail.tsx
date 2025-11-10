'use client';

import { Service } from '@/types';
import { useState } from 'react';

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'benefits'>('overview');

  const getImageUrl = () => {
    if (service.image_url) return service.image_url;
    if (service.image_path) {
      if (service.image_path.startsWith('http')) return service.image_path;
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sylviegarbagecollection.co.ke';
      return `${API_URL}/storage/${service.image_path}`;
    }
    return null;
  };

  const imageUrl = getImageUrl();

  const getYouTubeId = (url: string | null) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = service.youtube_url ? getYouTubeId(service.youtube_url) : null;

  // Generate structured data for the service
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.name,
    'description': service.description,
    'provider': {
      '@type': 'Organization',
      'name': 'Sylvie Garbage Collection',
      'url': 'https://sylviegarbagecollection.co.ke',
      'telephone': '+254-711-515752',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Nairobi',
        'addressCountry': 'KE'
      }
    },
    'areaServed': ['Nairobi', 'Nakuru', 'Narok', 'Laikipia'],
    'serviceType': service.category || 'Waste Management',
    'offers': {
      '@type': 'Offer',
      'price': service.price,
      'priceCurrency': 'KES',
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': service.price,
        'priceCurrency': 'KES',
        'unitCode': service.price_unit || 'SERVICE'
      }
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      
      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>{service.name} - Professional Waste Management Service | Sylvie Garbage Collection</h1>
        <h2>Comprehensive {service.name} Solutions in Kenya</h2>
        <p>
          Sylvie Garbage Collection provides professional {service.name.toLowerCase()} services 
          across Nairobi, Nakuru, Narok, and Laikipia counties. {service.description}
        </p>
        
        <h3>Service Details & Features</h3>
        <p>
          Our {service.name} service includes comprehensive waste management solutions tailored 
          to your specific needs. We serve both residential and commercial clients with reliable, 
          eco-friendly disposal methods.
        </p>

        {service.features?.length > 0 && (
          <>
            <h4>Key Features of Our {service.name} Service</h4>
            <ul>
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {service.benefits?.length > 0 && (
          <>
            <h4>Benefits of Choosing Our {service.name} Service</h4>
            <ul>
              {service.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </>
        )}

        <h5>Pricing & Service Information</h5>
        <p>
          {service.price && `Starting from KSh ${service.price}`} 
          {service.price_unit && ` per ${service.price_unit}`}
          {service.duration && ` | Service Duration: ${service.duration}`}
          {service.frequency && ` | Available Frequency: ${service.frequency}`}
        </p>

        <h6>Service Areas Covered</h6>
        <p>
          We provide {service.name.toLowerCase()} services throughout Kenya including Nairobi County 
          (Karen, Runda, Westlands, Kilimani, Lavington), Nakuru County (Milimani, Naivasha), 
          Narok County, and Laikipia County. Our reliable service ensures proper waste management 
          and environmental protection.
        </p>

        <p>
          Contact Sylvie Garbage Collection today for professional {service.name.toLowerCase()} 
          solutions. Call +254 711 515 752 or visit our website for free quotes and consultations.
        </p>
      </div>

      {/* HERO SECTION */}
      <section
        className="relative py-20 lg:py-28 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'linear-gradient(to right, #065f46, #047857)',
        }}
      >
        {/* Light overlay only to enhance text contrast */}
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 bg-green-700/50 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-green-300/30">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
            <span className="text-green-100 text-sm font-medium tracking-wide">
              {service.category || 'Professional Waste Management Service'}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
            }}
          >
            {service.name}
          </h1>

          {/* Description */}
          <p
            className="text-xl lg:text-2xl text-green-50 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
            }}
          >
            {service.description}
          </p>

          {/* Pricing/Frequency Details */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            {service.price && (
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
                <div className="text-2xl font-bold text-white">KSh {service.price}</div>
                <div className="text-green-100 text-sm">
                  {service.price_unit ? `per ${service.price_unit}` : 'Starting from'}
                </div>
                <div className="text-green-200 text-xs mt-1">Competitive Pricing</div>
              </div>
            )}
            {service.duration && (
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
                <div className="text-xl font-bold text-white">{service.duration}</div>
                <div className="text-green-100 text-sm">Service Duration</div>
                <div className="text-green-200 text-xs mt-1">Efficient Service</div>
              </div>
            )}
            {service.frequency && (
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
                <div className="text-xl font-bold text-white">{service.frequency}</div>
                <div className="text-green-100 text-sm">Service Frequency</div>
                <div className="text-green-200 text-xs mt-1">Flexible Scheduling</div>
              </div>
            )}
          </div>

          {/* Service Coverage */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">🌍 Service Coverage Areas</h3>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="bg-green-600/40 text-green-100 px-3 py-1 rounded-full">Nairobi County</span>
              <span className="bg-green-600/40 text-green-100 px-3 py-1 rounded-full">Nakuru County</span>
              <span className="bg-green-600/40 text-green-100 px-3 py-1 rounded-full">Narok County</span>
              <span className="bg-green-600/40 text-green-100 px-3 py-1 rounded-full">Laikipia County</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quote"
              className="group bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 inline-flex items-center gap-3 shadow-xl hover:scale-105"
              title={`Get Free Quote for ${service.name} - Sylvie Garbage Collection`}
            >
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Get Free {service.name} Quote
            </a>
            <a
              href="/contact"
              className="group border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-green-800 transition-all duration-300 inline-flex items-center gap-3 backdrop-blur-sm hover:scale-105"
              title={`Contact ${service.name} Expert - Sylvie Garbage Collection`}
            >
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Contact {service.name} Expert
            </a>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Video/Image */}
          <div>
            {videoId ? (
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allowFullScreen
                  title={`${service.name} Service Video - Sylvie Garbage Collection Waste Management`}
                  loading="lazy"
                />
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={`${service.name} Service - Professional Waste Management by Sylvie Garbage Collection`}
                className="rounded-2xl w-full h-auto object-cover shadow-2xl"
                loading="lazy"
              />
            ) : (
              <div className="aspect-video bg-green-50 rounded-2xl flex items-center justify-center text-green-700 text-lg font-medium border-2 border-dashed border-green-200">
                {service.name} Service Image
              </div>
            )}
            
            {/* Service Highlights */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <div className="text-green-600 font-bold text-lg">✓ Certified</div>
                <div className="text-green-700 text-sm">Professional Team</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <div className="text-green-600 font-bold text-lg">♻️ Eco-Friendly</div>
                <div className="text-green-700 text-sm">100% Recycling</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <div className="text-green-600 font-bold text-lg">⏰ 24/7</div>
                <div className="text-green-700 text-sm">Emergency Service</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <div className="text-green-600 font-bold text-lg">🏠</div>
                <div className="text-green-700 text-sm">Residential & Commercial</div>
              </div>
            </div>
          </div>

          {/* Tabs & Content */}
          <div>
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {['overview', 'features', 'benefits'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'overview' | 'features' | 'benefits')}
                    className={`py-3 px-2 border-b-2 font-medium text-sm capitalize transition-all ${
                      activeTab === tab
                        ? 'border-green-600 text-green-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    aria-label={`View ${tab} for ${service.name} service`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Overview</h2>
                  <p className="text-lg mb-4">{service.full_description || `Our ${service.name} service provides comprehensive waste management solutions for both residential and commercial properties across Kenya. We are committed to delivering reliable, efficient, and eco-friendly services that meet your specific needs.`}</p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-800 text-sm">
                      <strong>Service Coverage:</strong> Available in Nairobi, Nakuru, Narok, and Laikipia counties. 
                      Contact us to confirm service availability in your specific area.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Features</h2>
                  <ul className="space-y-3">
                    {service.features?.length ? (
                      service.features.map((f, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>{f}</span>
                        </li>
                      ))
                    ) : (
                      <div className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>Professional and trained waste management team</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>Eco-friendly disposal and recycling methods</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>Flexible scheduling to suit your needs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>Competitive pricing with no hidden costs</span>
                        </li>
                      </div>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Benefits</h2>
                  <ul className="space-y-3">
                    {service.benefits?.length ? (
                      service.benefits.map((b, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>{b}</span>
                        </li>
                      ))
                    ) : (
                      <div className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>Cleaner and healthier environment for your property</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>Reduced risk of pests and contamination</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>Environmentally responsible waste disposal</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>Time-saving and convenient service</span>
                        </li>
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Additional CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Contact us today for a free consultation and quote for our {service.name} service.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+254711515752"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  📞 Call Now: +254 711 515 752
                </a>
                <a
                  href="/contact"
                  className="border border-green-600 text-green-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-green-600 hover:text-white transition-colors text-center"
                >
                  📧 Send Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}