"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PropertyCardSmall, InfoBox } from "../molecules";

const BASE_WIDTH = 550;
const BASE_HEIGHT = 550;

export const HeroVisualSection = () => {
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 600) {
  setScale(1);
} else if (w < 320) {
  setScale(0.7);
} else {
  // linear: 600px=1.0, 500px=0.85, 320px=0.7
  setScale(0.7 + (w - 320) * (0.3 / 280));
}
    };

    update();
    requestAnimationFrame(() => setReady(true));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="hero-visual-section flex-shrink-0 mx-auto"
      style={{
        width: `${BASE_WIDTH * scale}px`,
        height: `${BASE_HEIGHT * scale}px`,
        position: 'relative',
        transition: ready ? 'width 0.2s ease, height 0.2s ease' : 'none',
      }}
    >
      <div
        style={{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transformOrigin: 'top left',
          transform: scale < 1 ? `scale(${scale})` : undefined,
          position: 'absolute',
          top: 0,
          left: 0,
          transition: ready ? 'transform 0.2s ease' : 'none',
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
                sizes="238px"
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
            sizes="238px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};