/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        // pathname:"/photo/**"
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        // pathname:"/photo/**"
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
        port: '',
        // pathname:"/photo/**"
      },
    ],
  },
};

module.exports = nextConfig;
