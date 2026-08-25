import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  trailingSlash: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  experimental: {
    cpus: 1,
    workerThreads: false,
  }
};

export default nextConfig;