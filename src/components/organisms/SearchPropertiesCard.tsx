"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export const SearchPropertiesCard = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Don't render anything until mounted (avoid hydration mismatch)
  if (!isMounted) return null;

  return (
    <>
      {/* MOBILE VERSION - Vertical Stack - Only <768px */}
      {windowWidth < 768 && (
        <div 
          className="flex flex-col border border-[#E8E1FF] shadow-sm bg-[#FFFFFF] "
          style={{
            width: "100%",
            maxWidth: "335px",
            height: "318px",
            borderRadius: "15px",
            padding: "16px",
            gap: "32px",
            margin: "0 auto"
          }}>
          
          {/* Location Field */}
          <div className="flex items-center" style={{ gap: "12px" }}>
            <div 
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#E7DCFF",
                borderRadius: "12px",
              }}>
              <Image 
                src="/icons/location.svg" 
                alt="Location" 
                width={20} 
                height={20}
              />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Location</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">California, US</span>
            </div>
          </div>


          {/* Price Field */}
          <div className="flex items-center" style={{ gap: "12px" }}>
            <div 
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#E7DCFF",
                borderRadius: "12px",
              }}>
              <Image 
                src="/icons/price.svg" 
                alt="Price" 
                width={20} 
                height={20}
              />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Price</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">$1500-$2500</span>
            </div>
          </div>


          {/* Property Type Field */}
          <div className="flex items-center" style={{ gap: "12px" }}>
            <div 
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#E7DCFF",
                borderRadius: "12px",
              }}>
              <Image 
                src="/icons/house.svg" 
                alt="House" 
                width={20} 
                height={20}
              />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Type of Property</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">Apartment</span>
            </div>
          </div>

          {/* Browse Button */}
          <button 
            className="w-full font-hanken font-bold bg-[#1A1A1A] text-[#FFFFFF] transition-all hover:bg-[#333333] flex items-center justify-center mt-[2px]"
            style={{
              height: "62px",
              borderRadius: "15px",
            }}>
            Browse
          </button>
        </div>
      )}

      {/* DESKTOP VERSION - Horizontal - Only ≥768px */}
      {windowWidth >= 768 && (
        <div 
          className="flex items-center border border-[#E8E1FF] shadow-sm bg-[#FFFFFF]"
          style={{
            width: "100%",
            height: "96px",
            borderRadius: "15px",
            padding: "0 24px",
            gap: "24px",
          }}>
          
          <div className="flex items-center flex-1 min-w-0" style={{ gap: "16px" }}>
            <div 
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#E7DCFF",
                borderRadius: "12px",
              }}>
              <Image 
                src="/icons/location.svg" 
                alt="Location" 
                width={20} 
                height={20}
                className="w-5 h-5"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Location</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">California, US</span>
            </div>
          </div>

          <div className="w-[1px] h-10 bg-[#E8E1FF] flex-shrink-0" />

          <div className="flex items-center flex-1 min-w-0" style={{ gap: "16px" }}>
            <div 
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#E7DCFF",
                borderRadius: "12px",
              }}>
              <Image 
                src="/icons/price.svg" 
                alt="Price" 
                width={20} 
                height={20}
                className="w-5 h-5"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Price</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">$1500-$2500</span>
            </div>
          </div>

          <div className="w-[1px] h-10 bg-[#E8E1FF] flex-shrink-0" />
          
          <div className="flex items-center flex-1 min-w-0" style={{ gap: "16px" }}>
            <div 
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#E7DCFF",
                borderRadius: "12px",
              }}>
              <Image 
                src="/icons/house.svg" 
                alt="House" 
                width={20} 
                height={20}
                className="w-5 h-5"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Type of Property</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">Apartment</span>
            </div>
          </div>

          <button 
            className="font-hanken font-bold bg-[#1A1A1A] text-[#FFFFFF] transition-all hover:bg-[#333333] flex-shrink-0 flex items-center justify-center"
            style={{
              width: "140px",
              height: "64px",
              gap: "8px",
              padding: "20px 40px",
              borderRadius: "15px",
              opacity: 1,
            }}>
            Browse
          </button>
        </div>
      )}
    </>
  );
};
