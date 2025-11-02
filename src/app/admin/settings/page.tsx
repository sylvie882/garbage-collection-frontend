'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Admin {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export default function SettingsPage() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchAdminData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://sylviegarbagecollection.co.ke/api/public/api/admin/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setAdmin(data);
        setProfileForm({
          name: data.name,
          email: data.email,
        });
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://sylviegarbagecollection.co.ke/api/public/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileForm),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setAdmin(data);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error updating profile:', error);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://sylviegarbagecollection.co.ke/api/public/api/admin/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(passwordForm),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password changed successfully!');
        setPasswordForm({
          current_password: '',
          new_password: '',
          new_password_confirmation: '',
        });
      } else {
        setError(data.message || 'Failed to change password');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error changing password:', error);
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
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'password'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Change Password
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'system'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                System Info
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {message && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <form onSubmit={updateProfile} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {/* Change Password */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
                <form onSubmit={changePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.current_password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={passwordForm.new_password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={passwordForm.new_password_confirmation}
                      onChange={(e) => setPasswordForm({ ...passwordForm, new_password_confirmation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            )}

            {/* System Info */}
            {activeTab === 'system' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
                <div className="space-y-4 max-w-md">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Admin ID</span>
                    <span className="text-sm text-gray-900">{admin?.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Account Created</span>
                    <span className="text-sm text-gray-900">
                      {admin?.created_at ? new Date(admin.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Last Updated</span>
                    <span className="text-sm text-gray-900">
                      {admin?.updated_at ? new Date(admin.updated_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">API Base URL</span>
                    <span className="text-sm text-gray-900">http://localhost:8000/api</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-md font-semibold text-gray-900 mb-3">Danger Zone</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800 mb-3">
                      Once you log out, you'll need to log in again to access the admin panel.
                    </p>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Logout from Admin Panel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}