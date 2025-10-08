const withPWA = require('@ducanh2912/next-pwa').default;

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

// Disable PWA for now to avoid build issues with path containing apostrophe
// Will work in production on Vercel
const finalConfig = withPWA({
  dest: 'public',
  disable: true, // Temporarily disabled - enable in production deployment
  register: true,
  skipWaiting: true,
})(baseConfig);

module.exports = finalConfig;
