import type { Metadata } from 'next';
import './globals.css';
import CopyProtection from '../components/CopyProtection';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { CompareProvider } from '@/contexts/CompareContext';

export const metadata: Metadata = {
  title: {
    default: 'Sylvie Garbage Collection | Professional Waste Management Kenya',
    template: '%s | Sylvie Waste Collection'
  },
  description: "Kenya's first digital waste management company offering reliable garbage collection, recycling, pest control, cleaning services, and premium hygiene products. Serving all 47 counties including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and nationwide.",
  icons: { 
    icon: '/favicon.ico', 
    shortcut: '/favicon.ico', 
    apple: '/favicon.ico' 
  },
  keywords: [
    'garbage collection Kenya',
    'waste management Nairobi',
    'garbage collection services',
    'waste collection companies Kenya',
    'residential waste collection',
    'commercial waste management',
    'recycling services',
    'pest control Kenya',
    'cleaning services Nairobi',
    'hygiene products',
    'Sylvie waste collection',
    'bin collection',
    'skip hire',
    'industrial waste management',
    'Nairobi garbage collection',
    'Mombasa waste collection',
    'Kisumu garbage services',
    'Nakuru waste management',
    'Eldoret garbage collection',
    'waste management companies Kenya',
    'garbage collection prices Kenya',
    'door to door waste collection',
    'recycling companies Kenya'
  ],
  authors: [{ name: 'Sylvie Waste Collection' }],
  creator: 'Sylvie Waste Collection',
  publisher: 'Sylvie Waste Collection',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sylviegarbagecollection.co.ke',
  },
  openGraph: {
    title: 'Sylvie Garbage Collection — Professional Waste Management Services Across All 47 Kenyan Counties',
    description: 'Kenya\'s first digital waste management company. Reliable garbage collection, recycling, pest control, and hygiene products serving Nairobi, Mombasa, Kisumu, Nakuru, and all 47 counties nationwide.',
    url: 'https://sylviegarbagecollection.co.ke',
    siteName: 'Sylvie Waste Collection',
    images: [
      {
        url: 'https://sylviegarbagecollection.co.ke/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sylvie Waste Collection - Professional Waste Management Services Across Kenya',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sylvie Garbage Collection | Professional Waste Management Across All 47 Kenyan Counties',
    description: 'Reliable garbage collection services across all 47 counties in Kenya. Kenya\'s first digital waste management company offering nationwide coverage.',
    images: ['https://sylviegarbagecollection.co.ke/twitter-image.jpg'],
    site: '@sylvie_waste',
    creator: '@sylvie_waste',
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  category: 'waste management',
  classification: 'Waste Collection Services',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://sylviegarbagecollection.co.ke'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Sylvie Waste',
    statusBarStyle: 'black-translucent',
  },
  applicationName: 'Sylvie Waste Collection',
  referrer: 'origin-when-cross-origin',
  other: {
    'geo.region': 'KE',
    'geo.placename': 'Kenya',
    'geo.position': '-1.286389;36.817223',
    'ICBM': '-1.286389, 36.817223',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        
        {/* Geo meta tags for Kenya */}
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Kenya" />
        <meta name="geo.position" content="-1.286389;36.817223" />
        <meta name="ICBM" content="-1.286389, 36.817223" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        
        {/* Structured Data for Local Business with Nationwide Coverage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Sylvie Waste Collection",
              "alternateName": "Sylvie Garbage Collection",
              "description": "Kenya's first digital waste management company offering garbage collection, recycling, pest control, cleaning services, and hygiene products across all 47 counties in Kenya.",
              "image": "https://sylviegarbagecollection.co.ke/logo.jpeg",
              "url": "https://sylviegarbagecollection.co.ke",
              "telephone": "+254700000000",
              "email": "info@sylviegarbagecollection.co.ke",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Nairobi",
                "addressRegion": "Nairobi",
                "addressCountry": "KE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-1.286389",
                "longitude": "36.817223"
              },
              "areaServed": [
                { "@type": "City", "name": "Nairobi" },
                { "@type": "City", "name": "Mombasa" },
                { "@type": "City", "name": "Kisumu" },
                { "@type": "City", "name": "Nakuru" },
                { "@type": "City", "name": "Eldoret" },
                { "@type": "State", "name": "All 47 Counties in Kenya" }
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "07:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.facebook.com/sylviewaste",
                "https://twitter.com/sylvie_waste",
                "https://www.instagram.com/sylviewaste",
                "https://www.linkedin.com/company/sylvie-waste-collection"
              ],
              "serviceType": [
                "Garbage Collection",
                "Recycling Services",
                "Pest Control",
                "Cleaning Services",
                "Hygiene Products",
                "Waste Management",
                "Skip Hire",
                "Commercial Waste Collection",
                "Residential Waste Collection"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Waste Management Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Residential Waste Collection",
                      "areaServed": { "@type": "Country", "name": "Kenya" }
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Commercial Waste Management",
                      "areaServed": { "@type": "Country", "name": "Kenya" }
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Recycling Services",
                      "areaServed": { "@type": "Country", "name": "Kenya" }
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Pest Control",
                      "areaServed": { "@type": "Country", "name": "Kenya" }
                    }
                  }
                ]
              }
            })
          }}
        />
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