import type { Metadata } from 'next';
import './globals.css';
import CopyProtection from '../components/CopyProtection';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { CompareProvider } from '@/contexts/CompareContext';

export const metadata: Metadata = {
  title: 'Sylvie Garbage Collection — Professional Waste Management Kenya',
  description: "Kenya's first digital waste management company. Garbage collection, pest control, cleaning services and premium hygiene products across Nairobi, Nakuru, Narok and Laikipia.",
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/favicon.ico' },
  keywords: 'garbage collection, waste management, hygiene products, Nairobi Kenya, pest control, cleaning services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <CopyProtection />
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              {children}
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
