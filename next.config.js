/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: false,
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;