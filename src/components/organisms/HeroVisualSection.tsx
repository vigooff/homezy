"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PropertyCardSmall, InfoBox } from "../molecules";

const BASE_WIDTH = 550;
const BASE_HEIGHT = 550;

export const HeroVisualSection = () => {
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 600) setScale(1);
      else if (w < 320) setScale(0.7);
      else setScale(0.7 + (w - 320) * (0.3 / 280));
    };

    update();
    requestAnimationFrame(() => setReady(true));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Konfigurasi animasi agar halus seperti Webflow (Soft Reveal)
  const webflowLike = {
    initial: { 
      scale: 0.9,      // Mulai dari 90% (tidak dari 0 supaya elegan)
      opacity: 0, 
      y: 20            // Sedikit muncul dari bawah
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0 
    },
    transition: { 
      duration: 0.8, 
      // FIX: Mengubah array ease menjadi string "cubic-bezier(...)"
      // Ini memperbaiki error TypeScript di Next.js 16 / Framer Motion v12
      ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    }
  };

  return (
    <div
      className="hero-visual-section flex-shrink-0 mx-auto"
      style={{
        width: `${BASE_WIDTH * scale}px`,
        height: `${BASE_HEIGHT * scale}px`,
        position: 'relative',
        // FIX: Pastikan undefined tidak membuat tanda kutip
        transition: ready ? 'width 0.2s ease, height 0.2s ease' : undefined,
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
          transition: ready ? 'transform 0.2s ease' : undefined,
        }}
      >
        {/* Rumah Kiri - Delay 0s */}
        <motion.div 
          className="absolute top-[20px] left-[0px] z-30 flex flex-col"
          initial={webflowLike.initial}
          animate={webflowLike.animate}
          transition={{ ...webflowLike.transition, delay: 0 }}
        >
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
        </motion.div>

        {/* Agent Card / Card Tengah - Delay 0.4s */}
        <motion.div 
          className="absolute top-[40px] left-[200px] z-50"
          initial={webflowLike.initial}
          animate={webflowLike.animate}
          transition={{ ...webflowLike.transition, delay: 0.4 }}
        >
          <PropertyCardSmall />
        </motion.div>

        {/* Rumah Kanan - Delay 0.2s */}
        <motion.div
          className="absolute top-[240px] left-[265px] border-[2px] border-black rounded-[50px] overflow-hidden bg-white z-20 shadow-xl mt-[-40px]"
          style={{ width: '238px', height: '340px' }}
          initial={webflowLike.initial}
          animate={webflowLike.animate}
          transition={{ ...webflowLike.transition, delay: 0.2 }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/rumahherokanan.jpg"
              alt="Sub Property"
              fill
              sizes="238px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};