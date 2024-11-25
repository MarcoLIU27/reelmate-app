import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true, // Enable React Strict Mode
  eslint: {
    ignoreDuringBuilds: true, // Avoid ESLint errors during builds
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'], // Optimize Mantine imports
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/start',
      permanent: true, // HTTP 308 Permanent Redirect
    },
  ],
});

export default nextConfig;
