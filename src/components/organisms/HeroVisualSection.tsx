"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PropertyCardSmall, InfoBox } from "../molecules";

export const HeroVisualSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getScale = () => {
    if (!isMounted) return 1;
    if (windowWidth >= 900) return 1;
    if (windowWidth < 600) return 1; 
    return Math.max(0.65, windowWidth / 900);
  };

  const scale = getScale();
  const isScaled = isMounted && windowWidth < 900 && windowWidth >= 600;

  return (
    <div
      className="hero-visual-section relative flex-shrink-0"
      style={{
        width: isScaled ? `${500 * scale}px` : '500px', // Dikecilkan dari 608
        height: isScaled ? `${550 * scale}px` : '550px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="relative max-lg:scale-90 max-md:scale-80 max-sm:scale-70"
        style={{
          width: '500px',
          height: '550px',
          transformOrigin: 'top center',
          transform: isScaled ? `scale(${scale})` : undefined,
          flexShrink: 0,
        }}
      >
        {/* Gambar Kiri: Scale dihapus agar tidak off-side */}
        <div className="absolute top-[40px] left-[40px] z-30 flex flex-col">
          <div 
            className="border-[2px] border-black overflow-hidden bg-white shadow-lg"
            style={{
              width: '248px', // Dikecilkan sedikit
              height: '264px',
              borderTopLeftRadius: '40px',
              borderTopRightRadius: '40px',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '40px',
            }}
          >
            <div className="relative w-full h-full">
              <Image 
                src="/images/rumahherokiri.jpg" 
                alt="Main Property" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
          <InfoBox />
        </div>

        {/* Card Tengah: Posisi left disesuaikan */}
        <div className="absolute top-[60px] left-[180px] z-50">
          <PropertyCardSmall />
        </div>

        {/* Gambar Kanan: Dikecilkan & Posisi disesuaikan */}
        <div 
          className="absolute top-[240px] left-[260px] border-[2px] border-black rounded-[50px] overflow-hidden bg-white z-20 shadow-xl mt-[-40px]"
          style={{ width: '190px', height: '280px' }}
        >
          <Image 
            src="/images/rumahherokanan.jpg" 
            alt="Sub Property" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};