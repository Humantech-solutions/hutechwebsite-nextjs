import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  compress: false,
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