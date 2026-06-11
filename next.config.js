/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR mode (no output: 'export') - hosting supports Node.js
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
