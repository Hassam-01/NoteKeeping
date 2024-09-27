/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Add the following line to resolve the `fs` module error
      config.resolve.fallback = {
        fs: false, // Prevent webpack from trying to resolve 'fs' module
        // Add any other necessary fallbacks here
      };
      return config;
    },
  };
  
  export default nextConfig;
  