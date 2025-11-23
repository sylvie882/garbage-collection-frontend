// src/components/ServiceCard.tsx
'use client';

import Link from 'next/link';
import { Service } from '../types';
import { useState, useRef, useEffect } from 'react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [videoStarted, setVideoStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sylviegarbagecollection.co.ke';

  // ✅ YouTube video ID extractor
  const getYouTubeId = (url: string | null) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  // Handle multiple YouTube URLs or single URL
  const youtubeUrls = service.youtube_urls || (service.youtube_url ? [service.youtube_url] : []);
  const firstVideoId = youtubeUrls.length > 0 ? getYouTubeId(youtubeUrls[0]) : null;

  // ✅ Consistent image URL resolution
  const getImageUrl = () => {
    // ✅ Prefer full URL from backend if available
    if (service.image_url) return service.image_url;

    if (service.image_path) {
      return service.image_path.startsWith('http')
        ? service.image_path
        : `${API_URL}/storage/${service.image_path}`;
    }

    return '/placeholder.jpg';
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
    if (iframeRef.current && firstVideoId) {
      iframeRef.current.src = getYouTubeEmbedUrl(firstVideoId, true);
    }
  };

  // ✅ Auto-play when visible
  useEffect(() => {
    if (!firstVideoId) return;

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
  }, [firstVideoId, videoStarted]);

  // ✅ URL builder - FIXED
  const getServiceUrl = () => {
    if (service.slug && service.slug.trim() && service.slug !== 'd')
      return `/services/${service.slug}`;
    if (service.id) return `/services/${service.id}`;
    const slugFromName = service.name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return `/services/${slugFromName || 'service'}`;
  };

  const serviceUrl = getServiceUrl();

  // Get thumbnail type (YouTube first, then image, then icon)
  const getThumbnailType = () => {
    if (firstVideoId) return 'youtube';
    if (imageUrl && imageUrl !== '/placeholder.jpg') return 'image';
    return 'icon';
  };

  const thumbnailType = getThumbnailType();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 group">
      {/* Image or Video */}
      <div ref={videoRef} className="h-48 relative overflow-hidden bg-gray-900">
        {/* YouTube Video - FIRST PRIORITY */}
        {thumbnailType === 'youtube' && firstVideoId && videoStarted ? (
          <iframe
            ref={iframeRef}
            src={getYouTubeEmbedUrl(firstVideoId, true)}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={service.name}
            loading="lazy"
            onEnded={handleVideoEnd}
          />
        ) : thumbnailType === 'youtube' && firstVideoId ? (
          <div className="relative w-full h-full">
            <img
              src={`https://img.youtube.com/vi/${firstVideoId}/maxresdefault.jpg`}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.src = `https://img.youtube.com/vi/${firstVideoId}/hqdefault.jpg`;
              }}
            />
            {/* YouTube Play Button Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-10 transition-all">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            {/* YouTube Badge */}
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Video
            </div>
          </div>
        ) : null}

        {/* Image - SECOND PRIORITY (only if no YouTube) */}
        {thumbnailType === 'image' && (
          <img
            src={imageUrl}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg';
            }}
          />
        )}

        {/* Icon - THIRD PRIORITY (only if no YouTube or image) */}
        {thumbnailType === 'icon' && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 group-hover:from-green-100 group-hover:to-emerald-200 transition-all">
            <span className="text-4xl text-green-600 group-hover:scale-110 transition-transform">
              {service.icon || '🗑️'}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {service.featured && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </span>
        )}

        {/* Category Badge */}
        {service.category && (
          <span className={`absolute top-3 ${
            service.featured ? 'left-24' : 'left-3'
          } bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium`}>
            {service.category}
          </span>
        )}

        {/* Video Count Badge (if multiple videos) */}
        {youtubeUrls.length > 1 && (
          <span className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            +{youtubeUrls.length - 1} more
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

        {/* Duration & Frequency */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.duration && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              ⏱️ {service.duration}
            </span>
          )}
          {service.frequency && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              🔄 {service.frequency}
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            {service.price ? (
              <p className="text-green-600 text-lg font-semibold">
                KSh {service.price}
                {service.price_unit && (
                  <span className="text-gray-500 text-sm ml-1">
                    /{service.price_unit}
                  </span>
                )}
              </p>
            ) : (
              <p className="text-green-600 font-medium text-sm">Contact for pricing</p>
            )}
          </div>

          {/* FIXED Link component */}
          <Link 
            href={serviceUrl}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-2 transition group/btn"
          >
            View Details
            <svg
              className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
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