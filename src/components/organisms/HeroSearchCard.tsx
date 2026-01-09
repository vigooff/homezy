"use client";
import React from "react";
import { MapPin, DollarSign, Home } from "lucide-react";

export const HeroSearchCard = () => {
  return (
    <div 
      className="flex items-center border border-[#E8E1FF] shadow-sm"
      style={{
        width: "763px",
        height: "96px",
        backgroundColor: "#FFFFFF",
        borderRadius: "15px",
        padding: "20px",
        gap: "24px", 
        opacity: 1,
      }}
    >
      <div 
        className="flex items-center"
        style={{
          width: "170px",
          height: "44px",
          gap: "12px",
          opacity: 1,
        }}
      >
        <div 
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#E7DCFF",
            borderRadius: "15px",
            opacity: 1,
          }}
        >
          <MapPin className="w-5 h-5 text-primary" />
        </div>

        <div className="flex flex-col justify-center" style={{ width: "100px", height: "44px" }}>
          <label className="font-hanken font-light text-[14px] leading-[24px] text-[#666666]">
            Location
          </label>
          <span className="font-hanken font-bold text-[16px] leading-[20px] text-[#1A1A1A]">
            California, US
          </span>
        </div>
      </div>

      <div 
        className="flex items-center"
        style={{
          width: "170px",
          height: "44px",
          gap: "12px",
          opacity: 1,
        }}
      >
        <div 
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#E7DCFF",
            borderRadius: "15px",
            opacity: 1,
          }}
        >
          <DollarSign className="w-5 h-5 text-primary" />
        </div>

        <div className="flex flex-col justify-center" style={{ width: "100px", height: "44px" }}>
          <label className="font-hanken font-light text-[14px] leading-[24px] text-[#666666]">
            Price
          </label>
          <span className="font-hanken font-bold text-[16px] leading-[20px] text-[#1A1A1A]">
            $1500-$2500
          </span>
        </div>
      </div>

      <div 
        className="flex items-center"
        style={{
          width: "170px",
          height: "44px",
          gap: "12px",
          opacity: 1,
        }}
      >
        <div 
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#E7DCFF",
            borderRadius: "15px",
            opacity: 1,
          }}
        >
          <Home className="w-5 h-5 text-primary" />
        </div>

        <div className="flex flex-col justify-center" style={{ width: "100px", height: "44px" }}>
          <label className="font-hanken font-light text-[14px] leading-[24px] text-[#666666]">
            Type of Property
          </label>
          <span className="font-hanken font-bold text-[16px] leading-[20px] text-[#1A1A1A]">
            Apartment
          </span>
        </div>
      </div>

      <button 
        className="font-hanken font-bold transition-all duration-300 hover:bg-[#333333] flex-shrink-0"
        style={{
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          padding: "16px 32px",
          borderRadius: "15px",
          fontSize: "16px",
          lineHeight: "20px",
          height: "56px",
          width: "128px"
        }}
      >
        Browse
      </button>
    </div>
  );
};