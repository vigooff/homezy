"use client";
import React from "react";
import Image from "next/image";

interface FeedbackCardProps {
  comment: string;
  name: string;
  role: string;
}

export const FeedbackCard = ({ comment, name, role }: FeedbackCardProps) => {
  return (
    <div className="bg-[#FFFFFF] w-[480px] h-[334px] rounded-[15px] border-[2px] border-[#F2F2F2] p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl flex-shrink-0 
      /* Tablet - Desktop Kecil (770px - 1199px) */
      max-[1199px]:w-[360px] 
      max-[1199px]:h-[300px] 
      max-[1199px]:p-6 
      /* Tablet - Mobile ( < 770px) */
      max-[770px]:w-[300px] 
      max-[770px]:h-auto 
      max-[770px]:p-5">
      
      <div className="flex flex-col gap-8 max-[1199px]:gap-4">
        <div className="flex gap-[12px] ml-[30px] mt-[30px] max-[1199px]:ml-0 max-[1199px]:mt-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative w-5 h-5 max-[1199px]:w-4 max-[1199px]:h-4">
              <Image src="/icons/Star.svg" alt="star" fill className="object-contain" />
            </div>
          ))}
        </div>

        <div className="h-[120px] overflow-hidden ml-[30px] mr-[20px] max-[1199px]:ml-0 max-[1199px]:mr-0 max-[1199px]:h-auto">
          <p className="font-hanken font-light text-[20px] leading-[30px] text-[#666666] line-clamp-4 max-[1199px]:text-[15px] max-[1199px]:leading-[22px] max-[770px]:text-[14px]">
            &quot;{comment}&quot;
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="ml-[30px] max-[1199px]:ml-0">
          <h4 className="font-syne font-bold text-[24px] leading-[32px] text-[#1A1A1A] -mb-[8px] max-[1199px]:text-[18px] max-[1199px]:mb-0 max-[770px]:text-[16px]">
            {name}
          </h4>
          <p className="font-hanken font-light text-[18px] leading-[28px] text-[#666666] mb-[20px] max-[1199px]:text-[13px] max-[1199px]:mb-0 max-[770px]:text-[12px]">
            {role}
          </p>
        </div>
        <div className="relative w-[48px] h-[48px] flex-shrink-0 mr-[20px] mb-[20px] max-[1199px]:mr-0 max-[1199px]:mb-0 max-[1199px]:w-10 max-[1199px]:h-10">
          <Image src="/icons/feedback.svg" alt="icon" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};