/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:4000/api",
  },
};

export default nextConfig;
