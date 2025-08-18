/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
