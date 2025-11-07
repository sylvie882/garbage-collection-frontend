// src/components/ServiceCard.tsx
'use client';

import Link from 'next/link';
import { Service } from '@/types';
import { useState, useRef, useEffect } from 'react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [videoStarted, setVideoStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://api.sylviegarbagecollection.co.ke';

  // ✅ YouTube video ID extractor
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = service.youtubeUrl ? getYouTubeId(service.youtubeUrl) : null;

  // ✅ Consistent image URL resolution
 const getImageUrl = () => {
  // ✅ Prefer full URL from backend if available
  if (service.imageUrl) return service.imageUrl;

  if (service.imagePath) {
    // ✅ Use environment variable for API URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return service.imagePath.startsWith('http')
      ? service.imagePath
      : `${API_URL}/storage/${service.imagePath}`;
  }

  return null;
};


  const imageUrl = getImageUrl();

  // ✅ YouTube embed
  const getYouTubeEmbedUrl = (id: string, autoplay = false) => {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      controls: '1',
      enablejsapi: '1',
      loop: '1',
      playlist: id,
      mute: '0',
    });
    if (autoplay) params.append('autoplay', '1');
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  };

  const handleVideoEnd = () => {
    if (iframeRef.current && videoId) {
      iframeRef.current.src = getYouTubeEmbedUrl(videoId, true);
    }
  };

  // ✅ Auto-play when visible
  useEffect(() => {
    if (!videoId) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible && !videoStarted) setVideoStarted(true);
        else if (!visible && videoStarted) setVideoStarted(false);
      },
      { threshold: 0.5, rootMargin: '50px' }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [videoId, videoStarted]);

  // ✅ URL builder
  const getServiceUrl = () => {
    if (service.slug && service.slug.trim() && service.slug !== 'd')
      return `/services/${service.slug}`;
    if (service.id) return `/services/${service.id}`;
    const slugFromName = service.name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return `/services/${slugFromName}`;
  };

  const serviceUrl = getServiceUrl();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 group">
      {/* Image or Video */}
      <div ref={videoRef} className="h-48 relative overflow-hidden bg-gray-900">
        {videoId && videoStarted ? (
          <iframe
            ref={iframeRef}
            src={getYouTubeEmbedUrl(videoId, true)}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={service.name}
            loading="lazy"
            onEnded={handleVideoEnd}
          />
        ) : videoId ? (
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={service.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
        ) : (
          <img
            src={imageUrl}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg';
            }}
          />
        )}

        {/* Category Badge */}
        {service.category && (
          <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {service.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition">
          {service.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {service.description ||
            'Professional service with expert team and quality guaranteed.'}
        </p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {(service.features?.length
            ? service.features.slice(0, 3)
            : ['Expert Team', 'Quality Guaranteed']
          ).map((f, i) => (
            <li key={i} className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* Price & CTA */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            {service.price ? (
              <p className="text-green-600 text-lg font-semibold">
                KSh {service.price}
                {service.priceUnit && (
                  <span className="text-gray-500 text-sm ml-1">
                    /{service.priceUnit}
                  </span>
                )}
              </p>
            ) : (
              <p className="text-green-600 font-medium text-sm">Custom Quote</p>
            )}
          </div>

          <Link
            href={serviceUrl}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-2 transition"
          >
            View Details
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
