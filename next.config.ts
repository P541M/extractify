// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  eslint: {
    // Run ESLint during builds to catch issues
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Check for TypeScript errors during build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
