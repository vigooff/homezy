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
      fontSize: {
        'hero-xs': '2rem',
        'hero-sm': '2.5rem',
        'hero-md': '3rem',
        'hero-lg': '3.5rem',
        'hero-xl': '4.5rem',
        'body-xs': '0.875rem',
        'body-sm': '1rem',
        'body-md': '1.125rem',
        'body-lg': '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;