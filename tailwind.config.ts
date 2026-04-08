import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Tambahan dari Claude untuk safety
  ],
  theme: {
    // Breakpoints sesuai instruksi Telegram & Claude
    screens: {
      'sm': '640px',
      'md': '768px',   // Tablet / Design Desktop Start
      'lg': '1024px',  // Desktop awal
      'xl': '1280px',  // Desktop mid
      '2xl': '1440px', // Figma reference width
    },
    extend: {
      colors: {
        background: "#FBFAFF",
        foreground: "#1A1A1A",
        primary: "#7052FF",
        secondary: "#E8E1FF",
      },
      fontFamily: {
        // Menggabungkan font custom kamu dengan fallback default sans
        sans: ['Satoshi', 'Hanken Grotesk', ...defaultTheme.fontFamily.sans],
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
      // Menggabungkan letter spacing lama & baru dari Figma
      letterSpacing: {
        tighter: "-0.04em",
        'tight-figma': '-0.02em',
        'wide-figma': '0.04em',
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
      // Detail Presisi Figma dari Claude
      maxWidth: {
        'container': '1440px', // Bisa dipakai via max-w-container
      },
      borderRadius: {
        'card': '12px',
        'badge': '6px',
        'hero': '20px',
      },
      boxShadow: {
        'card': '0 2px 12px 0 rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px 0 rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};

export default config;