'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Faq {
  id: number;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const API_URL = 'https://api.sylviegarbagecollection.co.ke/api';

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    is_active: true
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchFaqs();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchFaqs = async () => {
    try {
      setError('');
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/faqs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch FAQs: ${response.status}`);
      }

      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setError('Failed to load FAQs. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingFaq 
        ? `${API_URL}/admin/faqs/${editingFaq.id}`
        : `${API_URL}/admin/faqs`;
      
      const method = editingFaq ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editingFaq ? 'FAQ updated successfully!' : 'FAQ created successfully!');
        setFormData({ question: '', answer: '', order: 0, is_active: true });
        setEditingFaq(null);
        fetchFaqs();
        
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error(`Failed to save FAQ: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setError('Failed to save FAQ. Please try again.');
    }
  };

  const handleEdit = (faq: Faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      is_active: faq.is_active
    });
    setError('');
    setMessage('');
  };

  const handleDelete = async (faqId: number) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        setError('');
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/admin/faqs/${faqId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setMessage('FAQ deleted successfully!');
          fetchFaqs();
          setTimeout(() => setMessage(''), 3000);
        } else {
          throw new Error(`Failed to delete FAQ: ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        setError('Failed to delete FAQ. Please try again.');
      }
    }
  };

  const toggleStatus = async (faqId: number) => {
    try {
      setError('');
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/faqs/${faqId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage('FAQ status updated successfully!');
        fetchFaqs();
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error(`Failed to toggle FAQ status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
      setError('Failed to update FAQ status. Please try again.');
    }
  };

  const cancelEdit = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '', order: 0, is_active: true });
    setError('');
    setMessage('');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ← Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
                <p className="text-gray-600">Manage frequently asked questions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchFaqs}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Refresh
              </button>
              <button 
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Messages */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button 
              onClick={fetchFaqs}
              className="ml-4 text-red-800 underline hover:text-red-900"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add/Edit Form */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter the question..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter the answer..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Active (visible to public)</span>
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  {editingFaq ? 'Update FAQ' : 'Create FAQ'}
                </button>
                {editingFaq && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">Manage FAQs</h2>
              <p className="text-sm text-gray-600 mt-1">
                {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''} total
              </p>
            </div>
            
            {faqs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-lg">No FAQs found.</p>
                <p className="text-gray-400 text-sm mt-2">Create your first FAQ using the form.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            faq.is_active 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                            {faq.is_active ? 'Active' : 'Inactive'}
                          </span>
                          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                            Order: {faq.order}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-800 text-lg mb-3">{faq.question}</h4>
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-md text-sm">
                          {faq.answer}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2 ml-4 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleStatus(faq.id)}
                          className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-200 ${
                            faq.is_active
                              ? 'bg-orange-600 text-white hover:bg-orange-700'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {faq.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}