import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      // Add specific rewrites for health and metrics endpoints
      {
        source: '/health',
        destination: process.env.NEXT_PUBLIC_API_URL + '/health',
      },
      {
        source: '/metrics',
        destination: process.env.NEXT_PUBLIC_API_URL + '/metrics',
      },
      // Then the general catch-all for other API endpoints
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
