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
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchCarousels();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) router.push('/admin/login');
  };

  const fetchCarousels = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://api.sylviegarbagecollection.co.ke/api/admin/carousels', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCarousels(Array.isArray(data) ? data : data.data || []);
      }
    } catch (err) {
      console.error('Error fetching carousels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const token = localStorage.getItem('adminToken');

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
      formToSend.append('image', imageFile); // important: send actual file
    }

    let url = 'https://api.sylviegarbagecollection.co.ke/api/admin/carousels';
    let method: 'POST' | 'POST' = 'POST';

    if (editingCarousel) {
      // Laravel can handle PUT via POST + _method
      url = `https://api.sylviegarbagecollection.co.ke/api/admin/carousels/${editingCarousel.id}`;
      formToSend.append('_method', 'PUT'); // Laravel expects _method for PUT
      method = 'POST';
    }

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT set 'Content-Type'; browser sets multipart boundary automatically
      },
      credentials: 'include',
      body: formToSend,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Server error:', text);
      return;
    }

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
    fetchCarousels();
  } catch (err) {
    console.error('Error saving carousel:', err);
  }
};




  const handleEdit = (carousel: Carousel) => {
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
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this carousel?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.sylviegarbagecollection.co.ke/api/admin/carousels/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (response.ok) fetchCarousels();
    } catch (err) {
      console.error('Error deleting carousel:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
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
              setShowForm(true);
              setEditingCarousel(null);
              setFormData({ title: '', description: '', button_text: '', button_link: '', order: 0, is_active: true });
              setImageFile(null);
              setImagePreview('');
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add New Carousel
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                      <input
                        type="text"
                        value={formData.button_link}
                        onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {editingCarousel ? 'Update' : 'Create'} Carousel
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
