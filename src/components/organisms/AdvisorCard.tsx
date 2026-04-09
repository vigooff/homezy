"use client";
import React from "react";
import Image from "next/image";
import { SocialIcon } from "../atoms/SocialIcon";

export const PropertyCardSmall = () => {
  const socialTypes = ["phone", "instagram", "facebook", "twitter"];

  return (
    <div 
      className="absolute flex items-center justify-between z-50 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-[2px] border-black max-md:w-[200px] max-md:h-[75px] max-md:p-[14px] max-sm:w-[180px] max-sm:h-[70px] max-sm:p-[12px] mt-[20px]" 
      style={{
        width: '200px',
        height: '60px',
        borderRadius: '35px',
        padding: '18px',
        backgroundColor: '#ffffff',
      }}
    >
      <div className="flex flex-col justify-center flex-1">
        <h3 className="font-satoshi font-bold text-black text-[17px] leading-tight mb-[-10px] max-md:text-[15px] max-sm:text-[14px]">
          Edwin Martins
        </h3>
        <p className="font-hanken font-normal text-gray-500 text-[13px] mb-[6px] max-md:text-[12px] max-sm:text-[11px]">
          Property Advisor
        </p>
        <div className="flex items-center gap-[6px] max-sm:gap-[4px]">
          {socialTypes.map((type, idx) => (
            <SocialIcon key={idx} type={type} />
          ))}
        </div>
      </div>
      
      <div className="relative w-[75px] h-[75px] bg-[#E8E1FF] rounded-[22px] overflow-hidden flex-shrink-0 max-md:w-[65px] max-md:h-[65px] max-sm:w-[60px] max-sm:h-[60px]">
        <Image 
          src="/images/userhero.png" 
          alt="Edwin Martins" 
          fill 
          className="object-cover" 
        />
      </div>
    </div>
  );
};