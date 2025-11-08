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

  return (
    <>
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
              {service.category || 'Professional Service'}
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
              </div>
            )}
            {service.duration && (
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
                <div className="text-xl font-bold text-white">{service.duration}</div>
                <div className="text-green-100 text-sm">Service Duration</div>
              </div>
            )}
            {service.frequency && (
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
                <div className="text-xl font-bold text-white">{service.frequency}</div>
                <div className="text-green-100 text-sm">Frequency</div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quote"
              className="group bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 inline-flex items-center gap-3 shadow-xl hover:scale-105"
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
              Get Free Quote
            </a>
            <a
              href="/contact"
              className="group border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-green-800 transition-all duration-300 inline-flex items-center gap-3 backdrop-blur-sm hover:scale-105"
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
              Contact Expert
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
                  title={`${service.name} video`}
                />
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={service.name}
                className="rounded-2xl w-full h-auto object-cover shadow-2xl"
              />
            ) : (
              <div className="aspect-video bg-green-50 rounded-2xl flex items-center justify-center text-green-700 text-lg font-medium">
                No Image Available
              </div>
            )}
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
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {activeTab === 'overview' && (
                <p>{service.full_description || 'Comprehensive overview of our service.'}</p>
              )}

              {activeTab === 'features' && (
                <ul className="space-y-2">
                  {service.features?.length ? (
                    service.features.map((f, i) => <li key={i}>✅ {f}</li>)
                  ) : (
                    <p>No specific features listed.</p>
                  )}
                </ul>
              )}

              {activeTab === 'benefits' && (
                <ul className="space-y-2">
                  {service.benefits?.length ? (
                    service.benefits.map((b, i) => <li key={i}>🌿 {b}</li>)
                  ) : (
                    <p>No specific benefits listed.</p>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
