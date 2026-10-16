import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/projects/:slug*", destination: "/#systems", permanent: true },
    ];
  },
};

export default nextConfig;
