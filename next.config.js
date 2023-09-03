/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    unoptimized: true,
    domains: ["image.tmdb.org", "via.placeholder.com"],
  },
  
  experimental: {
    appDir: true
  },
};

module.exports = nextConfig;