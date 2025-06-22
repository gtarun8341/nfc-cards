/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com"], // Add your image domains here

    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.shivencardds.com", // Backend production domain
        pathname: "/uploads/**", // Match all files and folders under 'uploads'
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Example domain
      },
      {
        protocol: "http",
        hostname: "localhost", // For local development
        port: "5000", // Specify your backend server's port during development
        pathname: "/uploads/**", // Match all files and folders under 'uploads'
      },
    ],
  },
};

export default nextConfig;
