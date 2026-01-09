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
    <div className="bg-[#FFFFFF] w-[480px] h-[334px] rounded-[15px] border-[2px] border-[#F2F2F2] p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl flex-shrink-0">

      <div className="flex flex-col gap-8">
        <div className="flex gap-[12px] ml-[30px] mt-[30px]">
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src="/icons/Star.svg"
              alt="star"
              width={20}
              height={20}
            />
          ))}
        </div>

        <div className="h-[120px] overflow-hidden ml-[30px] mr-[20px]">
          <p className="font-hanken font-light text-[20px] leading-[30px] text-[#666666] line-clamp-4">
            &quot;{comment}&quot;
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="ml-[30px]">
          <h4 className="font-syne font-bold text-[24px] leading-[32px] text-[#1A1A1A] -mb-[8px]">
            {name}
          </h4>
          <p className="font-hanken font-light text-[18px] leading-[28px] text-[#666666] mb-[20px]">
            {role}
          </p>
        </div>

        <div className="relative w-[48px] h-[48px] flex-shrink-0 mr-[20px] mb-[20px]">
          <Image
            src="/icons/feedback.svg"
            alt="avatar"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};