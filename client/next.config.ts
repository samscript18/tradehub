// import type { NextConfig } from "next";

const nextConfig = {
<<<<<<< HEAD
  eslint: {
    ignoreDuringBuilds: true,
=======
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
>>>>>>> 49dccabe5c17a672d4ab45bbbac3f3e8436d66dd
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },
}

export default nextConfig;

