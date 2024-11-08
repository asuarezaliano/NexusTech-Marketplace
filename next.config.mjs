/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  sassOptions: {
    prependData: `@import 'src/scss/main';`,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.shopify.com',
        protocol: 'https',
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
}

export default bundleAnalyzer(nextConfig)
