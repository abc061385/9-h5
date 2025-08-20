import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/app/:path*",
            destination: "https://www.9mc.org/app/:path*",
            // destination: "https://www.9mc.one/app/:path*",
          },
        ]
      : [];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
