// components/BinBagQuoteForm.tsx
'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  county: string;
  town: string;
  service_type: string;
  // Bin bag specific fields
  bin_colors: string[];
  bag_sizes: string[];
  bag_gauge: string;
  packaging_type: string;
  monthly_volume: string;
  // Common fields
  message: string;
  preferred_contact: string;
  contact_time: string;
}

interface FormErrors {
  [key: string]: string;
}

const COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kiambu', 'Machakos', 'Kajiado',
  'Uasin Gishu', 'Kakamega', 'Bungoma', 'Meru', 'Nyeri', 'Tharaka Nithi', 'Embu', 'Kirinyaga',
  'Muranga', 'Nyandarua', 'Laikipia', 'Samburu', 'Isiolo', 'Marsabit', 'Turkana', 'West Pokot',
  'Trans Nzoia', 'Elgeyo Marakwet', 'Baringo', 'Nandi', 'Kericho', 'Bomet', 'Narok', 'Kisii',
  'Nyamira', 'Homa Bay', 'Migori', 'Siaya', 'Busia', 'Vihiga', 'Kwale', 'Kilifi', 'Tana River',
  'Lamu', 'Taita Taveta', 'Garissa', 'Wajir', 'Mandera', 'Makueni'
];

const BIN_COLORS = [
  { value: 'black', label: 'Black - General Waste' },
  { value: 'clear', label: 'Clear/Transparent - Recyclables' },
  { value: 'green', label: 'Green - Organic/Food Waste' },
  { value: 'yellow', label: 'Yellow - Infectious/Medical Waste' },
  { value: 'red', label: 'Red - Highly Infectious' },
  { value: 'blue', label: 'Blue - Pharmaceutical Waste' },
  { value: 'brown', label: 'Brown - Chemical/Industrial' },
  { value: 'orange', label: 'Orange - Anatomical Waste' },
  { value: 'purple', label: 'Purple - Cytotoxic Waste' },
];

const BAG_SIZES = [
  { value: '10-15L', label: 'Small - 10-15 Litres (Desk bins, small office bins)' },
  { value: '30L', label: 'Medium - 30 Litres (Standard pedal bins, offices)' },
  { value: '50-60L', label: 'Medium-Large - 50-60 Litres (Kitchens, hospital wards)' },
  { value: '80-120L', label: 'Large - 80-120 Litres (Commercial kitchens, loading bays)' },
  { value: '240L', label: 'Extra Large - 240 Litres (Wheelie bin liners)' },
  { value: 'custom', label: 'Custom Size (Please specify in message)' },
];

const GAUGES = [
  { value: 'standard', label: 'Standard Gauge (Light general waste)' },
  { value: 'heavy', label: 'Heavy Duty Gauge (Sharp/heavy waste)' },
  { value: 'extra', label: 'Extra Heavy Duty (Medical/clinical waste)' },
];

const PACKAGING_TYPES = [
  { value: 'rolls', label: 'Rolls (1-50 bags per roll)' },
  { value: 'flat_packs', label: 'Flat Packs (50-100 bags per pack)' },
];

const PREFERRED_CONTACT = [
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
];

