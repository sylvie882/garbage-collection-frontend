'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Carousel {
  id: number;
  title: string;
  description: string;
  image_url: string; // Cloudinary URL
  button_text: string;
  button_link: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function CarouselsPage() {
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState<Carousel | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    button_text: '',
    button_link: '',
    order: 0,
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchCarousels();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.log('No admin token found, redirecting to login');
      router.push('/admin/login');
    }
  };

  const fetchCarousels = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      console.log('Fetching carousels...');
      
      const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/admin/carousels', {
        headers: { 
          Authorization: `Bearer ${token}`, 
          Accept: 'application/json' 
        },
        credentials: 'include',
      });
      
      console.log('Fetch response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched carousels data:', data);
        setCarousels(Array.isArray(data) ? data : data.data || []);
      } else if (response.status === 401) {
        console.log('Unauthorized, redirecting to login');
        router.push('/admin/login');
      } else {
        console.error('Failed to fetch carousels:', response.status);
      }
    } catch (err) {
      console.error('Error fetching carousels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    const token = localStorage.getItem('adminToken');
    console.log('Starting form submission...');
    console.log('Form data:', formData);
    console.log('Image file:', imageFile ? imageFile.name : 'No image file');
    console.log('Editing carousel:', editingCarousel);

    try {
      // Prepare FormData for file upload
      const formToSend = new FormData();
      formToSend.append('title', formData.title);
      formToSend.append('description', formData.description);
      formToSend.append('button_text', formData.button_text);
      formToSend.append('button_link', formData.button_link);
      formToSend.append('order', formData.order.toString());
      formToSend.append('is_active', formData.is_active ? '1' : '0');

      if (imageFile) {
        console.log('Appending image file to form data');
        formToSend.append('image', imageFile);
      } else if (editingCarousel && !imageFile) {
        console.log('No new image file for edit, keeping existing image');
      }

      let url = 'https://api.sylviegarbagecollection.co.ke/api/admin/carousels';
      let method: 'POST' | 'PUT' = 'POST';

      if (editingCarousel) {
        url = `https://api.sylviegarbagecollection.co.ke/api/admin/carousels/${editingCarousel.id}`;
        formToSend.append('_method', 'PUT');
        method = 'POST'; // Using POST with _method=PUT for Laravel compatibility
        console.log('Making PUT request to:', url);
      } else {
        console.log('Making POST request to:', url);
      }

      // Log FormData contents (for debugging)
      console.log('FormData entries:');
      for (const [key, value] of (formToSend as any).entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let browser set it with boundary
        },
        credentials: 'include',
        body: formToSend,
      });

      console.log('Submission response status:', response.status);
      console.log('Submission response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        
        let errorMessage = `Failed to ${editingCarousel ? 'update' : 'create'} carousel`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
          console.error('Error details:', errorData);
        } catch (e) {
          console.error('Could not parse error response as JSON');
        }
        
        setError(errorMessage);
        setSubmitting(false);
        return;
      }

      const responseData = await response.json();
      console.log('Success response:', responseData);

      // Reset form and reload carousels
      setShowForm(false);
      setEditingCarousel(null);
      setFormData({
        title: '',
        description: '',
        button_text: '',
        button_link: '',
        order: 0,
        is_active: true,
      });
      setImageFile(null);
      setImagePreview('');
      setError('');
      
      console.log('Form submitted successfully, refreshing carousels...');
      await fetchCarousels();
      
    } catch (err) {
      console.error('Network error during submission:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (carousel: Carousel) => {
    console.log('Editing carousel:', carousel);
    setEditingCarousel(carousel);
    setFormData({
      title: carousel.title,
      description: carousel.description,
      button_text: carousel.button_text,
      button_link: carousel.button_link,
      order: carousel.order,
      is_active: carousel.is_active,
    });
    setImagePreview(carousel.image_url || '');
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this carousel?')) return;
    
    console.log('Deleting carousel ID:', id);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.sylviegarbagecollection.co.ke/api/admin/carousels/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      
      console.log('Delete response status:', response.status);
      
      if (response.ok) {
        console.log('Carousel deleted successfully');
        await fetchCarousels();
      } else {
        console.error('Failed to delete carousel:', response.status);
        const errorText = await response.text();
        console.error('Delete error:', errorText);
        setError('Failed to delete carousel');
      }
    } catch (err) {
      console.error('Error deleting carousel:', err);
      setError('Error deleting carousel');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Image file selected:', file.name, file.type, file.size);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.log('No file selected');
      setImageFile(null);
      setImagePreview('');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCarousel(null);
    setFormData({
      title: '',
      description: '',
      button_text: '',
      button_link: '',
      order: 0,
      is_active: true,
    });
    setImageFile(null);
    setImagePreview('');
    setError('');
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Carousel Management</h1>
            <p className="text-gray-600">Manage homepage carousel slides</p>
          </div>
          <button
            onClick={() => {
              console.log('Opening form to create new carousel');
              resetForm();
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add New Carousel
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {carousels.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No carousels</h3>
              <p className="mt-2 text-gray-500">Get started by creating your first carousel slide.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add New Carousel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carousels.map((carousel) => (
              <div key={carousel.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  {carousel.image_url && (
                    <img src={carousel.image_url} alt={carousel.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        carousel.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {carousel.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{carousel.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{carousel.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Order: {carousel.order}</span>
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(carousel)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(carousel.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
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
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {editingCarousel ? 'Edit Carousel' : 'Add New Carousel'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter carousel title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter carousel description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.button_text}
                        onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Button text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                      <input
                        type="text"
                        value={formData.button_link}
                        onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Button link URL"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        min="0"
                      />
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
                      Image {!editingCarousel && '*'}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required={!editingCarousel} // Required only for new carousels
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                      </div>
                    )}
                    {editingCarousel && !imagePreview && editingCarousel.image_url && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                        <img src={editingCarousel.image_url} alt="Current" className="w-32 h-32 object-cover rounded-lg border" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
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
                          {editingCarousel ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        editingCarousel ? 'Update Carousel' : 'Create Carousel'
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