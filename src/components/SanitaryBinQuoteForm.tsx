// components/SanitaryBinQuoteForm.jsx

'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SanitaryBinQuoteForm() {
  const searchParams = useSearchParams();
  const initialBinType = searchParams.get('bin') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    county: '',
    town: '',
    bin_type: initialBinType,
    number_of_bins: '',
    service_frequency: '',
    contract_term: '12',
    additional_services: [],
    message: '',
    preferred_contact: 'phone',
    contact_time: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Counties list
  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu', 'Kiambu', 'Machakos', 
    'Kajiado', 'Murang\'a', 'Nyeri', 'Meru', 'Embu', 'Kirinyaga', 'Laikipia', 
    'Nyandarua', 'Tharaka-Nithi', 'Kitui', 'Makueni', 'Garissa', 'Wajir', 'Mandera', 
    'Marsabit', 'Isiolo', 'Samburu', 'Turkana', 'West Pokot', 'Elgeyo-Marakwet', 
    'Nandi', 'Baringo', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya', 
    'Homa Bay', 'Migori', 'Kisii', 'Nyamira', 'Bomet', 'Kericho', 'Narok', 
    'Trans Nzoia', 'Taita-Taveta', 'Kwale', 'Kilifi', 'Lamu', 'Tana River'
  ];

  // Additional services
  const additionalServicesList = [
    'Air Fresheners & Dispensers',
    'Soap & Hand Sanitiser Dispensers',
    'Paper Towel & Toilet Tissue Supply',
    'Nappy/Diaper Bins',
    'Sharps & Clinical Waste Bins',
    'Deep Cleaning & Disinfection'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          additional_services: [...prev.additional_services, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          additional_services: prev.additional_services.filter(s => s !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare the data - send additional_services as an array (not stringified)
      const requestData = {
        // Required fields
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_type: 'sanitary_bins',
        message: formData.message || 'No additional message provided',
        
        // Optional fields - send null for empty values
        company: formData.company || null,
        county: formData.county || null,
        town: formData.town || null,
        bin_type: formData.bin_type || null,
        number_of_bins: formData.number_of_bins ? parseInt(formData.number_of_bins) : null,
        service_frequency: formData.service_frequency || null,
        contract_term: formData.contract_term || null,
        // Send as array, NOT stringified - your controller expects array
        additional_services: formData.additional_services.length > 0 
          ? formData.additional_services 
          : null,
        preferred_contact: formData.preferred_contact || null,
        contact_time: formData.contact_time || null
      };

      console.log('Submitting data:', requestData);

      const response = await fetch('https://api.sylviegarbagecollection.co.ke/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Quote request submitted successfully! We will contact you within 24 hours.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          county: '',
          town: '',
          bin_type: '',
          number_of_bins: '',
          service_frequency: '',
          contract_term: '12',
          additional_services: [],
          message: '',
          preferred_contact: 'phone',
          contact_time: ''
        });
      } else {
        // Handle validation errors
        let errorMessage = 'Something went wrong. Please try again.';
        
        if (data.errors) {
          // Format validation errors nicely
          errorMessage = Object.entries(data.errors)
            .map(([field, errors]) => {
              const fieldName = field.replace(/_/g, ' ');
              return `${fieldName}: ${errors.join(', ')}`;
            })
            .join(' | ');
        } else if (data.message) {
          errorMessage = data.message;
        }
        
        setSubmitStatus({
          type: 'error',
          message: errorMessage
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Location Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">County *</label>
          <select
            name="county"
            value={formData.county}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select County</option>
            {counties.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Town/Area *</label>
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleChange}
            required
            placeholder="e.g., Westlands, CBD, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Service Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bin Type *</label>
          <select
            name="bin_type"
            value={formData.bin_type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select Bin Type</option>
            <option value="pedal">Pedal Sanitary Bins</option>
            <option value="automatic">Automatic Sanitary Bins</option>
            <option value="both">Both Types</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Bins *</label>
          <input
            type="number"
            name="number_of_bins"
            value={formData.number_of_bins}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Frequency *</label>
          <select
            name="service_frequency"
            value={formData.service_frequency}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select Frequency</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom Schedule</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contract Term *</label>
          <select
            name="contract_term"
            value={formData.contract_term}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months (Best Value)</option>
            <option value="24">24 Months</option>
          </select>
        </div>

        {/* Additional Services */}
        {/* <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Services (Optional)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {additionalServicesList.map(service => (
              <label key={service} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="additional_services"
                  value={service}
                  checked={formData.additional_services.includes(service)}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div> */}

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Tell us about any specific requirements or questions..."
          ></textarea>
        </div>

        {/* Contact Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method *</label>
          <select
            name="preferred_contact"
            value={formData.preferred_contact}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="phone">Phone Call</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Best Time to Contact</label>
          <input
            type="text"
            name="contact_time"
            value={formData.contact_time}
            onChange={handleChange}
            placeholder="e.g., Weekdays 9am-5pm"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy. We'll only use your details to provide you with a quote.
      </p>
    </form>
  );
}