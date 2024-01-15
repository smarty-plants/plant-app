/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      API_URL: process.env.API_URL,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 'avatar.vercel.sh'
        }
      ]
    }
  };
  
  module.exports = nextConfig;
  