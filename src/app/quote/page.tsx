import Header from '@/./components/Header';
import Footer from '@/./components/Footer';
import QuoteForm from '../../components/QuoteForm';
import FloatingButtons from '../../components/FloatingButtons';

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
      <Header />
      
      {/* Enhanced Breadcrumb */}
      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="text-white text-sm font-medium">
            <a href="/" className="hover:text-green-200 transition-colors duration-300">Home</a>
            <span className="mx-2">/</span>
            <span className="text-green-200 font-semibold">Request Quote</span>
          </nav>
        </div>
      </section>

      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 text-green-600 font-semibold text-sm uppercase tracking-wider mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              Get Your Custom Quote
              <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"></div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Request Your <span className="text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">Quote</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl border border-green-200">
              Get a free, no-obligation quote for our professional waste management services. 
              We'll get back to you within 24 hours with competitive pricing.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Enhanced Quote Form Container */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl p-8 lg:p-12 mb-16 border-2 border-green-200 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-100 rounded-full translate-x-24 translate-y-24 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Tell Us About Your Needs
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Fill out the form below and we'll provide you with a customized quote
                  </p>
                </div>
                <QuoteForm />
              </div>
            </div>

            {/* Enhanced Info Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: 'Fast Response',
                  description: 'We typically respond to quote requests within 2-4 hours during business days.',
                  icon: '⚡',
                  gradient: 'from-yellow-400 to-amber-500',
                  bg: 'bg-gradient-to-br from-amber-50 to-yellow-100'
                },
                {
                  title: 'Transparent Pricing',
                  description: 'No hidden fees. We provide detailed, transparent pricing for all our services.',
                  icon: '💰',
                  gradient: 'from-green-500 to-emerald-600',
                  bg: 'bg-gradient-to-br from-green-50 to-emerald-100'
                },
                {
                  title: 'Expert Consultation',
                  description: 'Get free expert advice on the best waste management solutions for your needs.',
                  icon: '👨‍💼',
                  gradient: 'from-blue-500 to-cyan-600',
                  bg: 'bg-gradient-to-br from-blue-50 to-cyan-100'
                }
              ].map((item, index) => (
                <div key={index} className={`${item.bg} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-3 p-8 border-2 border-white relative overflow-hidden group`}>
                  {/* Background pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Contact Alternatives */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
              {/* Background pattern */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Prefer to Talk Directly?
                </h3>
                <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                  Our team is ready to assist you with personalized service recommendations and immediate quotes.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a 
                    href="tel:+254794416120"
                    className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-green-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us: (+254) 794 416 120
                  </a>
                  <a 
                    href="mailto:info@sylviegarbagecollection.co.ke"
                    className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-3 border-2 border-white hover:border-green-200 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Services Preview */}
            <div className="mt-20 text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Popular Services
              </h3>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                We offer comprehensive waste management solutions for residential, commercial, and industrial clients.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Residential', icon: '🏠', color: 'bg-blue-100 text-blue-700' },
                  { name: 'Commercial', icon: '🏢', color: 'bg-green-100 text-green-700' },
                  { name: 'Industrial', icon: '🏭', color: 'bg-orange-100 text-orange-700' },
                  { name: 'Recycling', icon: '♻️', color: 'bg-emerald-100 text-emerald-700' }
                ].map((service, index) => (
                  <div key={index} className={`${service.color} rounded-xl p-6 text-center font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <div>{service.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
}