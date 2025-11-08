// src/components/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2">🍪 We Use Cookies</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking &quot;Accept All&quot;, you consent to our use of cookies. Learn more in our{' '}
            <Link href="/cookie-policy" className="text-green-600 hover:text-green-700 font-medium underline">
              Cookie Policy
            </Link>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={declineCookies}
            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm whitespace-nowrap"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium text-sm whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}