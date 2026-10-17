import type { NextConfig } from "next";

const mediaOrigin = new URL(process.env.MEDIA_ORIGIN ?? "http://127.0.0.1:8000");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: mediaOrigin.protocol.replace(":", "") as "http" | "https",
        hostname: mediaOrigin.hostname,
        port: mediaOrigin.port,
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
