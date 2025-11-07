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
};

export default nextConfig;
