import React from "react";
import Image from "next/image";
import { PropertyCardSmall, InfoBox } from "../molecules";

export const HeroVisualSection = () => {
  return (
    <div className="hero-visual-section relative w-[600px] h-[600px] mt-[-20px] flex-shrink-0 max-[1400px]:w-full max-[1400px]:h-[550px] max-[1400px]:flex max-[1400px]:justify-center max-md:h-[450px] max-sm:h-[380px]">
      <div className="relative w-full h-full max-[1400px]:w-[608px] max-lg:scale-90 max-md:scale-80 max-sm:scale-70">
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
          style={{
            width: '248px',
            height: '350px',
          }}
        >
          <Image 
            src="/images/rumahherokanan.jpg" 
            alt="Sub Property" 
            fill 
            className="object-cover" 
          />
        </div>
      </div>
    </div>
  );
};