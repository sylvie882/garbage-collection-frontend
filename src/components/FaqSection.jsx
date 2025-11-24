'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://api.sylviegarbagecollection.co.ke';

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/api/faqs`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch FAQs: ${response.status}`);
      }
      
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setError('Failed to load FAQs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>💡</span>
              Common Questions
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're here to help you with any questions about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* FAQ Loading Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                  <div className="flex justify-between items-center">
                    <div className="space-y-3 flex-1">
                      <div className="h-6 bg-gray-200 rounded-lg w-4/5"></div>
                      <div className="h-4 bg-gray-200 rounded-lg w-3/5"></div>
                    </div>
                    <div className="w-6 h-6 bg-gray-200 rounded-full ml-4"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Image Loading Skeleton */}
            <div className="hidden lg:block">
              <div className="bg-gray-200 rounded-2xl shadow-lg w-full h-96 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>💡</span>
              Common Questions
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto mb-6">
              <div className="flex items-center gap-3 justify-center text-red-600 mb-2">
                <span>⚠️</span>
                <p className="font-semibold">Unable to load FAQs</p>
              </div>
              <p className="text-red-600 text-sm">
                {error}
              </p>
            </div>
            <button
              onClick={fetchFaqs}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>💡</span>
            Common Questions
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Get quick answers to common questions about our waste management services, 
            equipment, contracts, and customer support.
          </p>
        </div>

        {/* Main Content - FAQ Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* FAQ Items - Left Side */}
          <div className="space-y-6">
            {faqs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500 text-lg mb-4">No FAQs available at the moment.</p>
                <button
                  onClick={fetchFaqs}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Refresh FAQs
                </button>
              </div>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-green-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-4 focus:ring-green-500/20 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-sm">Q</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 pr-8 leading-relaxed group-hover:text-green-800 transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                    <span className={`transform transition-all duration-500 flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 ${
                      activeIndex === index ? 'rotate-180 bg-green-200' : ''
                    }`}>
                      <svg
                        className="w-5 h-5 text-green-700 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mt-1">
                          <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Attractive Image - Right Side */}
          <div className="hidden lg:block">
            <div className="relative rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="/images/faq-image.jpg"
                alt="Professional Waste Management Team"
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%234ade80'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3EWaste Management%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-green-900/20"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <h3 className="text-xl font-bold mb-2">Expert Waste Solutions</h3>
                  <p className="text-white/90 text-sm">
                    Our professional team is ready to answer all your questions and provide the best waste management services.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Additional Info Card */}
            <div className="mt-6 bg-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">📞</span>
                </div>
                <div>
                  <h4 className="font-bold">Quick Support</h4>
                  <p className="text-green-100 text-sm">24/7 Customer Service</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <h4 className="font-bold">Fast Response</h4>
                  <p className="text-green-100 text-sm">Under 2 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative bg-green-600 rounded-3xl p-10 shadow-2xl overflow-hidden">
          <div className="relative text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Our team is here to help you with any questions about our waste management services. 
              Get in touch for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:scale-105 flex items-center gap-2 min-w-[160px] justify-center"
              >
                <span>📞</span>
                Contact Us
              </a>
              <a
                href="/quote"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:scale-105 flex items-center gap-2 min-w-[160px] justify-center border-2 border-orange-400"
              >
                <span>💰</span>
                Get Free Quote
              </a>
            </div>
            <p className="text-green-200 text-sm mt-6">
              Typically respond within 2 hours during business days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}