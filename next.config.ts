import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // allow external artwork from pokemondb using remotePatterns (preferred over domains)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.pokemondb.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
