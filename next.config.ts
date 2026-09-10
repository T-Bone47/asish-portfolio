import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Project screenshots / diagrams will live under public/images once supplied.
  // Add remote domains here only if media ever gets hosted externally.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Keep the WebGL hero and other client-heavy visuals out of the main
  // server bundle — components should dynamic-import them (see Section 16
  // of the spec: WebGL must ship with a non-WebGL fallback).
  experimental: {
    optimizePackageImports: ["three", "@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;
