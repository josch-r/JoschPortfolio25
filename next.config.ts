import type { NextConfig } from "next"
import type { Configuration as WebpackConfig } from "webpack"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: WebpackConfig) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config.externals = [...(config.externals as any[]), { canvas: "canvas" }]
    return config
  },
}

export default nextConfig

