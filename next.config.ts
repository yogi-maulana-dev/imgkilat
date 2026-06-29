import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root (avoids picking up an unrelated lockfile higher up).
  turbopack: { root: process.cwd() },
  // Sharp is a native module – keep it external to the server bundle.
  serverExternalPackages: ["sharp"],
  experimental: {
    // Allow larger payloads for Server Actions / route handlers (bulk uploads).
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
