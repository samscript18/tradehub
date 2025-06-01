// import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
    {
      protocol: 'https',
      hostname: 'encrypted-tbn0.gstatic.com',
    },],
  },
};

export default nextConfig;

