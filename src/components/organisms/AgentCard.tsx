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
    <div className="
      bg-[#FFFFFF] rounded-[15px] border border-[#E8E1FF]
      p-6 max-[500px]:p-4
      group hover:shadow-xl transition-all duration-300
      flex justify-between items-center
      min-w-[210px] max-[500px]:min-w-0 max-[500px]:w-full
    ">
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="flex flex-col gap-[2px]">
          <h3 className="
            font-syne font-semibold leading-[32px] tracking-[-0.04em] text-[#1A1A1A]
            text-[24px] ml-[20px] mb-[-20px]
            max-[500px]:text-[20px] max-[500px]:ml-[12px]
          ">
            {name}
          </h3>
          <p className="
            font-hanken font-light leading-[28px] text-[#666666]
            text-[18px] ml-[20px]
            max-[500px]:text-[15px] max-[500px]:ml-[12px]
          ">
            {role}
          </p>
        </div>

        <div className="flex gap-3 ml-[20px] max-[500px]:ml-[12px]">
          {socialIcons.map((icon) => (
            <div
              key={icon.name}
              className="
                rounded-full bg-[#1A1A1A] mb-[25px]
                flex items-center justify-center cursor-pointer hover:bg-primary transition-colors
                w-[24px] h-[24px] ml-[8px]
                max-[500px]:w-[20px] max-[500px]:h-[20px] max-[500px]:ml-[4px]
              "
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

      <div className="
        relative rounded-[15px] bg-[#FFE8F5] overflow-hidden flex-shrink-0
        w-[108px] h-[108px] mr-[25px]
        max-[500px]:w-[80px] max-[500px]:h-[80px] max-[500px]:mr-[12px]
      ">
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