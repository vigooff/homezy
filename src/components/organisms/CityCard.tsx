"use client";
import React from "react";
import Image from "next/image";

interface CityCardProps {
  name: string;
  state: string;
  count: number;
  image?: string;
}

export const CityCard = ({ name, state, count, image }: CityCardProps) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className={`
        bg-[#FFFFFF] rounded-[15px] border border-[#E8E1FF] group cursor-pointer 
        hover:shadow-xl transition-all duration-300 overflow-hidden w-full
        /* 2. HAPUS scale, min-w, dan origin-center di sini */
      `}>
        
        <div className="relative w-full h-[350px] overflow-hidden">
          <Image
            src={image || "/images/city1.png"}
            alt={name}
            fill
            sizes="(max-width: 1200px) 33vw, 365px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>

        <div className="px-[12px] pt-6 pb-8">
          <h3 className="font-syne font-semibold text-[24px] leading-[32px] tracking-[-0.04em] text-[#1A1A1A] px-[20px] mb-2">
            {name}{state ? `, ${state}` : ""}
          </h3>
          
          <div className="flex items-center gap-2 px-[20px]">
            <Image 
               src="/icons/house.svg" 
               alt="home" 
               width={20} 
               height={20} 
              />
            <p className="font-hanken font-light text-[18px] leading-[28px] text-[#666666]">
              {count}+ listings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};