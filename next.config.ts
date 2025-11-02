/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration for better performance
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['sylviegarbagecollection.co.ke'],
    unoptimized: process.env.NODE_ENV === 'production' ? false : true,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Enable trailing slashes for better SEO (optional)
  trailingSlash: false,
  
  // Custom headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

export default nextConfig