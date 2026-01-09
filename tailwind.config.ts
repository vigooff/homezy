import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBFAFF",
        foreground: "#1A1A1A",
        primary: "#7052FF",
        secondary: "#E8E1FF",
      },
      fontFamily: {
        hanken: ["var(--font-hanken)", "sans-serif"],
        soehne: ["var(--font-soehne)", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"], 
      },
      fontWeight: {
        light: "300",
        normal: "400",
        semibold: "600",
        bold: "700",
      },
      letterSpacing: {
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;