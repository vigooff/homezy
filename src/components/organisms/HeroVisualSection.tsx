import React from "react";
import Image from "next/image";
import { PropertyCardSmall, InfoBox } from "../molecules";

export const HeroVisualSection = () => {
  return (
    <div className="relative w-[52%] h-[750px] flex-shrink-0 ml-[100px]">
      <div className="relative w-full h-full">

        <div className="absolute top-0 left-[80px] z-30 flex flex-col">
          <div 
            className="border-t-[2px] border-b-[2px] border-x-[2px] border-black overflow-hidden bg-white shadow-lg"
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

        <div style={{ position: 'absolute', top: '50px', left: '300px', zIndex: 40 }}>
           <PropertyCardSmall />
        </div>

        <div 
          className="absolute top-[280px] left-[360px] border-[2px] border-black rounded-[50px] overflow-hidden bg-white z-20 shadow-xl"
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