'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white border-b border-gray-200 shadow-sm isolate">
      {/* 🔹 Animated Top Bar */}
      <div className="bg-green-800 text-white overflow-hidden">
        <div className="whitespace-nowrap animate-marquee py-2 text-sm flex items-center">
          <span className="mx-8 inline-flex items-center gap-2">
            ♻️ Keeping Kenya Clean, One Bin at a Time!
          </span>

          <span className="mx-8 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
             sylviegarbagecollection@gmail.com
          </span>

          <span className="mx-8 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            +254711515752
          </span>

          <span className="mx-8 inline-flex items-center gap-2">
            🚛 Reliable Waste Collection — Fast, Clean & Affordable!
          </span>
        </div>
      </div>

      {/* 🔹 Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-4 relative z-[10000]">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/logo.jpeg"
                alt="Sylvie Waste and Garbage Collection Limited"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">Sylvie</h1>
              <p className="text-xs text-gray-500 -mt-1">
                Waste & Garbage Collection
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-green-600"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Get Quote */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/quote"
              className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition text-white shadow-md hover:shadow-lg"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Header (Toggle on Right) */}
          <div className="flex lg:hidden items-center space-x-3">
            <Link
              href="/quote"
              className="bg-orange-500 px-4 py-3 rounded-lg font-semibold hover:bg-orange-600 transition text-white flex items-center gap-2 shadow-md"
            >
              Get Quote
            </Link>

            <button
              className="p-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition shadow-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 🔹 Mobile Navigation (slides from left) */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-white z-[10001] shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Header with Logo */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-green-800 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.jpeg"
                  alt="Sylvie Waste and Garbage Collection Limited"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold">Sylvie</h2>
                <p className="text-xs text-green-100">
                  Waste & Garbage Collection Ltd
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white hover:text-orange-300 transition rounded-lg hover:bg-green-600"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <div className="p-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-4 px-4 rounded-xl transition-all duration-300 font-medium text-lg ${
                  isActive(item.href)
                    ? 'bg-green-50 text-green-600 font-semibold border-l-4 border-green-600'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link
                href="/quote"
                className="flex items-center justify-center w-full bg-orange-500 px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 transition text-white gap-2 shadow-md hover:shadow-lg text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Contact Info</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>📧 sylviegarbagecollection@gmail.com</p>
              <p>📞 +254711515752</p>
              <p>📞 +254782829515</p>
            </div>
          </div>
        </div>

        {/* 🔹 Dark Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[10000]"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* 🔹 Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </header>
  );
}
