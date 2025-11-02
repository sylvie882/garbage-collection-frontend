'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  full_description: string;
  icon: string;
  image_path: string;
  youtube_url: string;
  category: string;
  price: number;
  price_unit: string;
  duration: string;
  frequency: string;
  features: string[];
  benefits: string[];
  order: number;
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    full_description: '',
    icon: '',
    youtube_url: '',
    category: '',
    price: '',
    price_unit: '',
    duration: '',
    frequency: '',
    features: [] as string[],
    benefits: [] as string[],
    order: 0,
    featured: false,
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchServices();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('http://localhost:8000/api/services', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setServices(Array.isArray(data) ? data : data.data || []);
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to fetch services. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No admin token found');
        router.push('/admin/login');
        return;
      }

      console.log('=== START FORM SUBMISSION DEBUG ===');
      console.log('Editing Service:', editingService);
      console.log('Form Data:', formData);
      console.log('Image File:', imageFile);
      console.log('Features array:', formData.features);
      console.log('Benefits array:', formData.benefits);

      const formDataToSend = new FormData();

      // Append basic fields with logging
      const fields = [
        'name', 'slug', 'description', 'full_description', 'icon', 
        'youtube_url', 'category', 'price', 'price_unit', 'duration', 
        'frequency', 'order', 'featured', 'is_active'
      ];

      fields.forEach(field => {
        const value = formData[field as keyof typeof formData];
        console.log(`Appending ${field}:`, value, `(type: ${typeof value})`);
        
        // Handle boolean values properly
        if (field === 'featured' || field === 'is_active') {
          formDataToSend.append(field, value ? '1' : '0');
        } else {
          formDataToSend.append(field, value?.toString() || '');
        }
      });

      // CORRECTED: Append features and benefits as JSON strings instead of arrays
      console.log('Processing features array as JSON:', formData.features);
      formDataToSend.append('features', JSON.stringify(formData.features));

      console.log('Processing benefits array as JSON:', formData.benefits);
      formDataToSend.append('benefits', JSON.stringify(formData.benefits));

      if (imageFile) {
        console.log('Appending image file:', imageFile.name, imageFile.type, imageFile.size);
        formDataToSend.append('image', imageFile);
      }

      // Log all FormData entries
      console.log('=== FORM DATA ENTRIES ===');
      for (let [key, value] of formDataToSend.entries()) {
        if (key === 'features' || key === 'benefits') {
          console.log(`${key}:`, value, `(JSON string)`);
        } else {
          console.log(`${key}:`, value, `(type: ${typeof value})`);
        }
      }

      const url = editingService 
        ? `http://localhost:8000/api/services/${editingService.id}`
        : 'http://localhost:8000/api/services';
      
      const method = editingService ? 'PUT' : 'POST';

      console.log('=== REQUEST DETAILS ===');
      console.log('URL:', url);
      console.log('Method:', method);
      console.log('Token exists:', !!token);

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formDataToSend,
      });

      console.log('=== RESPONSE DETAILS ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('OK:', response.ok);

      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
        console.log('Parsed response data:', responseData);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        responseData = { error: 'Invalid JSON response' };
      }

      if (response.ok) {
        console.log('✅ SUCCESS: Service saved successfully');
        setMessage(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        setShowForm(false);
        setEditingService(null);
        resetForm();
        fetchServices();
        
        setTimeout(() => setMessage(''), 3000);
      } else {
        console.log('❌ ERROR: Request failed');
        console.log('Error data:', responseData);
        
        if (responseData.errors) {
          console.log('Validation errors:', responseData.errors);
          const errorMessages = Object.values(responseData.errors).flat().join(', ');
          setError(`Validation errors: ${errorMessages}`);
        } else if (responseData.message) {
          console.log('Error message:', responseData.message);
          setError(responseData.message);
        } else {
          console.log('Unknown error structure:', responseData);
          setError(`Failed to ${editingService ? 'update' : 'create'} service. Status: ${response.status}`);
        }
        
        if (response.status === 401) {
          console.log('🛑 Unauthorized - redirecting to login');
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
        } else if (response.status === 422) {
          console.log('🛑 Validation error - check the validation rules');
          if (responseData.errors) {
            Object.entries(responseData.errors).forEach(([field, errors]) => {
              console.log(`Validation error for ${field}:`, errors);
            });
          }
        }
      }

    } catch (error) {
      // Properly handle the unknown error type
      console.error('💥 NETWORK ERROR:', error);
      
      // Type-safe error handling
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        setError(`Network error: ${error.message}`);
      } else if (typeof error === 'string') {
        console.error('Error string:', error);
        setError(`Network error: ${error}`);
      } else {
        console.error('Unknown error type:', typeof error, error);
        setError('An unexpected network error occurred. Please try again.');
      }
    } finally {
      console.log('=== END FORM SUBMISSION DEBUG ===');
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      full_description: '',
      icon: '',
      youtube_url: '',
      category: '',
      price: '',
      price_unit: '',
      duration: '',
      frequency: '',
      features: [],
      benefits: [],
      order: 0,
      featured: false,
      is_active: true,
    });
    setImageFile(null);
    setImagePreview('');
    setCurrentFeature('');
    setCurrentBenefit('');
  };

  const handleAddNewService = () => {
    setEditingService(null);
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      full_description: service.full_description || '',
      icon: service.icon || '',
      youtube_url: service.youtube_url || '',
      category: service.category || '',
      price: service.price?.toString() || '',
      price_unit: service.price_unit || '',
      duration: service.duration || '',
      frequency: service.frequency || '',
      features: service.features || [],
      benefits: service.benefits || [],
      order: service.order,
      featured: service.featured,
      is_active: service.is_active,
    });
    setImagePreview(service.image_path ? `http://localhost:8000/storage/${service.image_path}` : '');
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:8000/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage('Service deleted successfully!');
        fetchServices();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setError('Failed to delete service. Please try again.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, GIF, or WebP).');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB.');
        return;
      }

      setImageFile(file);
      setError('');
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const addFeature = () => {
    if (currentFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, currentFeature.trim()]
      });
      setCurrentFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const addBenefit = () => {
    if (currentBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, currentBenefit.trim()]
      });
      setCurrentBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index)
    });
  };

  // Auto-generate slug from name
  useEffect(() => {
    if (!editingService && formData.name && !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, editingService]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
              <p className="text-gray-600">Manage your garbage collection services</p>
            </div>
            <button
              onClick={handleAddNewService}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add New Service</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                {service.image_path ? (
                  <img 
                    src={`http://localhost:8000/storage/${service.image_path}`}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-4xl">{service.icon || '🔧'}</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex space-x-2">
                  {service.featured && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-green-600 font-semibold">
                    {service.price ? `KSh ${service.price} ${service.price_unit}` : 'Price on request'}
                  </span>
                  {service.category && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{service.category}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Order: {service.order}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first service.</p>
            <button
              onClick={handleAddNewService}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Your First Service
            </button>
          </div>
        )}

        {/* Add/Edit Service Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingService ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Residential Waste Collection"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="auto-generated-if-empty"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Brief description of the service..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Description
                    </label>
                    <textarea
                      value={formData.full_description}
                      onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Detailed description of the service..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Residential, Commercial"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="🔧 or font-awesome class"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Unit</label>
                      <input
                        type="text"
                        value={formData.price_unit}
                        onChange={(e) => setFormData({ ...formData, price_unit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="per month, per service, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., 30 minutes, 2 hours"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                      <input
                        type="text"
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Weekly, Monthly, One-time"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                    <input
                      type="url"
                      value={formData.youtube_url}
                      onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="https://youtube.com/..."
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={currentFeature}
                        onChange={(e) => setCurrentFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Add a feature (press Enter or click Add)"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border">
                          <span className="text-sm">{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {formData.features.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-2">No features added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={currentBenefit}
                        onChange={(e) => setCurrentBenefit(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Add a benefit (press Enter or click Add)"
                      />
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border">
                          <span className="text-sm">{benefit}</span>
                          <button
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {formData.benefits.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-2">No benefits added yet</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Featured Service</label>
                      <select
                        value={formData.featured.toString()}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.value === 'true' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={formData.is_active.toString()}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Supported formats: JPEG, PNG, GIF, WebP (Max: 5MB)</p>
                    {imagePreview && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>{editingService ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <span>{editingService ? 'Update Service' : 'Create Service'}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}