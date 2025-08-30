/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "photos.app.goo.gl", // Add this line
      "lh3.googleusercontent.com", // Also common for Google Drive thumbnails
      "via.placeholder.com",
      "drive.google.com",
      "api.shivenfccaards.com", // ✅ Corrected domain spelling here
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.shivenfccaards.com", // ✅ Corrected here too
        pathname: "/uploads/**", // Match all files and folders under 'uploads'
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Corrected here too
        pathname: "**", // Match all files and folders under 'uploads'
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "**",
      },
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
