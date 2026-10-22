import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/projects/:slug*", destination: "/", permanent: true },
      { source: "/insurance", destination: "/", permanent: true },
      { source: "/pilot", destination: "/", permanent: true },
      { source: "/entrance", destination: "/", permanent: true },
      { source: "/writing/:slug*", destination: "/", permanent: true },
      { source: "/systems/:slug*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
