import React from "react";
import Image from "next/image";

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

export const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <div className="bg-[#FFFFFF] rounded-[12px] border border-[#E8E1FF] w-full flex flex-col p-[32px] max-[400px]:p-[20px] h-full">
      <div className="w-[70px] h-[70px] bg-[#E8E1FF] rounded-[16px] flex items-center justify-center mb-8 shrink-0">
        <Image src={icon} alt={title} width={32} height={32} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-syne font-bold text-[24px] text-[#1A1A1A]">
          {title}
        </h3>
        <p className="font-hanken text-[#666666] leading-[1.6] text-[16px]">
          {description}
        </p>
      </div>
    </div>
  );
};