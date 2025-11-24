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

  // Get gallery images - safely handle missing property
  const galleryImages: string[] = (service as any).gallery_images ? 
    (service as any).gallery_images.map((img: string) => getImageUrl(img)) : [];

  // Get YouTube videos
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  // Handle single YouTube URL
  const youtubeUrls = service.youtube_url ? [service.youtube_url] : [];

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

  // Fixed navigation functions for modals
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (selectedImageIndex === -1) {
      // Currently viewing main image
      setSelectedImageIndex(direction === 'next' ? 0 : galleryImages.length - 1);
    } else {
      // Currently viewing gallery image
      if (direction === 'next') {
        setSelectedImageIndex(selectedImageIndex < galleryImages.length - 1 ? selectedImageIndex + 1 : -1);
      } else {
        setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : -1);
      }
    }
  };

  const navigateVideo = (direction: 'prev' | 'next') => {
    if (selectedVideoIndex === null) return;
    
    if (direction === 'next') {
      setSelectedVideoIndex(selectedVideoIndex < youtubeVideos.length - 1 ? selectedVideoIndex + 1 : 0);
    } else {
      setSelectedVideoIndex(selectedVideoIndex > 0 ? selectedVideoIndex - 1 : youtubeVideos.length - 1);
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
          <div className="relative max-w-4xl max-h-full w-full">
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute -top-12 right-0 text-white text-xl hover:text-gray-300 z-10 bg-gray-800 px-3 py-1 rounded-lg"
            >
              ✕ Close
            </button>
            <img
              src={selectedImageIndex === -1 ? mainImageUrl || '' : galleryImages[selectedImageIndex] || ''}
              alt={`${service.name} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {(galleryImages.length > 0 || mainImageUrl) && (
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => navigateImage('prev')}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-white self-center px-4 py-2 bg-gray-800 rounded-lg">
                  {selectedImageIndex === -1 ? 'Main Image' : `Image ${selectedImageIndex + 1} of ${galleryImages.length}`}
                </span>
                <button
                  onClick={() => navigateImage('next')}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
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
              className="absolute -top-12 right-0 text-white text-xl hover:text-gray-300 z-10 bg-gray-800 px-3 py-1 rounded-lg"
            >
              ✕ Close
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={youtubeVideos[selectedVideoIndex]?.embedUrl || ''}
                className="w-full h-full"
                allowFullScreen
                title={`${service.name} Service Video ${selectedVideoIndex + 1}`}
                loading="lazy"
              />
            </div>
            {youtubeVideos.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => navigateVideo('prev')}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-white self-center px-4 py-2 bg-gray-800 rounded-lg">
                  Video {selectedVideoIndex + 1} of {youtubeVideos.length}
                </span>
                <button
                  onClick={() => navigateVideo('next')}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
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

      {/* CLEAN GREEN HERO SECTION */}
      <section className="bg-green-600 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Service Type/Category */}
            <div className="inline-flex items-center gap-2 bg-green-500 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-300 rounded-full"></span>
              <span className="text-green-100 text-sm font-medium">
                {service.category || 'Waste Management Service'}
              </span>
            </div>

            {/* Service Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {service.name}
            </h1>

            {/* Service Description */}
            <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">
              {service.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/quote"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-3 shadow-lg w-full sm:w-auto justify-center border-2 border-white rounded-lg"
              >
                <svg
                  className="w-5 h-5"
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
                className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200 inline-flex items-center gap-3 w-full sm:w-auto justify-center border-2 border-white rounded-lg"
              >
                <svg
                  className="w-5 h-5"
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

      {/* MAIN CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Media Section - Reduced height */}
          <div className="space-y-6">
            {/* Main Video or Image - Reduced height */}
            {youtubeVideos.length > 0 ? (
              <div className="h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg border border-gray-300">
                <iframe
                  src={`${youtubeVideos[0].embedUrl}?rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allowFullScreen
                  title={`${service.name} Service Video - Sylvie Garbage Collection Waste Management`}
                  loading="lazy"
                />
              </div>
            ) : mainImageUrl ? (
              <div className="h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg border border-gray-300 cursor-pointer">
                <img
                  src={mainImageUrl}
                  alt={`${service.name} Service - Professional Waste Management by Sylvie Garbage Collection`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onClick={() => setSelectedImageIndex(-1)}
                />
              </div>
            ) : (
              <div className="h-64 sm:h-80 bg-green-100 rounded-lg flex items-center justify-center text-green-800 text-lg font-medium border-2 border-green-300">
                {service.name} Service Image
              </div>
            )}

            {/* Additional Videos - Smaller */}
            {youtubeVideos.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">More Videos</h3>
                <div className="grid grid-cols-2 gap-3">
                  {youtubeVideos.slice(1).map((video, index) => (
                    <div 
                      key={index}
                      className="h-32 rounded-lg overflow-hidden cursor-pointer hover:brightness-95 transition-all border border-gray-300 relative"
                      onClick={() => setSelectedVideoIndex(index + 1)}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={`${service.name} - Video ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Thumbnails - Smaller */}
            {galleryImages.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Gallery Images</h3>
                <div className="grid grid-cols-3 gap-2">
                  {mainImageUrl && youtubeVideos.length === 0 && (
                    <div 
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:brightness-95 transition-all border-2 border-green-500"
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
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:brightness-95 transition-all border border-gray-300"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${service.name} - Gallery Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Highlights - Compact */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-100 rounded-lg p-3 text-center border-2 border-green-300">
                <div className="text-green-700 font-bold text-sm">✓ Certified</div>
                <div className="text-green-800 text-xs">Professional Team</div>
              </div>
              <div className="bg-green-100 rounded-lg p-3 text-center border-2 border-green-300">
                <div className="text-green-700 font-bold text-sm">♻️ Eco-Friendly</div>
                <div className="text-green-800 text-xs">100% Recycling</div>
              </div>
              <div className="bg-green-100 rounded-lg p-3 text-center border-2 border-green-300">
                <div className="text-green-700 font-bold text-sm">⏰ 24/7</div>
                <div className="text-green-800 text-xs">Emergency Service</div>
              </div>
              <div className="bg-green-100 rounded-lg p-3 text-center border-2 border-green-300">
                <div className="text-green-700 font-bold text-sm">🏠</div>
                <div className="text-green-800 text-xs">Residential & Commercial</div>
              </div>
            </div>
          </div>

          {/* Tabs & Content */}
          <div>
            <div className="border-b-2 border-gray-300 mb-6">
              <nav className="flex space-x-8 overflow-x-auto">
                {['overview', 'features', 'benefits', 'gallery', 'videos'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`py-3 px-2 border-b-2 font-medium text-sm capitalize whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? 'border-green-600 text-green-700'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400'
                    }`}
                    aria-label={`View ${tab} for ${service.name} service`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="text-gray-800">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Overview</h2>
                  <p className="text-lg mb-4">{service.full_description || `Our ${service.name} service provides comprehensive waste management solutions for both residential and commercial properties across Kenya. We are committed to delivering reliable, efficient, and eco-friendly services that meet your specific needs.`}</p>
                  
                  <div className="bg-blue-100 border-l-4 border-blue-600 p-4 mb-6 rounded-lg">
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
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>{f}</span>
                        </li>
                      ))
                    ) : (
                      <div className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>Professional and trained waste management team</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>Eco-friendly disposal and recycling methods</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
                          <span>Flexible scheduling to suit your needs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
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
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>{b}</span>
                        </li>
                      ))
                    ) : (
                      <div className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>Cleaner and healthier environment for your property</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>Reduced risk of pests and contamination</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">🌿</span>
                          <span>Environmentally responsible waste disposal</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1 flex-shrink-0">🌿</span>
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {mainImageUrl && youtubeVideos.length === 0 && (
                        <div 
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:brightness-95 transition-all border-2 border-green-500"
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
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:brightness-95 transition-all border border-gray-300"
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
                    <p className="text-gray-600 text-center py-8 bg-gray-100 rounded-lg">No gallery images available for this service.</p>
                  )}
                </div>
              )}

              {activeTab === 'videos' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Videos</h2>
                  {youtubeVideos.length > 0 ? (
                    <div className="space-y-6">
                      {youtubeVideos.map((video, index) => (
                        <div key={index} className="border-2 border-gray-300 rounded-lg overflow-hidden">
                          <div className="aspect-video bg-black">
                            <iframe
                              src={`${video.embedUrl}?rel=0&modestbranding=1`}
                              className="w-full h-full"
                              allowFullScreen
                              title={`${service.name} Service Video ${index + 1}`}
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4 bg-gray-100">
                            <p className="text-sm text-gray-700">Video {index + 1} of {youtubeVideos.length}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8 bg-gray-100 rounded-lg">No videos available for this service.</p>
                  )}
                </div>
              )}
            </div>

            {/* Additional CTA */}
            <div className="mt-8 p-6 bg-white rounded-lg border-4 border-green-600 shadow-lg">
              <h3 className="text-2xl font-black text-black mb-4">Ready to Get Started?</h3>
              <p className="text-black mb-5 font-medium">
                Contact us today for a free consultation and quote for our {service.name} service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+254711515752"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-black hover:bg-green-800 transition-colors text-center border-4 border-green-600 no-underline"
                >
                  📞 Call Now: +254 711 515 752
                </a>
                <a
                  href="/contact"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-black hover:bg-green-600 hover:text-white transition-colors text-center border-4 border-green-600 no-underline"
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