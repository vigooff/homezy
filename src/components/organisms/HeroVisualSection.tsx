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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getScale = () => {
    if (!isMounted) return 1;
    if (windowWidth >= 900) return 1;
    if (windowWidth < 400) return 0.6;
    return Math.max(0.6, windowWidth / 900);
  };

  const scale = getScale();
  const CANVAS_WIDTH = 500;
  const LEFT_BLEED = 50; // dari left-[-50px] gambar kiri
  const TOTAL_WIDTH = CANVAS_WIDTH + LEFT_BLEED; // 550px total visual space


  return (
  <div
    className="hero-visual-section flex-shrink-0"
    style={{
      width: `${TOTAL_WIDTH * scale}px`,   // 550 * scale
      height: `${550 * scale}px`,
      position: 'relative',
    }}
  >
    <div
      style={{
        width: `${TOTAL_WIDTH}px`,          // 550px
        height: '550px',
        transformOrigin: 'top left',
        transform: scale < 1 ? `scale(${scale})` : undefined,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
        {/* Gambar Kiri */}
         <div className="absolute top-[20px] left-[0px] z-30 flex flex-col">
          <div
            className="border-[2px] border-black overflow-hidden bg-white shadow-lg"
            style={{
              width: '238px',
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

        {/* Card Tengah */}
         <div className="absolute top-[40px] left-[200px] z-50">
          <PropertyCardSmall />
        </div>

        {/* Gambar Kanan */}
        <div
          className="absolute top-[240px] left-[265px] border-[2px] border-black rounded-[50px] overflow-hidden bg-white z-20 shadow-xl mt-[-40px]"
          style={{ width: '238px', height: '340px' }}
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