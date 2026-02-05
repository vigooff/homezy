"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import router
import { MapPin, DollarSign, Home } from "lucide-react";

export const HeroSearchCard = () => {
  const router = useRouter();
  const handleSearch = () => {
  router.push("/search");
  };

  return (
    <div 
      className="flex max-[900px]:flex-col items-center border border-[#E8E1FF] shadow-sm bg-[#FFFFFF] mx-auto"
      style={{
        width: "100%",
        maxWidth: "763px",
        height: "auto",
        minHeight: "96px",
        borderRadius: "15px",
        padding: "28px 32px",
        gap: "32px", 
        opacity: 1,
      }}
      >
      <div 
        className="flex items-center max-[900px]:w-full max-[900px]:pb-4 max-[900px] max-[900px]:border-gray-100"
        style={{
          flex: "1",
          minWidth: "0",
          gap: "12px",
        }}
      >
        <div 
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#E7DCFF",
            borderRadius: "15px",
          }}
        >
          <MapPin className="w-5 h-5 text-primary" />
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <label className="font-hanken font-light text-[14px] leading-[20px] text-[#666666]">
            Location
          </label>
          <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">
            California, US
          </span>
        </div>
      </div>

      <div 
        className="flex items-center max-[900px]:w-full max-[900px]:pb-4 max-[900px] max-[900px]:border-gray-100"
        style={{
          flex: "1",
          minWidth: "0",
          gap: "12px",
        }}
      >
        <div 
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#E7DCFF",
            borderRadius: "15px",
          }}
        >
          <DollarSign className="w-5 h-5 text-primary" />
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <label className="font-hanken font-light text-[14px] leading-[20px] text-[#666666]">
            Price
          </label>
          <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">
            $1500-$2500
          </span>
        </div>
      </div>

      <div 
        className="flex items-center max-[900px]:w-full max-[900px]:pb-4 max-[900px] max-[900px]:border-gray-100"
        style={{
          flex: "1",
          minWidth: "0",
          gap: "12px",
        }}
      >
        <div 
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#E7DCFF",
            borderRadius: "15px",
          }}
        >
          <Home className="w-5 h-5 text-primary" />
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <label className="font-hanken font-light text-[14px] leading-[20px] text-[#666666]">
            Type of Property
          </label>
          <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">
            Apartment
          </span>
        </div>
      </div>

      <button 
        onClick={handleSearch}
        className="font-hanken font-bold transition-all duration-300 hover:bg-[#333333] flex-shrink-0 max-[900px]:w-full max-[900px]:mt-2"
        style={{
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          padding: "16px 32px",
          borderRadius: "15px",
          fontSize: "16px",
          lineHeight: "24px",
          height: "56px",
          minWidth: "128px"
        }}
      >
        Browse
      </button>
    </div>
  );
};