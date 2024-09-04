/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['recharts'],
  productionBrowserSourceMaps: false, // Désactive les source maps en production
};

module.exports = nextConfig;