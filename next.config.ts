import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/firma", destination: "/about", permanent: false },
      { source: "/equipo", destination: "/about", permanent: false },
      { source: "/areas", destination: "/practice-areas", permanent: false },
      { source: "/contacto", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
