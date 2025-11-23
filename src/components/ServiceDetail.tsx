'use client';

import { Service } from '@/types';
import { useState } from 'react';

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'benefits' | 'gallery' | 'videos'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sylviegarbagecollection.co.ke';
    return `${API_URL}/storage/${imagePath}`;
  };

  // Get main service image
  const mainImageUrl = service.image_url || (service.image_path ? getImageUrl(service.image_path) : null);

  // Get gallery images
  const galleryImages = service.gallery_images_urls || 
    (service.gallery_images ? service.gallery_images.map(img => getImageUrl(img)) : []);

  // Get YouTube videos
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  // Handle multiple YouTube URLs (if stored as array) or single URL
  const youtubeUrls = service.youtube_urls || 
    (service.youtube_url ? [service.youtube_url] : []);

  const youtubeVideos = youtubeUrls
    .map(url => ({
      url,
      videoId: getYouTubeId(url),
      embedUrl: getYouTubeId(url) ? `https://www.youtube.com/embed/${getYouTubeId(url)}` : null
    }))
    .filter(video => video.videoId);

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
      
      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 z-10"
            >
              ✕ Close
            </button>
            <img
              src={selectedImageIndex === -1 ? mainImageUrl : galleryImages[selectedImageIndex]}
              alt={`${service.name} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            {galleryImages.length > 0 && (
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => setSelectedImageIndex(prev => 
                    prev === null ? 0 : (prev > 0 ? prev - 1 : galleryImages.length - 1)
                  )}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded hover:bg-opacity-30"
                >
                  ← Previous
                </button>
                <span className="text-white self-center">
                  {selectedImageIndex === -1 ? 'Main Image' : `Image ${selectedImageIndex + 1} of ${galleryImages.length}`}
                </span>
                <button
                  onClick={() => setSelectedImageIndex(prev => 
                    prev === null ? 0 : (prev < galleryImages.length - 1 ? prev + 1 : -1)
                  )}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded hover:bg-opacity-30"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideoIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedVideoIndex(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 z-10"
            >
              ✕ Close
            </button>
            <div className="aspect-video bg-black">
              <iframe
                src={youtubeVideos[selectedVideoIndex].embedUrl}
                className="w-full h-full"
                allowFullScreen
                title={`${service.name} Service Video ${selectedVideoIndex + 1}`}
                loading="lazy"
              />
            </div>
            {youtubeVideos.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => setSelectedVideoIndex(prev => 
                    prev > 0 ? prev - 1 : youtubeVideos.length - 1
                  )}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded hover:bg-opacity-30"
                >
                  ← Previous
                </button>
                <span className="text-white self-center">
                  Video {selectedVideoIndex + 1} of {youtubeVideos.length}
                </span>
                <button
                  onClick={() => setSelectedVideoIndex(prev => 
                    prev < youtubeVideos.length - 1 ? prev + 1 : 0
                  )}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded hover:bg-opacity-30"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
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

      {/* CLEAN GREEN HERO SECTION WITH PROPER SPACING */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Service Type/Category - Added more top margin */}
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-green-400/30">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              <span className="text-green-100 text-sm font-medium">
                {service.category || 'Waste Management Service'}
              </span>
            </div>

            {/* Service Name - Adjusted spacing */}
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {service.name}
            </h1>

            {/* Service Description - Adjusted spacing */}
            <p className="text-green-50 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {service.description}
            </p>

            {/* CTA Buttons - Adjusted spacing and mobile layout */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/quote"
                className="group bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto justify-center"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                Get Free Quote
              </a>
              <a
                href="/contact"
                className="group border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 inline-flex items-center gap-3 backdrop-blur-sm hover:scale-105 w-full sm:w-auto justify-center"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                Contact Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT - Adjusted top padding */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Media Section */}
          <div>
            {/* Main Video or Image - YouTube FIRST priority */}
            {youtubeVideos.length > 0 ? (
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl mb-6">
                <iframe
                  src={`${youtubeVideos[0].embedUrl}?rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allowFullScreen
                  title={`${service.name} Service Video - Sylvie Garbage Collection Waste Management`}
                  loading="lazy"
                />
              </div>
            ) : mainImageUrl ? (
              <img
                src={mainImageUrl}
                alt={`${service.name} Service - Professional Waste Management by Sylvie Garbage Collection`}
                className="rounded-2xl w-full h-auto object-cover shadow-2xl mb-6 cursor-pointer"
                loading="lazy"
                onClick={() => setSelectedImageIndex(-1)}
              />
            ) : (
              <div className="aspect-video bg-green-50 rounded-2xl flex items-center justify-center text-green-700 text-lg font-medium border-2 border-dashed border-green-200 mb-6">
                {service.name} Service Image
              </div>
            )}

            {/* Additional Videos */}
            {youtubeVideos.length > 1 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">More Videos</h3>
                <div className="grid grid-cols-2 gap-4">
                  {youtubeVideos.slice(1).map((video, index) => (
                    <div 
                      key={index}
                      className="aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-gray-200 relative group"
                      onClick={() => setSelectedVideoIndex(index + 1)}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={`${service.name} - Video ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Thumbnails */}
            {galleryImages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Gallery Images</h3>
                <div className="grid grid-cols-3 gap-3">
                  {mainImageUrl && youtubeVideos.length === 0 && (
                    <div 
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-green-500"
                      onClick={() => setSelectedImageIndex(-1)}
                    >
                      <img
                        src={mainImageUrl}
                        alt={`${service.name} - Main Image`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {galleryImages.map((image, index) => (
                    <div 
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-gray-200"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${service.name} - Gallery Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Highlights */}
            <div className="grid grid-cols-2 gap-4">
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
              <nav className="flex space-x-8 overflow-x-auto">
                {['overview', 'features', 'benefits', 'gallery', 'videos'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`py-3 px-2 border-b-2 font-medium text-sm capitalize whitespace-nowrap transition-all ${
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

              {activeTab === 'gallery' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Gallery</h2>
                  {galleryImages.length > 0 || mainImageUrl ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mainImageUrl && youtubeVideos.length === 0 && (
                        <div 
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-green-500"
                          onClick={() => setSelectedImageIndex(-1)}
                        >
                          <img
                            src={mainImageUrl}
                            alt={`${service.name} - Main Image`}
                            className="w-full h-full object-cover"
                          />
                          <div className="bg-green-500 text-white text-xs p-1 text-center">Main Image</div>
                        </div>
                      )}
                      {galleryImages.map((image, index) => (
                        <div 
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-gray-200"
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <img
                            src={image}
                            alt={`${service.name} - Gallery Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No gallery images available for this service.</p>
                  )}
                </div>
              )}

              {activeTab === 'videos' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Videos</h2>
                  {youtubeVideos.length > 0 ? (
                    <div className="space-y-6">
                      {youtubeVideos.map((video, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="aspect-video bg-black">
                            <iframe
                              src={`${video.embedUrl}?rel=0&modestbranding=1`}
                              className="w-full h-full"
                              allowFullScreen
                              title={`${service.name} Service Video ${index + 1}`}
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4 bg-gray-50">
                            <p className="text-sm text-gray-600">Video {index + 1} of {youtubeVideos.length}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No videos available for this service.</p>
                  )}
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