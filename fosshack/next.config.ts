import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages (only in production)
  ...(isDev ? {} : { output: 'export' }),

  // Set base path for the /fosshack subdirectory (only in production)
  // In dev mode, no basePath so it can be accessed directly at root
  ...(isDev ? {} : { basePath: '/fosshack' }),

  // Set asset prefix to ensure all assets load from /fosshack (only in production)
  ...(isDev ? {} : { assetPrefix: '/fosshack' }),

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Trailing slash for better GitHub Pages compatibility (only in production)
  ...(isDev ? {} : { trailingSlash: true }),
};

export default nextConfig;
