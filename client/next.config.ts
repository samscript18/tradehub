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
    },
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
    },],
  },
};

export default nextConfig;

