import Link from 'next/link';
import { Service } from '../types';

interface RelatedServicesProps {
  services: Service[];
}

export default function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((service) => (
        <div key={service.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {service.description || 'Professional service to meet your needs.'}
          </p>
          <Link 
            href={`/services/${service.id}`}
            className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors inline-flex items-center gap-1"
          >
            View Details
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
}