import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    const hf = "https://www.gohyperflow.com";
    return [
      // The insurance pages moved to Hyperflow.
      { source: "/services/:slug*", destination: hf, permanent: true },
      { source: "/how-it-works", destination: hf, permanent: true },
      { source: "/trust", destination: hf, permanent: true },
      { source: "/audit", destination: hf, permanent: true },
      { source: "/insurance", destination: hf, permanent: true },
      { source: "/pilot", destination: hf, permanent: true },
      // The GTM portfolio is now the homepage.
      { source: "/gtm", destination: "/", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/projects/:slug*", destination: "/#systems", permanent: true },
      { source: "/entrance", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
