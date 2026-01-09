import React from "react";
import Image from "next/image";
import { SocialIcon } from "../atoms";

export const PropertyCardSmall = () => {
  const socialIcons = [
    <svg key="p" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    <svg key="i" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    <svg key="f" width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    <svg key="t" width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
  ];

  return (
    <div 
      className="absolute flex items-center justify-between z-50 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-[2px] border-black" 
      style={{
        width: '220px',
        height: '80px',
        borderRadius: '35px',
        padding: '18px',
        backgroundColor: '#ffffffff',
      }}
    >
      <div className="flex flex-col justify-center flex-1">
        <h3 className="font-satoshi font-bold text-black text-[17px] leading-tight mb-[-10px]">
          Edwin Martins
        </h3>
        <p className="font-hanken font-normal text-gray-500 text-[13px] mb-[10px]">
          Property Advisor
        </p>
        <div className="flex items-center gap-[6px]">
          {socialIcons.map((icon, idx) => (
            <SocialIcon key={idx} icon={icon} />
          ))}
        </div>
      </div>
      
      <div className="relative w-[75px] h-[75px] bg-[#E8E1FF] rounded-[22px] overflow-hidden flex-shrink-0">
        <Image 
          src="/images/userhero.png" 
          alt="Edwin Martins" 
          fill 
          className="object-cover" 
        />
      </div>
    </div>
  );
};