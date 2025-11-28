'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  full_description: string | null;
  icon: string | null;
  image_path: string | null;
  gallery_images: string[] | null;
  youtube_url: string | null;
  youtube_video_path: string | null;
  youtube_thumbnail: string | null;
  category: string | null;
  price: string | null;
  price_unit: string | null;
  duration: string | null;
  frequency: string | null;
  features: string[];
  benefits: string[];
  order: number;
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  image_url?: string | null;
  gallery_images_urls?: string[];
  youtube_thumbnail_url?: string | null;
}

interface YouTubeVideo {
  url: string;
  embedUrl: string;
  thumbnail: string;
  title?: string;
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
    youtube_url: '', // Changed from youtube_urls array to single string
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
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [removedGalleryImages, setRemovedGalleryImages] = useState<string[]>([]);
  const [youtubePreview, setYoutubePreview] = useState<YouTubeVideo | null>(null); // Single preview now
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    checkAuth();
    fetchServices();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.log('No admin token found, redirecting to login');
      router.push('/admin/login');
    }
  };

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      console.log('Fetching services...');
      
      const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/services/all', {
        headers: { 
          'Accept': 'application/json'
        },
      });
      
      console.log('Fetch response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched services data:', data);
        
        // Validate and normalize the services data
        const validatedServices = Array.isArray(data) ? data.map(service => ({
          ...service,
          features: Array.isArray(service.features) ? service.features : [],
          benefits: Array.isArray(service.benefits) ? service.benefits : [],
          gallery_images: Array.isArray(service.gallery_images) ? service.gallery_images : [],
          gallery_images_urls: Array.isArray(service.gallery_images_urls) ? service.gallery_images_urls : [],
        })) : [];
        
        setServices(validatedServices);
      } else {
        console.error('Failed to fetch services:', response.status);
        setError('Failed to fetch services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Error fetching services');
    } finally {
      setLoading(false);
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Generate YouTube embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  // Generate YouTube thumbnail URL
  const getYouTubeThumbnail = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
  };

  // Update YouTube preview when URL changes
  const updateYouTubePreview = (url: string) => {
    if (url.trim()) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        setYoutubePreview({
          url: url.trim(),
          embedUrl: getYouTubeEmbedUrl(url),
          thumbnail: getYouTubeThumbnail(url)
        });
        setError('');
      } else {
        setYoutubePreview(null);
        setError('Please enter a valid YouTube URL');
      }
    } else {
      setYoutubePreview(null);
      setError('');
    }
  };

  // Handle YouTube URL change
  const handleYouTubeUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, youtube_url: url }));
    updateYouTubePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError('No authentication token found');
      setSubmitting(false);
      return;
    }

    console.log('Starting form submission...');

    try {
      const formToSend = new FormData();
      
      // Append basic fields
      formToSend.append('name', formData.name);
      formToSend.append('slug', formData.slug);
      formToSend.append('description', formData.description);
      formToSend.append('full_description', formData.full_description);
      formToSend.append('icon', formData.icon);
      
      // Append single YouTube URL (not array)
      if (formData.youtube_url.trim()) {
        formToSend.append('youtube_url', formData.youtube_url.trim());
      }
      
      formToSend.append('category', formData.category);
      formToSend.append('price', formData.price);
      formToSend.append('price_unit', formData.price_unit);
      formToSend.append('duration', formData.duration);
      formToSend.append('frequency', formData.frequency);
      formToSend.append('order', formData.order.toString());
      formToSend.append('featured', formData.featured ? '1' : '0');
      formToSend.append('is_active', formData.is_active ? '1' : '0');

      // Ensure features and benefits are arrays before stringifying
      const featuresArray = Array.isArray(formData.features) ? formData.features : [];
      const benefitsArray = Array.isArray(formData.benefits) ? formData.benefits : [];
      
      formToSend.append('features', JSON.stringify(featuresArray));
      formToSend.append('benefits', JSON.stringify(benefitsArray));

      // Append main image
      if (imageFile) {
        console.log('Appending main image file to form data');
        formToSend.append('image', imageFile);
      }

      // Append gallery images
      galleryFiles.forEach((file) => {
        console.log('Appending gallery image:', file.name);
        formToSend.append('gallery_images[]', file);
      });

      // Append removed gallery images for updates
      if (editingService && removedGalleryImages.length > 0) {
        removedGalleryImages.forEach(imagePath => {
          formToSend.append('remove_gallery_images[]', imagePath);
        });
      }

      let url = 'https://api.sylviegarbagecollection.co.ke/api/admin/services';
      let method: 'POST' | 'PUT' = 'POST';

      if (editingService) {
        url = `https://api.sylviegarbagecollection.co.ke/api/admin/services/${editingService.id}`;
        formToSend.append('_method', 'PUT');
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: formToSend,
      });

      console.log('Submission response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        
        let errorMessage = `Failed to ${editingService ? 'update' : 'create'} service`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
          if (errorData.errors) {
            const firstError = Object.values(errorData.errors)[0];
            errorMessage = Array.isArray(firstError) ? firstError[0] : String(firstError);
          }
        } catch (e) {
          console.error('Could not parse error response as JSON');
        }
        
        setError(errorMessage);
        setSubmitting(false);
        return;
      }

      const responseData = await response.json();
      console.log('Success response:', responseData);

      // Reset form and reload services
      setShowForm(false);
      setEditingService(null);
      resetForm();
      setMessage(editingService ? 'Service updated successfully!' : 'Service created successfully!');
      
      console.log('Form submitted successfully, refreshing services...');
      await fetchServices();
      
      setTimeout(() => setMessage(''), 3000);
      
    } catch (err) {
      console.error('Network error during submission:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
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
      youtube_url: '', // Reset to empty string
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
    setGalleryFiles([]);
    setImagePreview('');
    setGalleryPreviews([]);
    setCurrentFeature('');
    setCurrentBenefit('');
    setRemovedGalleryImages([]);
    setYoutubePreview(null); // Reset YouTube preview
    setError('');
  };

  const handleEdit = (service: Service) => {
    console.log('Editing service:', service);
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      full_description: service.full_description || '',
      icon: service.icon || '',
      youtube_url: service.youtube_url || '', // Single URL
      category: service.category || '',
      price: service.price?.toString() || '',
      price_unit: service.price_unit || '',
      duration: service.duration || '',
      frequency: service.frequency || '',
      features: Array.isArray(service.features) ? service.features : [],
      benefits: Array.isArray(service.benefits) ? service.benefits : [],
      order: service.order,
      featured: service.featured,
      is_active: service.is_active,
    });
    setImagePreview(service.image_url || '');
    setGalleryPreviews(service.gallery_images_urls || []);
    
    // Set YouTube preview if URL exists
    if (service.youtube_url) {
      updateYouTubePreview(service.youtube_url);
    } else {
      setYoutubePreview(null);
    }
    
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    console.log('Deleting service ID:', id);
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch(`https://api.sylviegarbagecollection.co.ke/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        credentials: 'include',
      });
      
      console.log('Delete response status:', response.status);
      
      if (response.ok) {
        console.log('Service deleted successfully');
        setMessage('Service deleted successfully!');
        await fetchServices();
        setTimeout(() => setMessage(''), 3000);
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      } else {
        console.error('Failed to delete service:', response.status);
        const errorText = await response.text();
        console.error('Delete error:', errorText);
        setError('Failed to delete service');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      setError('Error deleting service');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Main image file selected:', file.name, file.type, file.size);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.log('No main image file selected');
      setImageFile(null);
      setImagePreview('');
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      console.log('Gallery images selected:', files.length);
      setGalleryFiles(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index: number) => {
    if (editingService && index < (editingService.gallery_images_urls?.length || 0)) {
      const imagePath = editingService.gallery_images?.[index];
      if (imagePath) {
        setRemovedGalleryImages(prev => [...prev, imagePath]);
      }
    }
    
    const updatedGalleryFiles = [...galleryFiles];
    const updatedGalleryPreviews = [...galleryPreviews];
    
    if (index < updatedGalleryPreviews.length) {
      URL.revokeObjectURL(updatedGalleryPreviews[index]);
    }
    
    if (index < updatedGalleryFiles.length) {
      updatedGalleryFiles.splice(index, 1);
      updatedGalleryPreviews.splice(index, 1);
    } else {
      updatedGalleryPreviews.splice(index - (editingService?.gallery_images_urls?.length || 0), 1);
    }
    
    setGalleryFiles(updatedGalleryFiles);
    setGalleryPreviews(updatedGalleryPreviews);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
            <p className="text-gray-600">Manage your garbage collection services</p>
          </div>
          <button
            onClick={() => {
              console.log('Opening form to create new service');
              resetForm();
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Service</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-700">{message}</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 font-medium">Error: {error}</span>
            </div>
          </div>
        )}

        {services.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No services</h3>
              <p className="mt-2 text-gray-500">Get started by creating your first service.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add New Service
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  {service.image_path ? (
                    <img 
                      src={service.image_url || '/default-service-image.jpg'}
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
                  {(service.gallery_images_urls && service.gallery_images_urls.length > 0) && (
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {service.gallery_images_urls.length} gallery images
                      </span>
                    </div>
                  )}
                  {service.youtube_url && (
                    <div className="absolute bottom-2 right-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        YouTube
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                  
                  {/* Features list with proper array validation */}
                  <ul className="space-y-1 mb-3">
                    {(Array.isArray(service.features) && service.features.length > 0 
                      ? service.features.slice(0, 3) 
                      : ['Expert Team', 'Quality Guaranteed', 'Eco-Friendly']
                    ).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
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
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter service name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="URL-friendly slug"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Brief description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <textarea
                        value={formData.full_description}
                        onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                        rows={8}
                        className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-0 resize-none"
                        placeholder="Detailed description of the service..."
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="text-xs text-gray-500">
                        <p><strong>Formatting tips:</strong></p>
                        <p>• Use <code>&lt;strong&gt;text&lt;/strong&gt;</code> for <strong>bold</strong></p>
                        <p>• Use <code>&lt;em&gt;text&lt;/em&gt;</code> for <em>italic</em></p>
                        <p>• Use <code>&lt;ul&gt;&lt;li&gt;item&lt;/li&gt;&lt;/ul&gt;</code> for lists</p>
                        <p>• Use <code>&lt;h3&gt;heading&lt;/h3&gt;</code> for subheadings</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Residential"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="🔧 or icon class"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        step="0.01"
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
                        placeholder="per month"
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
                        placeholder="e.g., 30 minutes"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                      <input
                        type="text"
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Weekly"
                      />
                    </div>
                  </div>

                  {/* Single YouTube URL with Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      value={formData.youtube_url}
                      onChange={(e) => handleYouTubeUrlChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a valid YouTube URL to embed a video
                    </p>
                    
                    {/* YouTube Preview */}
                    {youtubePreview && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">YouTube Preview:</p>
                        <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                          <div className="relative aspect-video bg-gray-200">
                            <iframe
                              src={youtubePreview.embedUrl}
                              className="w-full h-full"
                              title="YouTube video preview"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="p-3 bg-gray-50">
                            <p className="text-xs text-gray-600 truncate">{youtubePreview.url}</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                        placeholder="Add a feature"
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
                        placeholder="Add a benefit"
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
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
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

                  {/* Main Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Main Image {!editingService && '*'}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required={!editingService}
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Main Image Preview:</p>
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                      </div>
                    )}
                    {editingService && !imagePreview && editingService.image_path && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Current Main Image:</p>
                        <img 
                          src={editingService.image_url || '/default-service-image.jpg'}
                          alt="Current" 
                          className="w-32 h-32 object-cover rounded-lg border" 
                        />
                      </div>
                    )}
                  </div>

                  {/* Gallery Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gallery Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">You can select multiple images</p>
                    
                    {(galleryPreviews.length > 0 || (editingService && editingService.gallery_images_urls && editingService.gallery_images_urls.length > 0)) && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Gallery Images:</p>
                        <div className="grid grid-cols-3 gap-4">
                          {/* Existing gallery images */}
                          {editingService && editingService.gallery_images_urls && editingService.gallery_images_urls.map((url, index) => {
                            const isRemoved = removedGalleryImages.includes(editingService.gallery_images?.[index] || '');
                            if (isRemoved) return null;
                            
                            return (
                              <div key={`existing-${index}`} className="relative">
                                <img 
                                  src={url} 
                                  alt={`Gallery ${index + 1}`} 
                                  className="w-full h-24 object-cover rounded-lg border"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const imagePath = editingService.gallery_images?.[index];
                                    if (imagePath) {
                                      setRemovedGalleryImages(prev => [...prev, imagePath]);
                                    }
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                          
                          {/* New gallery image previews */}
                          {galleryPreviews.map((preview, index) => (
                            <div key={`new-${index}`} className="relative">
                              <img 
                                src={preview} 
                                alt={`New gallery ${index + 1}`} 
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingService(null);
                        resetForm();
                      }}
                      disabled={submitting}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          {editingService ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        editingService ? 'Update Service' : 'Create Service'
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