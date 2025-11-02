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
}

interface QuoteRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState<Service[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
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
      
      const [servicesRes, quotesRes] = await Promise.all([
        fetch('https://sylviegarbagecollection.co.ke/api/public/api/admin/services', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }),
        fetch('https://sylviegarbagecollection.co.ke/api/public/api/admin/quote-requests', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ]);

      if (servicesRes.ok && quotesRes.ok) {
        const servicesData = await servicesRes.json();
        const quotesData = await quotesRes.json();
        setServices(servicesData);
        setQuotes(quotesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const stats = [
    { label: 'Total Quote Requests', value: quotes.length, change: '+12%' },
    { label: 'Pending Quotes', value: quotes.filter(q => q.status === 'pending').length, change: '-2%' },
    { label: 'Services', value: services.length, change: '+5%' },
    { label: 'Active Services', value: services.filter(s => s.is_active).length, change: '+0%' }
  ];

  const recentQuotes = quotes.slice(0, 5);

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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, Administrator</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchData}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Refresh Data
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/admin/carousels"
                  className="bg-green-50 text-green-700 p-4 rounded-lg text-center hover:bg-green-100 transition-colors group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                  <span className="font-medium">Carousel</span>
                </Link>
                <Link
                  href="/admin/services"
                  className="bg-blue-50 text-blue-700 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔧</div>
                  <span className="font-medium">Services</span>
                </Link>
                <Link
                  href="/admin/quotes"
                  className="bg-orange-50 text-orange-700 p-4 rounded-lg text-center hover:bg-orange-100 transition-colors group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📋</div>
                  <span className="font-medium">Quotes</span>
                </Link>
                <Link
                  href="/admin/settings"
                  className="bg-gray-50 text-gray-700 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
                  <span className="font-medium">Settings</span>
                </Link>
              </div>
            </div>

            {/* Recent Quote Requests */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Quote Requests</h2>
                <Link href="/admin/quotes" className="text-green-600 hover:text-green-700 font-medium text-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{quote.name}</p>
                      <p className="text-sm text-gray-600">{quote.service_type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        quote.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-3">
                {[
                  { label: 'API Server', status: 'Operational', color: 'bg-green-500' },
                  { label: 'Database', status: 'Operational', color: 'bg-green-500' },
                  { label: 'File Storage', status: 'Operational', color: 'bg-green-500' },
                  { label: 'Email Service', status: 'Operational', color: 'bg-green-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-gray-600">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { action: `${quotes.length} new quote requests`, time: 'Today' },
                  { action: `${services.length} services active`, time: 'Current' },
                  { action: 'System updated', time: '1 day ago' },
                  { action: 'Admin logged in', time: 'Just now' }
                ].map((activity, index) => (
                  <div key={index} className="text-sm">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-500">{activity.time}</p>
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