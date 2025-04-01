import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vibecodeparty-public.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'vibecodeparty-public.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'drgfjd45uzjza.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
