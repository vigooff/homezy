"use client";
import React from "react";
import Image from "next/image";

interface AgentCardProps {
  name: string;
  role: string;
  avatar: string;
}

export const AgentCard = ({ name, role, avatar }: AgentCardProps) => {
  const socialIcons = [
    { name: "telpon", src: "/icons/telpon.svg" },
    { name: "ig", src: "/icons/ig.svg" },
    { name: "fb", src: "/icons/fb.svg" },
    { name: "twitter", src: "/icons/twitter.svg" },
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-[15px] border border-[#E8E1FF] p-6 group hover:shadow-xl transition-all duration-300 flex justify-between items-center flex-1 min-w-[340px]">
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-syne font-semibold text-[24px] leading-[32px] tracking-[-0.04em] ml-[20px] mb-[-20px] text-[#1A1A1A]">
            {name}
          </h3>
          <p className="font-hanken font-light text-[18px] leading-[28px] ml-[20px] text-[#666666]">
            {role}
          </p>
        </div>

        <div className="flex gap-3 ml-[20px]">
          {socialIcons.map((icon) => (
            <div 
              key={icon.name}
              className="w-[24px] h-[24px] rounded-full bg-[#1A1A1A] ml-[8px] mb-[25px] flex items-center justify-center cursor-pointer hover:bg-primary transition-colors"
            >
              <Image 
                src={icon.src} 
                alt={icon.name} 
                width={14} 
                height={14} 
                className="brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-[108px] h-[108px] rounded-[15px] bg-[#FFE8F5] mr-[25px] overflow-hidden flex-shrink-0">
        <Image
          src={avatar}
          alt={name}
          fill
          sizes="108px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
};