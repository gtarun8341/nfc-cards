// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost', 'https://api.shivencardds.com','via.placeholder.com'], // Add your hostname(s) here
    },
  };
  
  export default nextConfig;