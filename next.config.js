/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withPWA(nextConfig));
