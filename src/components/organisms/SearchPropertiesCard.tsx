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

  if (!isMounted) return null;

  // ─── Breakpoints ──────────────────────────────────────────────────────────
  const isSmallMobile = windowWidth <= 500;
  const isMobile   = windowWidth > 500 && windowWidth < 600;
  const isMidRange = windowWidth >= 600 && windowWidth < 1200;
  const isDesktop  = windowWidth >= 1200;
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── MOBILE VERSION (<768px) ── Vertical Stack ─────────────────────── */}
      {(isSmallMobile || isMobile) && (
      <div 
        className="flex flex-col border border-[#000000] shadow-sm bg-[#FFFFFF]"
        style={{
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          height: "auto",
          minHeight: "318px",
          borderRadius: "15px",
          padding: "16px",
          gap: "24px",
        }}
      >
          {/* Location Field */}
          <div className="flex items-center" style={{ gap: "12px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/location.svg" alt="Location" width={20} height={20} />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Location</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">California, US</span>
            </div>
          </div>

          {/* Price Field */}
          <div className="flex items-center" style={{ gap: "12px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/price.svg" alt="Price" width={20} height={20} />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Price</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">$1500-$2500</span>
            </div>
          </div>

          {/* Property Type Field */}
          <div className="flex items-center" style={{ gap: "12px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/house.svg" alt="House" width={20} height={20} />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Type of Property</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">Apartment</span>
            </div>
          </div>

          {/* Browse Button */}
          <button 
          className="w-full font-hanken font-bold bg-[#1A1A1A] text-[#FFFFFF] transition-all hover:bg-[#333333] flex items-center justify-center"
          style={{ height: "62px", borderRadius: "15px" }}
          >
          Browse
        </button>
        </div>
      )}

      {/* ── MID-RANGE VERSION (768px - 1199px) ── Vertical "Boxy" Stack ───── */}
      {/*
        Ibarat karakter RPG yang masuk lorong sempit:
        - Item field (Location, Price, Type) disusun vertikal (flex-col)
        - Divider horizontal memisahkan setiap field (bukan vertikal)
        - Browse button tetap di paling bawah, full width
        - Card terlihat "boxy" dan kokoh, bukan memanjang tipis
      */}
      {isMidRange && (
      <div 
        className="flex flex-col border border-[#000000] shadow-sm bg-[#FFFFFF]"
        style={{ 
          width: "100%", // UBAH INI dari 740px ke 100%
          height: "auto", // UBAH INI agar container mengikuti isi
          minHeight: "318px", 
          borderRadius: "24px",
          padding: "24px"
        }}
      >
          {/* Location Field */}
          <div className="flex items-center flex-1" style={{ gap: "16px", paddingTop: "12px", paddingBottom: "12px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/location.svg" alt="Location" width={20} height={20} />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Location</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">California, US</span>
            </div>
          </div>

          {/* Horizontal Divider */}
          {/* Price Field */}
          <div className="flex items-center flex-1" style={{ gap: "16px", paddingTop: "12px", paddingBottom: "12px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/price.svg" alt="Price" width={20} height={20} />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Price</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">$1500-$2500</span>
            </div>
          </div>

          {/* Horizontal Divider */}
          {/* Property Type Field */}
          <div className="flex items-center flex-1" style={{ gap: "16px", paddingTop: "12px", paddingBottom: "12px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/house.svg" alt="House" width={20} height={20} />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Type of Property</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">Apartment</span>
            </div>
          </div>

          {/* Browse Button - full width, di paling bawah */}
          <button
            className="w-full font-hanken font-bold bg-[#1A1A1A] text-[#FFFFFF] transition-all hover:bg-[#333333] flex items-center justify-center flex-shrink-0"
            style={{
              height: "56px",
              borderRadius: "12px",
              marginTop: "12px",
            }}
          >
            Browse
          </button>
        </div>
      )}

      {/* ── DESKTOP VERSION (≥1200px) ── Horizontal Row ───────────────────── */}
      {isDesktop && (
        <div 
          className="flex items-center border border-[#000000] shadow-sm bg-[#FFFFFF]"
          style={{
            width: "100%",
            height: "96px",
            borderRadius: "15px",
            padding: "0 24px",
            gap: "24px",
          }}
        >
          <div className="flex items-center flex-1 min-w-0" style={{ gap: "16px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/location.svg" alt="Location" width={20} height={20} className="w-5 h-5" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Location</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">California, US</span>
            </div>
          </div>

          <div className="w-[1px] h-10 bg-[#E8E1FF] flex-shrink-0" />

          <div className="flex items-center flex-1 min-w-0" style={{ gap: "16px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/price.svg" alt="Price" width={20} height={20} className="w-5 h-5" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1">Price</label>
              <span className="font-hanken font-bold text-[15px] text-[#1A1A1A] truncate">$1500-$2500</span>
            </div>
          </div>

          <div className="w-[1px] h-10 bg-[#E8E1FF] flex-shrink-0" />
          
          <div className="flex items-center flex-1 min-w-0" style={{ gap: "16px" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}>
              <Image src="/icons/house.svg" alt="House" width={20} height={20} className="w-5 h-5" />
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
            }}
          >
            Browse
          </button>
        </div>
      )}
    </>
  );
};