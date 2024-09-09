/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['recharts', '@splinetool/react-spline'],
  productionBrowserSourceMaps: false, // Désactive les source maps en production
  webpack: (config) => {
    config.externals.push({
      'spline-runtime': 'Spline',
    });
    return config;
  },
};

module.exports = nextConfig;