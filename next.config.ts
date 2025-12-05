import type { NextConfig } from "next"
import("./app/libs/env/check.ts")

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_TOKEN: process.env.API_TOKEN,
  },
}

export default nextConfig
