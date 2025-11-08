// src/app/services/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Service } from '@/types';
import ServiceDetail from '@/components/ServiceDetail';
import RelatedServices from '@/components/RelatedServices';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Disable caching for dynamic content
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getService(slug: string): Promise<Service | null> {
  try {
    console.log('🔍 [SERVER] Looking for service with slug:', slug);
    
    // First, try to fetch all services and find the matching one
    const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/services', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status}`);
    }
    
    const services = await response.json();
    
    if (!Array.isArray(services)) {
      console.error('🚨 [SERVER] Services is not an array:', typeof services);
      return null;
    }
    
    console.log('📦 [SERVER] Total services available:', services.length);
    
    // Log all slugs for debugging
    const availableSlugs = services.map((s: Service) => s.slug);
    console.log('📝 [SERVER] Available slugs:', availableSlugs);
    
    // Try to find service by slug (exact match)
    let foundService = services.find((service: Service) => 
      service.slug === slug
    );
    
    if (foundService) {
      console.log('✅ [SERVER] Service found by exact slug:', foundService.name);
      return foundService;
    }
    
    // Try case-insensitive match
    foundService = services.find((service: Service) => 
      service.slug?.toLowerCase() === slug.toLowerCase()
    );
    
    if (foundService) {
      console.log('✅ [SERVER] Service found by case-insensitive match:', foundService.name);
      return foundService;
    }
    
    // Try to find service by ID if slug is numeric
    if (!isNaN(Number(slug))) {
      foundService = services.find((service: Service) => 
        service.id.toString() === slug
      );
      
      if (foundService) {
        console.log('✅ [SERVER] Service found by ID:', foundService.name);
        return foundService;
      }
    }
    
    console.log('❌ [SERVER] No service found for slug after all attempts:', slug);
    return null;
    
  } catch (error: unknown) {
    console.error('🚨 [SERVER] Error in getService:', error);
    return null;
  }
}

async function getRelatedServices(currentService: Service): Promise<Service[]> {
  try {
    const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/services', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }
    
    const services = await response.json();
    
    if (!Array.isArray(services)) {
      return [];
    }
    
    const related = services.filter(
      (service: Service) => 
        service.id !== currentService.id && 
        service.category === currentService.category
    );
    
    return related.slice(0, 3);
  } catch (error) {
    console.error('🚨 [SERVER] Error fetching related services:', error);
    return [];
  }
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  console.log('🔍 [PAGE] ServiceDetailPage rendering');
  
  // Safely extract slug from params
  let slug: string;
  try {
    const resolvedParams = await params;
    slug = resolvedParams.slug;
    console.log('📦 [PAGE] Received slug:', slug);
  } catch (error) {
    console.error('❌ [PAGE] Error reading params:', error);
    notFound();
  }
  
  if (!slug) {
    console.log('❌ [PAGE] No slug provided');
    notFound();
  }

  const service = await getService(slug);

  if (!service) {
    console.log('❌ [PAGE] Service not found for slug:', slug);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            The service "{slug}" could not be found.
          </p>
          <div className="space-x-4">
            <Link 
              href="/services"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Services
            </Link>
            <Link 
              href="/"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  console.log('✅ [PAGE] Service loaded successfully:', service.name);

  const relatedServices = await getRelatedServices(service);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <ServiceDetail service={service} />

      {relatedServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Related Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore other services in the same category
              </p>
            </div>
            <RelatedServices services={relatedServices} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact us today to schedule your service or get a free quote. 
            Our team is ready to assist you with professional solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/quote" 
              className="group bg-gradient-to-r from-orange-500 to-amber-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-orange-500/25 hover:scale-105"
            >
              Get Instant Quote
            </Link>
            <Link 
              href="/contact" 
              className="group border-2 border-white/80 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:scale-105"
            >
              Talk to Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  let slug: string;
  try {
    const resolvedParams = await params;
    slug = resolvedParams.slug;
  } catch (error) {
    return {
      title: 'Service Details',
    };
  }
  
  try {
    const service = await getService(slug);
    
    if (!service) {
      return {
        title: 'Service Not Found',
      };
    }

    return {
      title: `${service.name} | Sylvie Garbage Collection`,
      description: service.description,
    };
  } catch (error) {
    return {
      title: 'Service Details',
    };
  }
}