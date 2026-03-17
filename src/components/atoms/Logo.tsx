import React from "react";
import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <Image 
        src="/icons/Logo.svg" 
        alt="Homezy Logo" 
        width={32} 
        height={32} 
      />
      <span className="text-[24px] font-bold font-hanken ml-[10px]">Homezy</span>
    </div>
  );
};