"use client";
import React from "react";
import Image from "next/image";
import { SubscribeForm } from "../molecules/SubscribeForm";

export const SubscribeCard = () => {
  return (
    <div 
      className="subscribe-card-wrapper relative bg-[#CFB9FD] border-[2px] border-black overflow-hidden flex items-center transition-all duration-300 mx-auto"
      style={{
        borderRadius: "15px",
        opacity: 1,
      }}
    >
      <div 
        className="pattern-overlay absolute top-0 h-full pointer-events-none z-0"
        style={{ 
          left: "50%",
          right: 0,
        }}
      >
        <div className="relative w-full h-full">
          <Image 
            src="/images/subscribe.svg" 
            alt="pattern" 
            fill 
            className="object-cover object-center" 
            priority
            style={{
              filter: 'brightness(0) invert(1)',
              opacity: 0.25 
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 w-full subscribe-content">
        <div className="flex flex-col gap-2">
          <h2 className="font-syne font-semibold text-[#FFFFFF] text-[48px] leading-[56px] tracking-tight">
            Subscribe To Our Newsletter
          </h2>
          <p className="font-hanken font-light text-[#E7DCFF] text-[18px] leading-[28px]">
            Join our newsletter to stay up to date on features and releases.
          </p>
        </div>

        <SubscribeForm />
      </div>
    </div>
  );
};