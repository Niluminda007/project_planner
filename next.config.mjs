/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "https://img.clerk.com", "img.clerk.com"],
  },
  compiler: {
    styledComponents: {
      // Enabled by default.
      cssProp: true,
    },
  },
};

export default nextConfig;
