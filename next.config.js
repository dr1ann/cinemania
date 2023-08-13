/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    unoptimized: true,
    domains: ["image.tmdb.org"],
  },
  
  experimental: {
    appDir: true
  },
};

module.exports = nextConfig;