'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { quoteRequestApi } from '../lib/api';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_type: string;
  message: string;
}

const serviceOptions = [
  'Garbage Collection & Waste Disposal',
  'Pest Control/Fumigation',
  'Sanitary Bin Services',
  'Washroom Solutions',
  'House Clearance',
  'Food Waste Services',
  'URINAL MANAGEMENT SERVICES',
  'MATTING SOLUTION SERVICES',
  'Clinical Waste & Sharp Services',
  'SECURE SHREDDING',
  'Other'
];

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<QuoteFormData>();

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await quoteRequestApi.create(data);
      setSubmitMessage(response.data.message);
      setIsSuccess(true);
      reset();
    } catch (error: unknown) {
      // Proper TypeScript error handling
      if (error instanceof Error) {
        setSubmitMessage(error.message || 'Failed to submit quote request. Please try again.');
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } };
        setSubmitMessage(
          apiError.response?.data?.message || 
          'Failed to submit quote request. Please try again.'
        );
      } else {
        setSubmitMessage('Failed to submit quote request. Please try again.');
      }
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 px-8 py-6">
          <h2 className="text-3xl font-bold text-white text-center">
            Request a Free Quote
          </h2>
          <p className="text-green-100 text-center mt-2">
            Fill out the form below and we&apos;ll get back to you within 24 hours
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              isSuccess 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="+254 XXX XXX XXX"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  {...register('company')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your company name"
                />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-2">
                Service Needed *
              </label>
              <select
                id="service_type"
                {...register('service_type', { required: 'Please select a service' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service_type && (
                <p className="mt-1 text-sm text-red-600">{errors.service_type.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Project Details *
              </label>
              <textarea
                id="message"
                rows={6}
                {...register('message', { 
                  required: 'Please provide project details',
                  minLength: {
                    value: 10,
                    message: 'Please provide more details (at least 10 characters)'
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-vertical"
                placeholder="Tell us about your project, specific requirements, timeline, and any other relevant details..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit Quote Request'
                )}
              </button>
            </div>

            {/* Help Text */}
            <p className="text-center text-gray-500 text-sm mt-4">
              We respect your privacy. Your information will never be shared with third parties.
            </p>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 px-8 py-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-gray-900">Prefer to talk directly?</h3>
              <p className="text-gray-600">Call us now for immediate assistance</p>
            </div>
            <div className="flex items-center space-x-2 text-green-700 font-semibold text-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>+254 711515752</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}