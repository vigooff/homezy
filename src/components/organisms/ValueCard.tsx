import React from "react";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    // ValueCard - ubah className card utama
        <div style={{padding: '24px'}} className="bg-[#FFFFFF] rounded-[12px] border border-[#E8E1FF] w-full flex flex-col">
      <div className="w-[70px] h-[70px] bg-[#E8E1FF] rounded-[16px] flex items-center justify-center text-[#7052FF] mb-8 shrink-0">
        {icon}
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