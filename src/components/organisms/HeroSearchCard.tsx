"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, DollarSign, Home } from "lucide-react";

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
        maxWidth: '763px',
        height: 'auto',
        minHeight: '96px',
        borderRadius: '15px',
        padding: '28px 32px',
        gap: '32px',
        opacity: 1,
        border: '1px solid #E8E1FF',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        backgroundColor: '#FFFFFF',
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'center',
      }}
    >
      <div style={rowStyle}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#E7DCFF', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
        <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467]">Location</span> 
        <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">California, US</span>
       </div>
      </div>

      <div style={rowStyle}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#E7DCFF', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467]">Price</span>
          <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">$1500-$2500</span>
        </div>
      </div>

      <div style={{ ...rowStyle, borderBottom: 'none', paddingBottom: '0' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#E7DCFF', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Home className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467]">Type of Property</span>
          <span className="font-hanken font-bold text-[16px] leading-[24px] text-[#1A1A1A] whitespace-nowrap">Apartment</span>
        </div>
      </div>

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