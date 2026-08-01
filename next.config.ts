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
      { source: "/firma", destination: "/#perfil", permanent: false },
      { source: "/areas", destination: "/#areas", permanent: false },
      { source: "/equipo", destination: "/#perfil", permanent: false },
      { source: "/contacto", destination: "/#contacto", permanent: false },
    ];
  },
};

export default nextConfig;
