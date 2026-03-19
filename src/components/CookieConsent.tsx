'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem('cookieConsent')) setShow(true); }, []);
  const accept = () => { localStorage.setItem('cookieConsent', 'accepted'); setShow(false); };
  const decline = () => { localStorage.setItem('cookieConsent', 'declined'); setShow(false); };
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <p className="font-bold text-slate-900 text-sm mb-1">We use cookies</p>
      <p className="text-slate-500 text-xs leading-relaxed mb-4">
        We use cookies to enhance your experience. Learn more in our{' '}
        <Link href="/cookie-policy" className="text-green-700 font-semibold hover:underline">Cookie Policy</Link>.
      </p>
      <div className="flex gap-2">
        <button onClick={decline} className="flex-1 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Decline</button>
        <button onClick={accept} className="flex-1 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold transition-colors">Accept</button>
      </div>
    </div>
  );
}
