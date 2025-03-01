// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  eslint: {
    // Don't run ESLint during builds to prevent deployment failures
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
