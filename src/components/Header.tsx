'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCompare } from '@/contexts/CompareContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Sanitary Bins', href: '/sanitary-bins' },
    { name: 'BinBags', href: '/bin-bags' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  const marqueeItems = [
    'Keeping Kenya Clean, One Bin at a Time',
    'sylviegarbagecollection@gmail.com',
    '+254 711 515 752',
    'Reliable Waste Collection — Fast, Clean & Affordable',
    '500+ Locations Served Across Kenya',
    '100% Eco-Friendly Disposal',
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Marquee strip */}
      <div className="bg-green-800 text-white overflow-hidden h-8 flex items-center">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 32s linear infinite' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-bold text-white flex-shrink-0">
              {item} <span className="text-white mx-3">·</span>
            </span>
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
      </div>

      {/* Main nav */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="relative h-12 w-[180px] sm:h-16 sm:w-[240px] lg:h-20 lg:w-[320px] xl:h-24 xl:w-[420px]">
              <Image
                src="/logo2.png"
                alt="Sylvie Waste Collection"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-orange-500 bg-white-50'
                    : 'text-slate-600 hover:text-orange-500 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/quote" className="ml-2 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md">
              Quote
            </Link>
          </div>

          {/* Mobile right */}
          <div className={`flex lg:hidden items-center gap-1.5 sm:gap-2 transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
            <Link href="/quote" className="bg-orange-500 text-white text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg whitespace-nowrap">
              Quote
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1.5 sm:p-2 bg-green-700 text-white rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 bg-green-800 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative rounded-lg overflow-hidden bg-green-700">
              <Image src="/logo.jpeg" alt="Sylvie" fill className="object-contain p-0.5" />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: "'Fraunces', serif" }}>Sylvie Waste Collection</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="p-1 text-white/80 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}
              className={`block py-3 px-4 rounded-xl font-semibold text-sm transition-colors ${
                isActive(item.href) ? 'bg-green-50 text-green-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link href="/quote" className="block w-full bg-orange-500 text-white text-center py-3 rounded-xl font-bold text-sm" onClick={() => setIsMenuOpen(false)}>
              Get Free Quote
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-500 font-medium mb-1">Contact Us</p>
          <p className="text-sm text-slate-700 font-semibold">+254 711 515 752</p>
          <p className="text-xs text-slate-500">sylviegarbagecollection@gmail.com</p>
        </div>
      </div>
      {isMenuOpen && <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setIsMenuOpen(false)} />}
    </header>
  );
}