import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Navbar } from "../components/molecules";
import { Footer } from "../components/organisms/Footer";

const hankenGrotesk = localFont({
  src: "../assets/fonts/HankenGrotesk-VariableFont_wght.ttf",
  variable: "--font-hanken",
  display: "swap",
});

const soehne = localFont({
  src: [
    {
      path: "../assets/fonts/TestSohneBreit-Leicht.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/TestSohneBreit-Buch.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-soehne",
  display: "swap",
});

const satoshi = localFont({
  src: "../assets/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

const syne = localFont({
  src: "../assets/fonts/Syne-VariableFont_wght.ttf",
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Homezy - Realize Your Dream Property",
  description: "Find your best apartment and house with Homezy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${hankenGrotesk.variable} ${soehne.variable} 
          ${satoshi.variable} ${syne.variable} 
          antialiased font-hanken bg-[#FBFAFF]
          min-h-screen flex flex-col
        `}
      >
        <Navbar />
       <main className="w-full relative flex-1" style={{ minHeight: '100vh', display: 'block', overflow: 'visible' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}