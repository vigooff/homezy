"use client";
import React, { useEffect } from "react";
import Image from "next/image";

interface FeedbackCardProps {
  comment: string;
  name: string;
  role: string;
  rating: any; 
}

export const FeedbackCard = ({ comment, name, role, rating }: FeedbackCardProps) => {
  const numericRating = parseInt(rating) || 0;

  useEffect(() => {
    console.log(`RENDER CHECK [${name}]:`, { numericRating });
  }, [name, numericRating]);

  return (
    <div className="
      bg-[#FFFFFF] rounded-[15px] border-[2px] border-[#F2F2F2]
      flex flex-col justify-between transition-all duration-300 hover:shadow-xl flex-shrink-0
      w-[480px] min-h-[334px] p-8
      max-[1199px]:w-[360px] max-[1199px]:min-h-[300px] max-[1199px]:p-6
      max-[770px]:w-[300px] max-[770px]:min-h-[260px] max-[770px]:p-5
      max-[360px]:w-[240px] max-[360px]:min-h-[240px] max-[360px]:p-4
    ">
      <div className="flex flex-col gap-8 max-[1199px]:gap-4">
        {/* RATING STARS */}
        <div className="flex gap-[6px] ml-[30px] mt-[30px] max-[1199px]:ml-0 max-[1199px]:mt-0 min-h-[24px] items-center">
  {numericRating > 0 ? (
    Array.from({ length: numericRating }).map((_, i) => (
      <svg 
        key={i} 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="#F68533"
        xmlns="http://www.w3.org/2000/svg"
        className="max-[1199px]:w-4 max-[1199px]:h-4"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))
  ) : (
    <span className="text-[10px] text-gray-400 italic">No Rating</span>
  )}
</div>

        <div className="ml-[30px] mr-[20px] max-[1199px]:ml-0 max-[1199px]:mr-0">
          <p className="font-hanken font-light text-[20px] leading-[30px] text-[#666666] line-clamp-4
            max-[1199px]:text-[15px] max-[1199px]:leading-[22px]
            max-[770px]:text-[14px] max-[770px]:line-clamp-4
          ">
            &quot;{comment}&quot;
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end mt-6">
        <div className="ml-[30px] max-[1199px]:ml-0">
          <h4 className="font-syne font-bold text-[24px] leading-[32px] text-[#1A1A1A] -mb-[8px]
            max-[1199px]:text-[18px] max-[1199px]:mb-0
            max-[770px]:text-[16px]
          ">
            {name}
          </h4>
          <p className="font-hanken font-light text-[18px] leading-[28px] text-[#666666] mb-[20px]
            max-[1199px]:text-[13px] max-[1199px]:mb-0
            max-[770px]:text-[12px]
          ">
            {role}
          </p>
        </div>
        <div className="relative w-[48px] h-[48px] flex-shrink-0 mr-[20px] mb-[20px]
          max-[1199px]:mr-0 max-[1199px]:mb-0
          max-[1199px]:w-10 max-[1199px]:h-10
        ">
          <Image src="/icons/feedback.svg" alt="icon" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};