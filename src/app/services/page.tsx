import Link from 'next/link';
import { Service } from '../../types';
import ServicesSearch from '../../components/ServicesSearch';
import ServiceCard from '../../components/ServiceCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SearchParams {
  search?: string;
  category?: string;
  page?: string;
}

// SEO Metadata
export const metadata = {
  title: 'Waste Management Services | Sylvie Garbage Collection Kenya',
  description: 'Professional waste management services in Kenya. Garbage collection, recycling, pest control & cleaning services for residential & commercial properties across Nairobi, Nakuru, Narok & Laikipia.',
  keywords: 'waste management services Kenya, garbage collection Nairobi, recycling services, pest control, cleaning services, commercial waste disposal, residential garbage collection',
  openGraph: {
    title: 'Professional Waste Management Services | Sylvie Garbage Collection',
    description: 'Comprehensive waste management solutions including garbage collection, recycling, pest control and cleaning services across Kenya.',
    type: 'website',
    locale: 'en_KE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Structured Data for Service Catalog
const generateStructuredData = (services: Service[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': 'Waste Management Services - Sylvie Garbage Collection',
  'description': 'Professional waste management and environmental services in Kenya',
  'url': 'https://sylviegarbagecollection.co.ke/services',
  'numberOfItems': services.length,
  'itemListElement': services.map((service, index) => ({
    '@type': 'Service',
    'position': index + 1,
    'name': service.name,
    'description': service.description,
    'serviceType': service.category || 'Waste Management',
    'areaServed': ['Nairobi', 'Nakuru', 'Narok', 'Laikipia'],
    'provider': {
      '@type': 'Organization',
      'name': 'Sylvie Garbage Collection',
      'url': 'https://sylviegarbagecollection.co.ke'
    }
  }))
});

async function getServices(params: SearchParams = {}): Promise<{
  services: Service[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}> {
  try {
    const { search, category, page = '1' } = params;
    
    // Use direct fetch instead of serviceApi
    const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/services', {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status}`);
    }
    
    let services = await response.json();
    
    // Ensure services is an array
    if (!Array.isArray(services)) {
      services = [];
    }

    // Apply search filter - FIXED: Added explicit Service type
    if (search) {
      services = services.filter((service: Service) =>
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter - FIXED: Added explicit Service type
    if (category && category !== 'all') {
      services = services.filter((service: Service) =>
        service.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Pagination - 12 services per page
    const currentPage = parseInt(page);
    const servicesPerPage = 12;
    const totalCount = services.length;
    const totalPages = Math.ceil(totalCount / servicesPerPage);
    
    const startIndex = (currentPage - 1) * servicesPerPage;
    const paginatedServices = services.slice(startIndex, startIndex + servicesPerPage);

    return {
      services: paginatedServices,
      totalCount,
      currentPage,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    return {
      services: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1
    };
  }
}

// Get unique categories for filter
async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/services', {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      return ['all'];
    }
    
    const services = await response.json();
    
    if (!Array.isArray(services)) {
      return ['all'];
    }
    
    // FIXED: Added explicit Service type to map function
    const categories = services
      .map((service: Service) => service.category)
      .filter(Boolean)
      .filter((category, index, self) => 
        self.indexOf(category) === index
      ) as string[];
    return ['all', ...categories];
  } catch (error) {
    return ['all'];
  }
}

export default async function ServicesPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams;
  const { services, totalCount, currentPage, totalPages } = await getServices(params);
  const categories = await getCategories();

  // Generate pagination range with ellipsis
  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    if (totalPages <= 1) return [1];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const paginationRange = getPaginationRange();

  // Generate structured data
  const structuredData = generateStructuredData(services);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Waste Management Services - Sylvie Garbage Collection Kenya</h1>
        <h2>Professional Garbage Collection & Environmental Services</h2>
        <p>
          Sylvie Garbage Collection offers comprehensive waste management services across Kenya including 
          Nairobi, Nakuru, Narok, and Laikipia counties. Our professional services include residential garbage 
          collection, commercial waste disposal, recycling programs, pest control, and cleaning services.
        </p>
        
        <h3>Our Service Categories</h3>
        <ul>
          <li>Residential Garbage Collection - Regular waste pickup for homes and apartments</li>
          <li>Commercial Waste Management - Business waste disposal solutions</li>
          <li>Recycling Services - Eco-friendly waste sorting and processing</li>
          <li>Pest Control Services - Effective pest elimination and prevention</li>
          <li>Cleaning Services - Professional cleaning and sanitation</li>
          <li>Industrial Waste Disposal - Specialized industrial waste management</li>
        </ul>

        <h4>Service Areas Covered</h4>
        <p>
          We provide waste management services throughout Kenya with focus on Nairobi County (Karen, Runda, 
          Westlands, Kilimani, Lavington), Nakuru County (Milimani, Naivasha), Narok County, and Laikipia County. 
          Our reliable garbage collection services ensure clean and healthy environments for residential and 
          commercial properties.
        </p>

        <h5>Why Choose Our Waste Management Services?</h5>
        <ul>
          <li>Experienced and qualified waste management professionals</li>
          <li>100% recycling commitment and eco-friendly practices</li>
          <li>24/7 emergency services and customer support</li>
          <li>Affordable pricing with flexible service plans</li>
          <li>Modern equipment and sustainable disposal methods</li>
          <li>Same-day service available in most areas</li>
        </ul>

        <p>
          With over {totalCount} professional services available, Sylvie Garbage Collection is your trusted 
          partner for all waste management needs in Kenya. Contact us today for free quotes and customized 
          service solutions.
        </p>
      </div>

      <Header />
      
      {/* Compact Professional Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 py-12 lg:py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        {/* Subtle Floating Elements */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-green-500/20 rounded-full blur-md"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-orange-400/10 rounded-full blur-lg"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Compact Heading - Only Our Services */}
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Professional <span className="text-orange-300">Waste Management</span> Services
          </h1>
          
          <p className="text-green-100 text-lg mb-8 max-w-3xl mx-auto">
            Comprehensive garbage collection, recycling, and environmental services across Kenya. 
            Serving residential, commercial, and industrial clients with 100% recycling commitment.
          </p>
          
          {/* Compact CTA Buttons - Only two buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link 
              href="/quote" 
              className="group bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-orange-500/25 hover:scale-105 transform"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Get Free Quote
            </Link>
            <Link 
              href="#services-grid"
              className="group border border-white/50 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:scale-105 transform"
            >
              <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Explore {totalCount}+ Services
            </Link>
          </div>

          {/* Service Coverage Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-green-600/30 text-green-100 px-4 py-2 rounded-full text-sm border border-green-500/30">
              🏙️ Nairobi County
            </span>
            <span className="bg-green-600/30 text-green-100 px-4 py-2 rounded-full text-sm border border-green-500/30">
              🏔️ Nakuru County
            </span>
            <span className="bg-green-600/30 text-green-100 px-4 py-2 rounded-full text-sm border border-green-500/30">
              🦁 Narok County
            </span>
            <span className="bg-green-600/30 text-green-100 px-4 py-2 rounded-full text-sm border border-green-500/30">
              🏞️ Laikipia County
            </span>
          </div>
        </div>
      </section>

      {/* Compact Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Find Waste Management Services
            </h2>
            <p className="text-sm text-gray-600">
              Search and filter our comprehensive service catalog
            </p>
          </div>
          <ServicesSearch 
            categories={categories}
            initialSearch={params.search}
            initialCategory={params.category}
          />
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services-grid" className="py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Our Service <span className="text-green-600">Catalog</span>
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                  <span className="font-semibold text-green-600">{totalCount}</span> Professional Services Available
                </span>
                {params.search && (
                  <span className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                    Search: <span className="font-medium">"{params.search}"</span>
                  </span>
                )}
                {params.category && params.category !== 'all' && (
                  <span className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                    Category: <span className="font-medium text-green-600">{params.category}</span>
                  </span>
                )}
              </div>
            </div>
            
            {/* Page Info */}
            <div className="bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-600">
                Page <span className="font-bold text-green-600">{currentPage}</span> of{' '}
                <span className="font-bold text-gray-900">{totalPages}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Showing {services.length} of {totalCount} services
              </div>
            </div>
          </div>

          {/* Services Grid */}
          {services.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Enhanced Professional Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-12 border-t border-gray-200/60">
                  {/* Results Summary */}
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, totalCount)}</span> of{' '}
                    <span className="font-semibold text-gray-900">{totalCount}</span> waste management services
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center space-x-3">
                    {/* Previous Button */}
                    <Link
                      href={{
                        pathname: '/services',
                        query: {
                          ...params,
                          page: currentPage - 1
                        }
                      }}
                      className={`group flex items-center px-6 py-3 border rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        currentPage === 1
                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-green-300 hover:text-green-700 hover:shadow-lg hover:scale-105'
                      }`}
                      aria-disabled={currentPage === 1}
                      tabIndex={currentPage === 1 ? -1 : undefined}
                    >
                      <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Link>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-2">
                      {paginationRange.map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500 font-medium">
                            ...
                          </span>
                        ) : (
                          <Link
                            key={page}
                            href={{
                              pathname: '/services',
                              query: {
                                ...params,
                                page: page as number
                              }
                            }}
                            className={`flex items-center justify-center w-12 h-12 text-sm font-semibold rounded-xl transition-all duration-300 ${
                              page === currentPage
                                ? 'bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg scale-105'
                                : 'bg-white border border-gray-300 text-gray-700 hover:border-green-300 hover:text-green-700 hover:shadow-md'
                            }`}
                          >
                            {page}
                          </Link>
                        )
                      ))}
                    </div>

                    {/* Next Button */}
                    <Link
                      href={{
                        pathname: '/services',
                        query: {
                          ...params,
                          page: currentPage + 1
                        }
                      }}
                      className={`group flex items-center px-6 py-3 border rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-green-300 hover:text-green-700 hover:shadow-lg hover:scale-105'
                      }`}
                      aria-disabled={currentPage === totalPages}
                      tabIndex={currentPage === totalPages ? -1 : undefined}
                    >
                      Next
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  {/* Quick Page Jump */}
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span>Go to page:</span>
                    <select 
                      className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      onChange={(e) => {
                        if (e.target.value) {
                          window.location.href = `/services?${new URLSearchParams({
                            ...params,
                            page: e.target.value
                          })}`;
                        }
                      }}
                      value={currentPage}
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <option key={page} value={page}>
                          {page}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No Waste Management Services Found
              </h3>
              <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg">
                {params.search 
                  ? `We couldn't find any waste management services matching "${params.search}". Try different keywords or browse our full catalog.`
                  : 'Our professional waste management service catalog is currently being updated. Please check back soon or contact us for immediate assistance.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/services"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Browse All Services
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Our Waste Management Experts
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:32px_32px]"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready for Professional Waste Management?
          </h2>
          <p className="text-lg text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied residential and commercial clients across Kenya who trust 
            Sylvie Garbage Collection for reliable, eco-friendly waste management solutions. 
            Get your personalized quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/quote" 
              className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-orange-500/25 hover:scale-105"
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
              Talk to Waste Management Expert
            </Link>
          </div>
          <p className="text-green-200/80 text-sm mt-8">
            ✨ 100% Recycling Commitment • 24/7 Emergency Services • Licensed & Insured • Eco-Friendly Solutions
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}