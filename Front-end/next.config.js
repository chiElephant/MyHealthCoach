/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    STRAVA_ID: process.env.STRAVA_ID,
    STRAVA_SECRET: process.env.STRAVA_SECRET,
    STRAVA_REFRESH: process.env.STRAVA_REFRESH,
    STRAVA_REDIRECT: process.env.STRAVA_REDIRECT,
    FITBIT_ID: process.env.FITBIT_ID,
    FITBIT_SECRET: process.env.FITBIT_SECRET,
    FITBIT_SCOPE: process.env.FITBIT_SCOPE,
    FITBIT_RESPONSE_TYPE: process.env.FITBIT_CODE,
    DB_ENDPOINT: process.env.DB_ENDPOINT,
    API_URL: process.env.API_URL,
    LOCAL: process.env.LOCAL
  },
  async redirects () {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.edamam.com'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      }
    ]
  }
}

module.exports = nextConfig
