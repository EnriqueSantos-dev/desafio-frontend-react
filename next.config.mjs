import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.freetogame.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
