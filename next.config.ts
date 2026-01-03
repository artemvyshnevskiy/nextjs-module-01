import type { NextConfig } from "next"
import withFlowbiteReact from "flowbite-react/plugin/nextjs"

import("./app/libs/env/check.ts")

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_TOKEN: process.env.API_TOKEN,
  },
}

export default withFlowbiteReact(nextConfig)
