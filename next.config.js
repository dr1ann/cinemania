/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ["image.tmdb.org"],
  },
  experimental: {
    appDir: true
  },
};

module.exports = nextConfig;