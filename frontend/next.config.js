/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://strapi-lh2y.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;