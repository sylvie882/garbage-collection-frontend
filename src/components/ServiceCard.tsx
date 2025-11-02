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

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = service.youtube_url ? getYouTubeId(service.youtube_url) : null;

  // Get image URL
  const getImageUrl = () => {
    if (service.image_path) {
      if (service.image_path.startsWith('http')) {
        return service.image_path;
      } else {
        return `http://localhost:8000/storage/${service.image_path}`;
      }
    }
    return null;
  };

  const imageUrl = getImageUrl();

  // YouTube embed URL with proper parameters for autoplay with sound and controls
  const getYouTubeEmbedUrl = (id: string, autoplay: boolean = false) => {
    const params = new URLSearchParams({
      'rel': '0',
      'modestbranding': '1',
      'playsinline': '1',
      'controls': '1',
      'enablejsapi': '1',
      'loop': '1',
      'playlist': id,
      'mute': '0',
    });

    if (autoplay) {
      params.append('autoplay', '1');
    }

    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  };

  // Handle video end to restart it
  const handleVideoEnd = () => {
    if (iframeRef.current && videoId) {
      iframeRef.current.src = getYouTubeEmbedUrl(videoId, true);
    }
  };

  // Intersection Observer to auto-play when card becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && videoId && !videoStarted) {
          setVideoStarted(true);
        }
        
        if (!isIntersecting && videoStarted) {
          setVideoStarted(false);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '50px'
      }
    );

    if (videoRef.current && videoId) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoId, videoStarted]);

  // FIXED: Generate proper service URL that matches your API
  const getServiceUrl = () => {
    // Priority: Use the service's actual slug if it exists and is valid
    if (service.slug && service.slug.trim() !== '' && service.slug !== 'd') {
      console.log('✅ Using valid service.slug:', service.slug);
      return `/services/${service.slug}`;
    } 
    // Fallback: Use ID if slug is invalid or missing
    else if (service.id) {
      console.log('⚠️ Using service.id as fallback:', service.id, 'because slug was:', service.slug);
      return `/services/${service.id}`;
    } 
    // Last resort: Generate from name
    else {
      const generatedSlug = service.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      console.log('⚠️ Generated slug from name:', generatedSlug);
      return `/services/${generatedSlug}`;
    }
  };

  const serviceUrl = getServiceUrl();

  // Debug the service data and final URL
  useEffect(() => {
    console.log('🔍 ServiceCard Debug:', {
      id: service.id,
      name: service.name,
      slug: service.slug,
      finalUrl: serviceUrl
    });
  }, [service, serviceUrl]);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 group">
      {/* Video or Image Section */}
      <div 
        ref={videoRef}
        className="h-48 relative overflow-hidden bg-gray-900"
      >
        {videoId && videoStarted ? (
          <div className="w-full h-full">
            <iframe
              ref={iframeRef}
              src={getYouTubeEmbedUrl(videoId, true)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={`${service.name} video`}
              loading="lazy"
              onEnded={handleVideoEnd}
            />
            <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              Auto-playing
            </div>
          </div>
        ) : videoId ? (
          <div className="w-full h-full relative">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.includes('maxresdefault')) {
                  target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
                } else if (target.src.includes('sddefault')) {
                  target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                } else {
                  target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                }
              }}
            />
            {isVisible && !videoStarted && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <div className="text-sm">Loading video...</div>
                </div>
              </div>
            )}
            {isVisible && !videoStarted && (
              <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                Auto-play when visible
              </div>
            )}
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              console.error('Failed to load image:', imageUrl);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-green-800 font-medium text-sm">Service Image</span>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        {service.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-opacity-90">
              {service.category}
            </span>
          </div>
        )}
      </div>

      {/* Service Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
          {service.name}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {service.description || 'Professional service with expert team and quality guaranteed.'}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {service.features && service.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </div>
          ))}
          {(!service.features || service.features.length === 0) && (
            <>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Expert Team
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Quality Guaranteed
              </div>
            </>
          )}
          {videoId && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Video Demonstration
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          {service.price ? (
            <div className="text-left">
              <span className="text-2xl font-bold text-green-600">KSh {service.price}</span>
              {service.price_unit && (
                <span className="text-gray-500 text-sm ml-1">/{service.price_unit}</span>
              )}
            </div>
          ) : (
            <div className="text-left">
              <span className="text-lg font-semibold text-green-600">Custom Quote</span>
            </div>
          )}
          
          {/* FIXED: Use the generated serviceUrl */}
          <Link
            href={serviceUrl}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm flex items-center gap-2 group/btn"
          >
            View Details
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}