"use client";
import React from "react";
import Image from "next/image";
import * as LucideIcons from "lucide-react"; 

interface CategoryCardProps {
  iconName: string;
  title: string;
  count: number;
}

export const CategoryCard = ({ iconName, title, count }: CategoryCardProps) => {
  const localIcons = ["buildings", "building", "buildings-2", "house", "people", "coin", "like-shapes"];
  const isLocal = localIcons.includes(iconName);

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-[15px] border border-[#E8E1FF] w-[365px] h-[110px] 
                    max-[1200px]:max-w-[500px] max-[900px]:max-w-[350px] 
                    flex items-center justify-between hover:shadow-lg transition-all duration-300 
                    group cursor-pointer overflow-hidden">
      
      <div className="flex items-center gap-4">
        <div className="w-[70px] h-[70px] bg-[#E7DCFF] rounded-[16px] ml-[10px] min-[1200px]:ml-[25px] flex items-center justify-center flex-shrink-0">
          {isLocal ? (
            <Image 
              src={`/icons/${iconName}.svg`}
              alt={title}
              width={40}
              height={40}
            />
          ) : (
            (() => {
              const IconComponent = (LucideIcons as any)[iconName];
              return IconComponent ? (
                <IconComponent size={32} className="text-[#968CAB]" />
              ) : (
                <LucideIcons.Home size={32} className="text-[#968CAB]" />
              );
            })()
          )}
        </div>

        <div className="text-left">
          <h3 className="font-syne font-bold text-[18px] text-[#1A1A1A] ml-[10px] min-[1200px]:ml-[15px] leading-tight">
            {title}
          </h3>
          <p className="font-hanken text-[14px] ml-[10px] min-[1200px]:ml-[15px] text-[#666666]">
            {count}+ listings
          </p>
        </div>
      </div>

      <div className="mr-[10px] min-[1200px]:mr-[20px] flex items-center justify-center transition-all flex-shrink-0 group/btn">
        <div className="relative w-6 h-6">
           <Image 
            src="/icons/arrow-right-up.svg" 
            alt="arrow icon"
            fill
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </div>
  );
};