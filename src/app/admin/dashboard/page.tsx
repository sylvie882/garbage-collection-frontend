'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  price_unit: string;
  image_path: string;
  youtube_url: string;
  is_active: boolean;
  featured: boolean;
  created_at: string;
}

interface QuoteRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  created_at: string;
}

interface Carousel {
  id: number;
  title: string;
  description: string;
  image_path: string;
  is_active: boolean;
  order: number;
}

export default function AdminDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    totalServices: 0,
    activeServices: 0,
    totalCarousels: 0,
    activeCarousels: 0,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const [servicesRes, quotesRes, carouselsRes] = await Promise.all([
        fetch('https://sylviegarbagecollection.co.ke/api/public/api/admin/services', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          credentials: 'include',
        }),
        fetch('http://localhost:8000/api/admin/quote-requests', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          credentials: 'include',
        }),
        fetch('https://sylviegarbagecollection.co.ke/api/public/api/admin/carousels', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          credentials: 'include',
        })
      ]);

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(servicesData.data || servicesData);
      }

      if (quotesRes.ok) {
        const quotesData = await quotesRes.json();
        setQuotes(quotesData.data || quotesData);
      }

      if (carouselsRes.ok) {
        const carouselsData = await carouselsRes.json();
        setCarousels(carouselsData.data || carouselsData);
      }

      // Update stats
      setStats({
        totalQuotes: quotes.length,
        pendingQuotes: quotes.filter(q => q.status === 'pending').length,
        totalServices: services.length,
        activeServices: services.filter(s => s.is_active).length,
        totalCarousels: carousels.length,
        activeCarousels: carousels.filter(c => c.is_active).length,
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch('https://sylviegarbagecollection.co.ke/api/public/api/admin/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      router.push('/admin/login');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const recentQuotes = quotes.slice(0, 5);
  const recentServices = services.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Sylvie Garbage Collection Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchData}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalQuotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingQuotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeServices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Carousels</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCarousels}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/admin/carousels"
                  className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 text-green-700 p-4 rounded-lg text-center hover:shadow-md transition-all group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                  <span className="font-medium">Carousels</span>
                  <p className="text-xs text-green-600 mt-1">{stats.activeCarousels} Active</p>
                </Link>
                <Link
                  href="/admin/services"
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 text-blue-700 p-4 rounded-lg text-center hover:shadow-md transition-all group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔧</div>
                  <span className="font-medium">Services</span>
                  <p className="text-xs text-blue-600 mt-1">{stats.activeServices} Active</p>
                </Link>
                <Link
                  href="/admin/quotes"
                  className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 text-orange-700 p-4 rounded-lg text-center hover:shadow-md transition-all group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📋</div>
                  <span className="font-medium">Quotes</span>
                  <p className="text-xs text-orange-600 mt-1">{stats.pendingQuotes} Pending</p>
                </Link>
                <Link
                  href="/admin/settings"
                  className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-gray-700 p-4 rounded-lg text-center hover:shadow-md transition-all group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
                  <span className="font-medium">Settings</span>
                  <p className="text-xs text-gray-600 mt-1">Profile & System</p>
                </Link>
              </div>
            </div>

            {/* Recent Quote Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Quote Requests</h2>
                <Link href="/admin/quotes" className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="space-y-3">
                {recentQuotes.length > 0 ? recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{quote.name}</p>
                      <p className="text-sm text-gray-600">{quote.service_type}</p>
                      <p className="text-xs text-gray-500">{quote.email} • {quote.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(quote.status)}`}>
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    No quote requests yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Services */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Services</h2>
              <div className="space-y-4">
                {recentServices.length > 0 ? recentServices.map((service) => (
                  <div key={service.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${service.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">KSh {service.price} {service.price_unit}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.featured ? 'Featured' : 'Standard'}
                    </span>
                  </div>
                )) : (
                  <div className="text-center py-4 text-gray-500">
                    No services added yet
                  </div>
                )}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-3">
                {[
                  { label: 'API Server', status: 'Operational', color: 'bg-green-500' },
                  { label: 'Database', status: 'Connected', color: 'bg-green-500' },
                  { label: 'File Storage', status: 'Active', color: 'bg-green-500' },
                  { label: 'Email Service', status: 'Ready', color: 'bg-green-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`}></div>
                      <span className="text-sm text-gray-600">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}