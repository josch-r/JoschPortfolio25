import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["var(--font-geist)"],
      },
      colors: {
        "bg-primary": "#09090B",
        "bg-secondary": "#27272A",
        "bg-button-primary": "#FAFAFA",
        "text-primary": "#F5F5F5",
        "text-secondary": "#DADADA",
        "text-tertiary": "#949494",
        "text-dark": "#18181B",
        "primary": "#EB8333",
      },
      container: {
        center: true,
        padding: "124px",
      },
      gap: {
        "5": "20px",
      },
    },
  },
  plugins: [],
}

export default config

