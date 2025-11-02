// src/app/services/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceApi } from '@/lib/api';
import { Service } from '@/types';
import ServiceDetail from '@/components/ServiceDetail';
import RelatedServices from '@/components/RelatedServices';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

async function getService(slug: string): Promise<Service | null> {
  try {
    console.log('🔄 [SERVER] getService called with slug:', slug);
    
    // First try to get by slug
    try {
      const response = await serviceApi.getBySlug(slug);
      console.log('✅ [SERVER] Service found by slug:', response.data?.name);
      return response.data;
    } catch (slugError: any) {
      console.log('⚠️ [SERVER] Slug lookup failed, trying ID...');
      
      // If slug is numeric, try as ID
      if (!isNaN(Number(slug))) {
        try {
          const idResponse = await serviceApi.getById(parseInt(slug));
          console.log('✅ [SERVER] Service found by ID:', idResponse.data?.name);
          return idResponse.data;
        } catch (idError) {
          console.error('🚨 [SERVER] ID lookup also failed');
        }
      }
      
      // Last attempt: get all services and find matching one
      try {
        console.log('🔄 [SERVER] Trying to find service in all services...');
        const allResponse = await serviceApi.getAll();
        const foundService = allResponse.data.find((service: Service) => 
          service.slug === slug || 
          service.id.toString() === slug ||
          service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
        );
        
        if (foundService) {
          console.log('✅ [SERVER] Service found in all services:', foundService.name);
          return foundService;
        }
      } catch (allError) {
        console.error('🚨 [SERVER] All services lookup failed');
      }
      
      throw slugError;
    }
  } catch (error: any) {
    console.error('🚨 [SERVER] Error fetching service:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url
    });
    return null;
  }
}

async function getRelatedServices(currentService: Service): Promise<Service[]> {
  try {
    const response = await serviceApi.getAll();
    const services = response.data.filter(
      (service: Service) => 
        service.id !== currentService.id && 
        service.category === currentService.category
    );
    return services.slice(0, 3);
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
    notFound();
  }

  console.log('✅ [PAGE] Service loaded successfully:', service.name);

  const relatedServices = await getRelatedServices(service);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb Navigation */}
      {/* <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-green-600 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-gray-900">{service.name}</span>
          </div>
        </div>
      </nav> */}

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

      {/* CTA Section - This should be visible now */}
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
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Get Instant Quote
            </Link>
            <Link 
              href="/contact" 
              className="group border-2 border-white/80 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:scale-105"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Talk to Expert
            </Link>
          </div>
          <p className="text-green-200/80 text-sm mt-8">
            ✨ 100% Satisfaction Guarantee • No Hidden Fees • 24/7 Customer Support
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  console.log('🔄 [STATIC] Generating static params');
  try {
    const response = await serviceApi.getAll();
    console.log('📦 [STATIC] Services found:', response.data.length);
    
    const params = response.data.map((service: Service) => ({
      slug: service.slug || service.id.toString(),
    }));
    
    console.log('✅ [STATIC] Generated params:', params);
    return params;
  } catch (error) {
    console.error('🚨 [STATIC] Error generating params:', error);
    return [];
  }
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