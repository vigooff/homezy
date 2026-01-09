"use client";
import React from "react";
import Image from "next/image";
import { SubscribeForm } from "../molecules/SubscribeForm";

export const SubscribeCard = () => {
  return (
    <div 
      className="relative bg-[#CFB9FD] border-[#E8E1FF] overflow-hidden flex items-center"
      style={{
        width: "1160px",
        height: "380px",
        borderRadius: "15px",
        borderWidth: "2px",
        padding: "56px 72px",
        opacity: 1,
      }}
    >
      <div 
        className="absolute top-0 h-full pointer-events-none"
        style={{ 
          left: "50%",
          right: 0,
          height: "100%", 
          opacity: 1 
        }}
      >
        <Image 
          src="/images/subscribe.svg" 
          alt="pattern" 
          fill 
          className="object-cover object-center brightness-0 invert opacity-100" 
          priority
        />
      </div>

      <div 
        className="relative z-10 flex flex-col"
        style={{
          width: "416px",
          height: "268px",
          gap: "24px",
          opacity: 1,
        }}
      >
        <div 
          className="flex flex-col relative -top-[100px]"
          style={{
            width: "416px",
            height: "176px",
            gap: "8px",
            opacity: 1,
          }}
        >
          <h2 
            className="font-syne font-semibold text-[#FFFFFF]"
            style={{
              width: "358px",
              height: "112px",
              fontSize: "48px",
              lineHeight: "56px",
              letterSpacing: "-4%",
            }}
          >
            Subscribe To Our Newsletter
          </h2>
          <p 
            className="font-hanken font-light text-[#E7DCFF]"
            style={{
              width: "416px",
              height: "56px",
              fontSize: "18px",
              lineHeight: "28px",
              opacity: 1,
            }}
          >
            Join our newsletter to stay up to date on features and releases.
          </p>
        </div>

        <div className="relative -mb-[250px]">
            <SubscribeForm />
        </div>
      </div>
    </div>
  );
};