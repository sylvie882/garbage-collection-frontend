'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface QuoteFormData {
  name: string; email: string; phone: string; company?: string; service_type: string; message: string;
}
const serviceOptions = [
  'Garbage Collection & Waste Disposal','Pest Control/Fumigation','Sanitary Bin Services',
  'Washroom Solutions','House Clearance','Food Waste Services','Urinal Management',
  'Matting Solutions','Clinical Waste & Sharp Services','Secure Shredding','Other',
];
interface QuoteFormProps { onSubmit: (data: QuoteFormData) => Promise<any>; isSubmitting: boolean; }

export default function QuoteForm({ onSubmit, isSubmitting }: QuoteFormProps) {
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteFormData>();

  const handleFormSubmit = async (data: QuoteFormData) => {
    setSubmitMessage(''); setIsSuccess(false);
    try {
      const response = await onSubmit(data);
      setSubmitMessage(response.message || 'Quote request submitted! We will contact you soon.');
      setIsSuccess(true); reset();
    } catch (error: any) {
      setSubmitMessage(error?.response?.data?.message || error?.message || 'Failed to submit. Please try again.');
      setIsSuccess(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
      hasError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
    }`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="bg-green-800 px-7 py-5">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Fraunces', serif" }}>Request a Free Quote</h2>
        <p className="text-green-200 text-sm mt-1">We'll get back to you within 24 hours.</p>
      </div>

      <div className="p-7">
        {submitMessage && (
          <div className={`rounded-xl p-4 mb-6 ${isSuccess ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-sm font-semibold ${isSuccess ? 'text-green-900' : 'text-red-900'}`}>{submitMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input {...register('name', { required: 'Name is required' })} placeholder="Your full name" className={inputClass(!!errors.name)} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
              <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} placeholder="your@email.com" className={inputClass(!!errors.email)} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number *</label>
              <input type="tel" {...register('phone', { required: 'Phone is required' })} placeholder="+254 XXX XXX XXX" className={inputClass(!!errors.phone)} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company (Optional)</label>
              <input {...register('company')} placeholder="Your company name" className={inputClass()} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Service Needed *</label>
            <select {...register('service_type', { required: 'Please select a service' })} className={`${inputClass(!!errors.service_type)} appearance-none`}>
              <option value="">Select a service</option>
              {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.service_type && <p className="text-red-500 text-xs mt-1">{errors.service_type.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Project Details *</label>
            <textarea rows={5} {...register('message', { required: 'Please provide details', minLength: { value: 10, message: 'At least 10 characters required' } })}
              placeholder="Include your location, waste type, frequency needed, and any specific requirements..."
              className={`${inputClass(!!errors.message)} resize-none`} />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all text-sm">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Submitting...
              </span>
            ) : 'Submit Quote Request'}
          </button>
          <p className="text-center text-xs text-slate-400">We respect your privacy. Your information will not be shared with third parties.</p>
        </form>
      </div>

      <div className="border-t border-slate-100 px-7 py-5 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div><p className="font-semibold text-slate-900 text-sm">Prefer to call?</p><p className="text-slate-500 text-xs">Speak directly with our team</p></div>
        <a href="tel:+254711515752" className="text-green-700 font-bold text-lg hover:text-green-800 transition-colors">+254 711 515 752</a>
      </div>
    </div>
  );
}
