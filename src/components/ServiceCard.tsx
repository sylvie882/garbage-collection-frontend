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
  const [clickedToPlay, setClickedToPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sylviegarbagecollection.co.ke';

  // ✅ IMPROVED YouTube video ID extractor - handles all formats
  const getYouTubeId = (url: string | null) => {
    if (!url) return null;
    
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/, // Standard URLs
      /youtube\.com\/shorts\/([^"&?\/\s]{11})/, // Shorts URLs
      /youtube\.com\/watch\?v=([^"&?\/\s]{11})/, // Watch URLs
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Handle channel URLs separately - they can't be embedded as videos
    if (url.includes('youtube.com/@')) {
      return null;
    }

    return null;
  };

  // Handle multiple YouTube URLs or single URL
  const youtubeUrls = service.youtube_url ? [service.youtube_url] : [];
  const firstVideoId = youtubeUrls.length > 0 ? getYouTubeId(youtubeUrls[0]) : null;

  // ✅ Consistent image URL resolution
  const getImageUrl = () => {
    // ✅ Only return image URL if there's no YouTube video
    if (firstVideoId) return null;

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

  // ✅ FIXED YouTube embed - Auto-play muted, no loop
  const getYouTubeEmbedUrl = (id: string, autoplay = false, muted = true) => {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      controls: '1',
      enablejsapi: '0',
      mute: muted ? '1' : '0',
    });
    
    if (autoplay) {
      params.append('autoplay', '1');
    }
    
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  };

  const handlePlayClick = () => {
    setClickedToPlay(true);
    setVideoStarted(true);
    setIsMuted(false); // Unmute when user clicks to play
  };

  const handleUnmuteClick = () => {
    setIsMuted(false);
  };

  // ✅ Auto-play when visible - muted by default
  useEffect(() => {
    if (!firstVideoId) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        // Auto-play when visible (muted by default)
        if (visible && !videoStarted && document.hasFocus()) {
          setVideoStarted(true);
        } else if (!visible && videoStarted) {
          setVideoStarted(false);
        }
      },
      { threshold: 0.7, rootMargin: '100px' }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [firstVideoId, videoStarted]);

  // ✅ Handle iframe load and error events
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      console.log('YouTube iframe loaded successfully');
    };

    const handleError = () => {
      console.error('YouTube iframe failed to load');
      setVideoStarted(false);
      setClickedToPlay(false);
    };

    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, [videoStarted]);

  // ✅ URL builder
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

  // ✅ FIXED: Ensure features is always an array before mapping
  const getFeaturesToDisplay = () => {
    // Check if features exists and is an array with items
    if (Array.isArray(service.features) && service.features.length > 0) {
      return service.features.slice(0, 3);
    }
    // Fallback to default features
    return ['Expert Team', 'Quality Guaranteed', 'Eco-Friendly'];
  };

  const featuresToDisplay = getFeaturesToDisplay();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group">
      {/* Image or Video Container */}
      <div ref={videoRef} className="h-48 relative overflow-hidden bg-gray-900 rounded-t-2xl">
        {/* YouTube Video - Auto-play muted when visible */}
        {thumbnailType === 'youtube' && firstVideoId && videoStarted ? (
          <div className="relative w-full h-full">
            <iframe
              ref={iframeRef}
              src={getYouTubeEmbedUrl(firstVideoId, true, isMuted)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${service.name} - YouTube Video`}
              loading="lazy"
            />
            {/* Mute/Unmute overlay button */}
            {isMuted && (
              <div 
                className="absolute bottom-3 right-3 bg-black/80 text-white p-2 rounded-full cursor-pointer hover:bg-black transition-all duration-300"
                onClick={handleUnmuteClick}
                title="Click to unmute"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              </div>
            )}
          </div>
        ) : thumbnailType === 'youtube' && firstVideoId ? (
          <div className="relative w-full h-full cursor-pointer" onClick={handlePlayClick}>
            <img
              src={`https://img.youtube.com/vi/${firstVideoId}/maxresdefault.jpg`}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.src = `https://img.youtube.com/vi/${firstVideoId}/hqdefault.jpg`;
              }}
            />
            {/* YouTube Play Button Overlay - Click to play with sound */}
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-all duration-300">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        ) : null}

        {/* Image - SECOND PRIORITY (only if no YouTube) */}
        {thumbnailType === 'image' && imageUrl && (
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
            <span className="text-4xl text-green-600">
              {service.icon || '🗑️'}
            </span>
          </div>
        )}

        {/* YouTube Badge - Top Right */}
        {thumbnailType === 'youtube' && firstVideoId && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            Video
          </div>
        )}

        {/* Video Count Badge (if multiple videos) */}
        {youtubeUrls.length > 1 && (
          <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            +{youtubeUrls.length - 1} more
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Featured and Category badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Featured Badge */}
          {service.featured && (
            <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
              ⭐ Featured
            </span>
          )}

          {/* Category Badge */}
          {service.category && (
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
              {service.category}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {service.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {service.description ||
            'Professional service with expert team and quality guaranteed.'}
        </p>

        {/* ✅ FIXED: Features with proper array validation */}
        <ul className="space-y-1.5 mb-3">
          {featuresToDisplay.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Duration & Frequency */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.duration && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs whitespace-nowrap">
              ⏱️ {service.duration}
            </span>
          )}
          {service.frequency && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs whitespace-nowrap">
              🔄 {service.frequency}
            </span>
          )}
        </div>

        {/* Only View Details button */}
        <div className="flex justify-end border-t border-gray-100 pt-3">
          <Link 
            href={serviceUrl}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
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