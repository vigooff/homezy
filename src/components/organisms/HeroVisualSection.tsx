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

  // Scale hanya aktif di 600-900px
  // Di atas 900px: tidak diubah (scale 1)
  // Di bawah 600px: globals.css sudah handle scale-65
  const getScale = () => {
    if (!isMounted) return 1;
    if (windowWidth >= 900) return 1;
    if (windowWidth < 600) return 1; // globals.css yang handle
    // Proporsional: 900px = scale 1, 600px = scale ~0.65
    return Math.max(0.65, windowWidth / 900);
  };

  const scale = getScale();
  const isScaled = isMounted && windowWidth < 900 && windowWidth >= 600;

  return (
    <div
      className="hero-visual-section relative flex-shrink-0 max-[1400px]:flex max-[1400px]:justify-center"
      style={{
        width: isScaled ? `${608 * scale}px` : undefined,
        height: isScaled ? `${600 * scale}px` : undefined,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="relative max-lg:scale-90 max-md:scale-80 max-sm:scale-70"
        style={{
          width: '608px',
          height: '600px',
          transformOrigin: 'top center',
          transform: isScaled ? `scale(${scale})` : undefined,
          flexShrink: 0,
        }}
      >
        <div className="absolute top-[50px] left-[40px] z-30 flex flex-col scale-110">
          <div 
            className="border-[2px] border-black overflow-hidden bg-white shadow-lg"
            style={{
              width: '248px',
              height: '264.8px',
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

        <div className="absolute top-[80px] left-[260px] z-50 scale-110">
          <PropertyCardSmall />
        </div>

        <div 
          className="absolute top-[280px] left-[340px] border-[2px] border-black rounded-[50px] overflow-hidden bg-white z-20 shadow-xl scale-110"
          style={{ width: '248px', height: '350px' }}
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