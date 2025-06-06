import type { NextConfig } from "next";

// Base Next.js configuration. React strict mode helps catch potential issues in
const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

export default nextConfig;
