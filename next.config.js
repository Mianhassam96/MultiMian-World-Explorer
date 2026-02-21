/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/MultiMian-World-Explorer' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/MultiMian-World-Explorer/' : '',
}

module.exports = nextConfig
