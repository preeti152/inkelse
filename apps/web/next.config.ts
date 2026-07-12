import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable monorepo workspace package transpilation
  transpilePackages: ['@inkora/brand'],

  // Image optimization — Sanity CDN + Unsplash (placeholders) + Vercel
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Reasonable defaults for an e-commerce site
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Trailing slash off (cleaner SEO)
  trailingSlash: false,
};

export default nextConfig;
