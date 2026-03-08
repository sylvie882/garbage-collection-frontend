import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CopyProtection from '../components/CopyProtection';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { CompareProvider } from '@/contexts/CompareContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sylvie Garbage Collection - Professional Waste Management Services & Hygiene Products',
  description: "Kenya's first digital waste management company providing garbage collection, pest control, cleaning services, and premium hygiene products.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  keywords: 'garbage collection, waste management, hygiene products, air fresheners, soap dispensers, Nairobi Kenya, pest control, cleaning services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Only keep the favicon links */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
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