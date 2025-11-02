/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use static export for Vercel
  output: 'export',
  
  // Image optimization for static export
  images: {
    domains: ['sylviegarbagecollection.co.ke'],
    unoptimized: true, // Required for static exports
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Trailing slashes for better SEO
  trailingSlash: true,
  
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
  
  // Optional: Enable SWC minification for better performance
  swcMinify: true,
}

export default nextConfig