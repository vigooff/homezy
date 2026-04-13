"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const HeroSearchCard = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = isMounted && windowWidth < 900;

  const handleSearch = () => {
    router.push("/search");
  };

  const rowStyle: React.CSSProperties = {
    flex: isMobile ? undefined : '1',
    width: isMobile ? '100%' : undefined,
    minWidth: '0',
    gap: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isMobile ? 'center' : 'flex-start',
    paddingBottom: isMobile ? '16px' : undefined,
    borderBottom: isMobile ? '1px solid #F2F4F7' : undefined,
  };

  return (
    <div 
      style={{
        width: '100%',
        maxWidth: '100%', // Sudah diubah ke 900px
        height: 'auto',
        minHeight: '96px',
        borderRadius: '15px',
        padding: '28px 32px',
        gap: '32px',
        opacity: 1,
        border: '1px solid #000000',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Shadow diperhalus agar premium
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}
    >
      {/* Location */}
      <div style={rowStyle}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#E7DCFF', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Image src="/icons/location.svg" alt="Location" width={20} height={20} />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467]">Location</span> 
          <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">California, US</span>
        </div>
      </div>

      {/* Price */}
      <div style={rowStyle}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#E7DCFF', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Image src="/icons/price.svg" alt="Price" width={20} height={20} />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467]">Price</span>
          <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">$1500-$2500</span>
        </div>
      </div>

      {/* Type of Property */}
      <div style={{ ...rowStyle, borderBottom: 'none', paddingBottom: '0' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#E7DCFF', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Image src="/icons/house.svg" alt="House" width={20} height={20} />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467]">Type of Property</span>
          <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">Apartment</span>
        </div>
      </div>

      {/* Button Browse */}
      <button 
        onClick={handleSearch}
        aria-label="Search properties"
        className="font-hanken font-bold transition-all duration-300 hover:bg-[#333333]"
        style={{
          backgroundColor: '#1A1A1A',
          color: '#FFFFFF',
          padding: '16px 32px',
          borderRadius: '15px',
          fontSize: '16px',
          lineHeight: '24px',
          height: '56px',
          minWidth: '128px',
          width: isMobile ? '100%' : undefined,
          flexShrink: 0,
          marginTop: isMobile ? '8px' : '0px', 
        }}
      >
        Browse
      </button>
    </div>
  );
};