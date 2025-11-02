'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Carousels',
      href: '/admin/carousels',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Services',
      href: '/admin/services',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Quote Requests',
      href: '/admin/quotes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Mobile Header */}
        <div className="bg-white shadow-lg border-b border-slate-200 fixed top-0 left-0 right-0 z-50 h-16">
          <div className="flex items-center justify-between p-4 h-full">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-200">
                <img 
                  src="/logo.jpeg" 
                  alt="Sylvie Logo"
                  className="w-8 h-8 object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Sylvie Admin</h1>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar Backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50
          w-80
          bg-white
          shadow-2xl border-r border-slate-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          mt-16
        `}>
          {/* User Profile Section */}
          <div className="p-6 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-200">
                <img 
                  src="/logo.jpeg" 
                  alt="Sylvie Logo"
                  className="w-10 h-10 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold truncate text-white">Admin User</p>
                <p className="text-sm text-green-100 truncate">Administrator</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 mt-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-200
                    ${isActive 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/50 border border-green-400' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md border border-transparent'
                    }
                  `}
                >
                  <div className={`
                    ${isActive ? 'text-white' : 'text-slate-500'}
                  `}>
                    {item.icon}
                  </div>
                  <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-700'}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-4 text-sm font-semibold text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Main Content */}
        <div className="pt-16 min-h-screen">
          <div className="p-4 h-full">
            {children}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Desktop Sidebar */}
        <div className="w-72 xl:w-80 bg-white border-r border-slate-200 shadow-xl flex flex-col">
          {/* Logo Section */}
          <div className="p-6 bg-gradient-to-br from-green-600 to-emerald-700">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-200">
                <img 
                  src="/logo.jpeg" 
                  alt="Sylvie Logo"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sylvie Admin</h1>
                <p className="text-sm text-green-100 font-medium">Waste Management</p>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">Admin User</p>
                <p className="text-xs text-slate-600 truncate">Administrator</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-200 group
                    ${isActive 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/50 border border-green-400' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md border border-transparent hover:border-slate-200'
                    }
                  `}
                >
                  <div className={`
                    ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}
                  `}>
                    {item.icon}
                  </div>
                  <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-700'}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-4 text-sm font-semibold text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200 hover:shadow-md"
            >
              <svg className="w-5 h-5 transition-transform duration-200 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Desktop Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Header */}
          <div className="bg-white shadow-sm border-b border-slate-200">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                  <p className="text-sm text-slate-600">Welcome back, Administrator</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-800">Admin User</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6 xl:p-8 h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}