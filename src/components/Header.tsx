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

  // Marquee content
  const marqueeContent = [
    { icon: '♻️', text: 'Keeping Kenya Clean, One Bin at a Time!' },
    { icon: '📧', text: 'sylviegarbagecollection@gmail.com' },
    { icon: '📞', text: '+254711515752' },
    { icon: '🚛', text: 'Reliable Waste Collection — Fast, Clean & Affordable!' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-green-700 text-white overflow-hidden">
        <div className="relative">
          <div className="whitespace-nowrap py-2 text-sm flex items-center">
            {[...marqueeContent, ...marqueeContent].map((item, index) => (
              <span 
                key={index} 
                className="mx-6 inline-flex items-center gap-2 font-medium"
              >
                <span className="text-green-200">{item.icon}</span>
                <span className="text-white">{item.text}</span>
                <span className="text-green-300 mx-2">•</span>
              </span>
            ))}
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-green-700 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-green-700 to-transparent"></div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-3 bg-white">
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
              <h1 className="text-xl font-bold text-green-800">Sylvie</h1>
              <p className="text-xs font-bold text-orange-500">
                Waste Collection
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Clean Links */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-semibold transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Get Quote Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/quote"
              className="bg-orange-500 px-6 py-2.5 rounded-lg font-semibold text-white hover:bg-orange-600 transition-colors duration-200 shadow-md"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Header - Hide quote button when menu is open */}
          <div className={`flex lg:hidden items-center space-x-2 transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
            <Link
              href="/quote"
              className="bg-orange-500 px-4 py-2.5 rounded-lg font-semibold text-white hover:bg-orange-600 transition-colors text-sm flex items-center gap-1"
            >
              Get Quote
            </Link>

            <button
              className="p-2.5 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-5 h-5"
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

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-green-700 text-white">
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
                <p className="text-xs font-bold text-orange-300">
                  Waste Collection
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white hover:text-orange-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Links - Clean and Simple */}
          <div className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-3 px-4 rounded-lg transition-colors duration-200 font-medium ${
                  isActive(item.href)
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link
                href="/quote"
                className="flex items-center justify-center w-full bg-orange-500 px-6 py-3 rounded-lg font-semibold text-white hover:bg-orange-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-green-600">📧</span>
                sylviegarbagecollection@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">📞</span>
                +254711515752
              </p>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .whitespace-nowrap {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .whitespace-nowrap:hover {
          animation-play-state: paused;
        }
      `}</style>
    </header>
  );
}