import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/projects/:slug*", destination: "/gtm#systems", permanent: true },
      { source: "/insurance", destination: "/", permanent: true },
      { source: "/pilot", destination: "/", permanent: true },
      { source: "/entrance", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
