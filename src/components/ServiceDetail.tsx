// src/components/ServiceDetail.tsx
'use client';

import { Service } from '@/types';
import { useState } from 'react';

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'benefits'>('overview');

  // Get image URL - FIXED: Use imagePath instead of image_path
  const getImageUrl = () => {
    if (service.imagePath) {
      if (service.imagePath.startsWith('http')) {
        return service.imagePath;
      } else {
        // Use environment variable for API URL
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        return `${API_URL}/storage/${service.imagePath}`;
      }
    }
    return null;
  };

  const imageUrl = getImageUrl();

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // FIXED: Use youtubeUrl instead of youtube_url
  const videoId = service.youtubeUrl ? getYouTubeId(service.youtubeUrl) : null;

  return (
    <>
      {/* Hero Section with Service Image Background */}
      <section 
        className="relative py-20 lg:py-28 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: imageUrl ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${imageUrl})` : 'linear-gradient(to right, #065f46, #047857)'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-green-600/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-green-400/30">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              <span className="text-green-100 text-sm font-medium tracking-wide">
                {service.category || 'Professional Service'}
              </span>
            </div>

            {/* Service Title */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {service.name}
            </h1>

            {/* Service Description */}
            <p className="text-xl lg:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
              {service.price && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">KSh {service.price}</div>
                  <div className="text-green-200 text-sm">
                    {/* FIXED: Use priceUnit instead of price_unit */}
                    {service.priceUnit ? `per ${service.priceUnit}` : 'Starting from'}
                  </div>
                </div>
              )}
              
              {service.duration && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <div className="text-xl font-bold text-white">{service.duration}</div>
                  <div className="text-green-200 text-sm">Service Duration</div>
                </div>
              )}

              {service.frequency && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <div className="text-xl font-bold text-white">{service.frequency}</div>
                  <div className="text-green-200 text-sm">Frequency</div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="group bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-orange-500/25 hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Get Free Quote
              </a>
              <a
                href="/contact"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-green-800 transition-all duration-300 inline-flex items-center gap-3 backdrop-blur-sm hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Contact Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Media Section */}
            <div className="space-y-6">
              {videoId ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${service.name} video`}
                  />
                </div>
              ) : imageUrl ? (
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={imageUrl}
                    alt={service.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-green-800 font-medium">Service Image</span>
                  </div>
                </div>
              )}

              {/* Additional Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                {service.price && (
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 text-center shadow-lg">
                    <div className="text-2xl font-bold">KSh {service.price}</div>
                    <div className="text-green-100 text-sm">
                      {/* FIXED: Use priceUnit instead of price_unit */}
                      {service.priceUnit ? `per ${service.priceUnit}` : 'Starting from'}
                    </div>
                  </div>
                )}
                
                {service.duration && (
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 text-center shadow-lg">
                    <div className="text-lg font-bold">{service.duration}</div>
                    <div className="text-blue-100 text-sm">Duration</div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {['overview', 'features', 'benefits'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as 'overview' | 'features' | 'benefits')}
                      className={`py-3 px-2 border-b-2 font-medium text-sm capitalize transition-all duration-300 ${
                        activeTab === tab
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="prose prose-lg max-w-none">
                {activeTab === 'overview' && (
                  <div>
                    {/* FIXED: Use fullDescription instead of full_description */}
                    {service.fullDescription ? (
                      <div className="text-gray-600 leading-relaxed text-lg">
                        {service.fullDescription}
                      </div>
                    ) : (
                      <div className="text-gray-600 leading-relaxed text-lg">
                        <p>This professional service provides comprehensive solutions tailored to your specific needs. 
                        Our expert team ensures quality delivery and customer satisfaction.</p>
                        
                        {service.duration && (
                          <div className="mt-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <strong className="text-green-800">Service Duration:</strong> 
                            <span className="text-gray-700 ml-2">{service.duration}</span>
                          </div>
                        )}
                        
                        {service.frequency && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <strong className="text-blue-800">Frequency:</strong> 
                            <span className="text-gray-700 ml-2">{service.frequency}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    {service.features && service.features.length > 0 ? (
                      <ul className="space-y-4">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <svg className="w-6 h-6 text-green-500 mt-0.5 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 text-lg">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500 italic text-center py-8">
                        No specific features listed for this service.
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div>
                    {service.benefits && service.benefits.length > 0 ? (
                      <ul className="space-y-4">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <svg className="w-6 h-6 text-green-500 mt-0.5 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 text-lg">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500 italic text-center py-8">
                        No specific benefits listed for this service.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}