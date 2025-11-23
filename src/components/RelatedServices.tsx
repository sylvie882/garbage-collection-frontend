import Link from 'next/link';
import { Service } from '../types';

interface RelatedServicesProps {
  services: Service[];
}

export default function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) return null;

  const getImageUrl = (service: Service) => {
    if (service.image_url) return service.image_url;
    if (service.image_path) {
      if (service.image_path.startsWith('http')) return service.image_path;
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sylviegarbagecollection.co.ke';
      return `${API_URL}/storage/${service.image_path}`;
    }
    return null;
  };

  const getYouTubeThumbnail = (service: Service) => {
    // Handle multiple YouTube URLs or single URL
    const youtubeUrls = service.youtube_url ? [service.youtube_url] : [];
    if (youtubeUrls.length === 0) return null;

    // Get the first YouTube URL
    const firstUrl = youtubeUrls[0];
    const match = firstUrl.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  };

  const getServiceThumbnail = (service: Service) => {
    // Priority: YouTube Thumbnail > Image > Default Icon
    const youtubeThumbnail = getYouTubeThumbnail(service);
    if (youtubeThumbnail) {
      return {
        type: 'youtube',
        url: youtubeThumbnail,
        alt: `${service.name} YouTube Video`
      };
    }

    const imageUrl = getImageUrl(service);
    if (imageUrl) {
      return {
        type: 'image',
        url: imageUrl,
        alt: `${service.name} Service`
      };
    }

    return {
      type: 'icon',
      icon: service.icon || '🗑️',
      alt: `${service.name} Service Icon`
    };
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service) => {
        const thumbnail = getServiceThumbnail(service);
        
        return (
          <div 
            key={service.id} 
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-green-200 group"
          >
            {/* Thumbnail Section */}
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {thumbnail.type === 'youtube' && (
                <div className="relative w-full h-full">
                  <img
                    src={thumbnail.url}
                    alt={thumbnail.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
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
              )}
              
              {thumbnail.type === 'image' && (
                <img
                  src={thumbnail.url}
                  alt={thumbnail.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              )}
              
              {thumbnail.type === 'icon' && (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 group-hover:from-green-100 group-hover:to-emerald-200 transition-all">
                  <span className="text-4xl text-green-600 group-hover:scale-110 transition-transform">
                    {thumbnail.icon}
                  </span>
                </div>
              )}

              {/* Service Status Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {service.featured && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
                {!service.is_active && (
                  <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                    Inactive
                  </span>
                )}
              </div>

              {/* Category Badge */}
              {service.category && (
                <div className="absolute bottom-2 left-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-700 transition-colors">
                {service.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {service.description || 'Professional service to meet your needs.'}
              </p>

              {/* Price & Details */}
              <div className="flex items-center justify-between mb-3">
                {service.price && (
                  <div className="text-green-600 font-semibold">
                    KSh {service.price}
                    {service.price_unit && (
                      <span className="text-gray-500 text-xs font-normal">/{service.price_unit}</span>
                    )}
                  </div>
                )}
                
                {(service.duration || service.frequency) && (
                  <div className="text-xs text-gray-500 text-right">
                    {service.duration && <div>{service.duration}</div>}
                    {service.frequency && <div>{service.frequency}</div>}
                  </div>
                )}
              </div>

              {/* Features Preview */}
              {service.features && service.features.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 2 && (
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                        +{service.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <Link 
                href={`/services/${service.slug || service.id}`}
                className="w-full bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2 group/btn"
              >
                View Details
                <svg 
                  className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}