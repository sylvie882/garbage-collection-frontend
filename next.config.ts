/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.sylviegarbagecollection.co.ke',
        pathname: '/storage/**',
      },
    ],
    unoptimized: false,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  // ADD THIS: Force unique build ID to bust Vercel cache
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },

  // Add redirects for old WordPress URLs
  async redirects() {
    return [
      // Redirect common WordPress patterns
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true
      },
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true
      },
      {
        source: '/category/:path*',
        destination: '/',
        permanent: true
      },
      {
        source: '/tag/:path*',
        destination: '/',
        permanent: true
      },
      {
        source: '/author/:path*',
        destination: '/',
        permanent: true
      },
      
      // Redirect common alternative URLs to your actual routes
      {
        source: '/about-us',
        destination: '/about',
        permanent: true
      },
      {
        source: '/about-us.html',
        destination: '/about',
        permanent: true
      },
      {
        source: '/about.php',
        destination: '/about',
        permanent: true
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true
      },
      {
        source: '/contact-us.html',
        destination: '/contact',
        permanent: true
      },
      {
        source: '/contact.php',
        destination: '/contact',
        permanent: true
      },
      {
        source: '/get-quote',
        destination: '/quote',
        permanent: true
      },
      {
        source: '/request-quote',
        destination: '/quote',
        permanent: true
      },
      {
        source: '/quotes',
        destination: '/quote',
        permanent: true
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true
      },
      {
        source: '/privacy.html',
        destination: '/privacy-policy',
        permanent: true
      },
      {
        source: '/terms',
        destination: '/terms-of-service',
        permanent: true
      },
      {
        source: '/terms.html',
        destination: '/terms-of-service',
        permanent: true
      },
      {
        source: '/tos',
        destination: '/terms-of-service',
        permanent: true
      },
      
      // Service-related redirects
      {
        source: '/services.html',
        destination: '/services',
        permanent: true
      },
      {
        source: '/our-services',
        destination: '/services',
        permanent: true
      },
      {
        source: '/garbage-collection',
        destination: '/services',
        permanent: true
      },
      {
        source: '/waste-management',
        destination: '/services',
        permanent: true
      },
    ];
  },
};

export default nextConfig;