export default function BinBagQuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    county: '',
    town: '',
    service_type: 'bin_bags',
    bin_colors: [],
    bag_sizes: [],
    bag_gauge: '',
    packaging_type: '',
    monthly_volume: '',
    message: '',
    preferred_contact: '',
    contact_time: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => {
      const colors = prev.bin_colors.includes(color)
        ? prev.bin_colors.filter(c => c !== color)
        : [...prev.bin_colors, color];
      return { ...prev, bin_colors: colors };
    });
  };

  const handleSizeChange = (size: string) => {
    setFormData(prev => {
      const sizes = prev.bag_sizes.includes(size)
        ? prev.bag_sizes.filter(s => s !== size)
        : [...prev.bag_sizes, size];
      return { ...prev, bag_sizes: sizes };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.county) newErrors.county = 'Please select your county';
    if (formData.bin_colors.length === 0) newErrors.bin_colors = 'Please select at least one bin bag color';
    if (formData.bag_sizes.length === 0) newErrors.bag_sizes = 'Please select at least one bag size';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSubmitError(null);

    try {
      // Prepare the data to match your Laravel API structure
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || null,
        county: formData.county,
        town: formData.town || null,
        service_type: 'bin_bags', // This matches your service_type field
        // Store bin bag specific data in the message field as JSON
        message: JSON.stringify({
          bin_colors: formData.bin_colors,
          bag_sizes: formData.bag_sizes,
          bag_gauge: formData.bag_gauge,
          packaging_type: formData.packaging_type,
          monthly_volume: formData.monthly_volume,
          additional_message: formData.message,
        }),
        preferred_contact: formData.preferred_contact || null,
        contact_time: formData.contact_time || null,
      };

      // Send to your Laravel API endpoint
      const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from Laravel
        if (response.status === 422 && data.errors) {
          const laravelErrors: FormErrors = {};
          Object.keys(data.errors).forEach(key => {
            laravelErrors[key] = data.errors[key][0];
          });
          setErrors(laravelErrors);
          throw new Error('Please check the form for errors');
        }
        throw new Error(data.message || 'Failed to submit quote request');
      }

      // Success!
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        county: '',
        town: '',
        service_type: 'bin_bags',
        bin_colors: [],
        bag_sizes: [],
        bag_gauge: '',
        packaging_type: '',
        monthly_volume: '',
        message: '',
        preferred_contact: '',
        contact_time: '',
      });

    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-green-100 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Quote Request Received!</h3>
        <p className="text-slate-600 mb-4">
          Thank you for your interest in our bin bags. We will review your requirements and get back to you within 2 hours during business days.
        </p>
        <p className="text-sm text-slate-500">
          Need immediate assistance? Call us at <a href="tel:+254711515752" className="text-green-600 font-bold">0711 515 752</a>
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-green-600 hover:text-green-700 font-semibold text-sm"
        >
          Submit Another Request →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <p className="font-semibold mb-1">Submission Error</p>
          <p>{submitError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Jane Mwangi"
            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="jane@company.co.ke"
            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+254 7XX XXX XXX"
            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
              errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Company */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Company / Organization</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Your company name (optional)"
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          />
        </div>

        {/* County */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            County <span className="text-red-500">*</span>
          </label>
          <select
            name="county"
            value={formData.county}
            onChange={handleInputChange}
            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
              errors.county ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
            }`}
          >
            <option value="">Select your county...</option>
            {COUNTIES.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
          {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
        </div>

        {/* Town/City */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Town / City</label>
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleInputChange}
            placeholder="e.g., Westlands, CBD"
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          />
        </div>

        {/* Bin Colors - Full Width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Bin Bag Colors Needed <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {BIN_COLORS.map(color => (
              <label key={color.value} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.bin_colors.includes(color.value)}
                  onChange={() => handleColorChange(color.value)}
                  className="w-4 h-4 text-green-600 rounded border-slate-300 focus:ring-green-500"
                />
                <span className="text-xs text-slate-700">{color.label}</span>
              </label>
            ))}
          </div>
          {errors.bin_colors && <p className="text-red-500 text-xs mt-2">{errors.bin_colors}</p>}
        </div>

        {/* Bag Sizes - Full Width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Bag Sizes Required <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BAG_SIZES.map(size => (
              <label key={size.value} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.bag_sizes.includes(size.value)}
                  onChange={() => handleSizeChange(size.value)}
                  className="w-4 h-4 text-green-600 rounded border-slate-300 focus:ring-green-500"
                />
                <span className="text-xs text-slate-700">{size.label}</span>
              </label>
            ))}
          </div>
          {errors.bag_sizes && <p className="text-red-500 text-xs mt-2">{errors.bag_sizes}</p>}
        </div>

        {/* Bag Gauge */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Bag Thickness / Gauge</label>
          <select
            name="bag_gauge"
            value={formData.bag_gauge}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          >
            <option value="">Select gauge...</option>
            {GAUGES.map(gauge => (
              <option key={gauge.value} value={gauge.value}>{gauge.label}</option>
            ))}
          </select>
        </div>

        {/* Packaging Type */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Packaging Preference</label>
          <select
            name="packaging_type"
            value={formData.packaging_type}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          >
            <option value="">Select packaging type...</option>
            {PACKAGING_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Monthly Volume */}
        <div className="form-group md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">
            Estimated Monthly Volume
          </label>
          <input
            type="text"
            name="monthly_volume"
            value={formData.monthly_volume}
            onChange={handleInputChange}
            placeholder="e.g., 500 bags/month, 10 boxes, etc."
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          />
        </div>

        {/* Additional Message */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Additional Notes</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            placeholder="Any special requirements — custom sizes, specific colors, delivery schedule, standing order needs..."
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all resize-none"
          />
        </div>

        {/* Preferred Contact Method */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Preferred Contact Method</label>
          <select
            name="preferred_contact"
            value={formData.preferred_contact}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          >
            <option value="">Select preferred method...</option>
            {PREFERRED_CONTACT.map(method => (
              <option key={method.value} value={method.value}>{method.label}</option>
            ))}
          </select>
        </div>

        {/* Best Contact Time */}
        <div className="form-group">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Best Time to Contact</label>
          <input
            type="text"
            name="contact_time"
            value={formData.contact_time}
            onChange={handleInputChange}
            placeholder="e.g., Morning, Afternoon, 9am-12pm"
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          'Submit Quote Request'
        )}
      </button>

      <p className="text-center text-xs text-slate-400 mt-4">
        By submitting, you agree to our privacy policy. We'll contact you within 2 hours during business days.
      </p>
      
    </form>
  );
}