"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyFeature } from "../atoms/PropertyFeature";
import { Property } from "../../types/properties";

interface PropertyCardLargeProps {
  property: Property;
}

export const PropertyCardLarge = ({ property }: PropertyCardLargeProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMidRange = isMounted && windowWidth <= 1200 && windowWidth > 600;
  const isSmall    = isMounted && windowWidth <= 600;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex bg-[#FFFFFF] rounded-[15px] border border-[#E8E1FF] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-visible min-h-[420px] relative max-[1200px]:flex-col max-[1200px]:h-auto w-full max-w-[1200px]">
        
        {property.isFeatured && (
        <div
          className="absolute top-[20px] left-[-8px] z-[100] max-[1400px]:scale-90 max-[1400px]:origin-left"
          style={{
            backgroundColor: "#000000",
            borderRadius: "8px 8px 8px 0px",
            height: "34px",
            minWidth: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 12px",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            position: "absolute",
          }}
        >
          {/* Konten Utama */}
          <div className="flex items-center gap-2">
            {/* ✅ FIX: Ubah Star.svg menjadi star.svg (huruf kecil) */}
            <Image src="/icons/star.svg" alt="Featured" width={14} height={14} className="shrink-0" />
            <span className="text-[#FFFFFF] text-[10px] font-[900] uppercase tracking-[0.08em] whitespace-nowrap leading-none">
              FEATURED
            </span>
          </div>

          {/* SEGITIGA LIPATAN */}
          <div 
            className="absolute"
            style={{
              top: "100%", 
              left: "0",   
              width: "0",
              height: "0",
              borderTop: "8px solid #B7B8C1",   
              borderLeft: "8px solid transparent", 
            }}
          />
        </div>
      )}

        <div className="relative w-[500px] min-h-full flex-shrink-0 rounded-l-[15px] overflow-hidden max-[1200px]:w-full max-[1200px]:h-[300px] max-[1200px]:rounded-t-[15px] max-[1200px]:rounded-l-none">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 1200px) 100vw, 500px" 
            className="object-cover"
            loading="lazy"
          />
        </div>
      
        <div className="flex-1 p-[32px] flex flex-col max-[1200px]:p-[24px]" style={{ gap: isMidRange || isSmall ? '20px' : '16px' }}>
          <div className="flex justify-between items-start max-[1200px]:flex-col max-[1200px]:gap-4">
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-baseline gap-1">
                <span className="font-syne font-semibold text-[32px] leading-[1] tracking-[-0.04em] text-[#1A1A1A] max-[1200px]:text-[28px]">
                  ${property.price.toLocaleString('en-US')}
                </span>
                <span className="font-hanken font-light text-[16px] text-[#666666]">
                  /{property.priceType === "month" ? "month" : "sale"}
                </span>
              </div>
              <h2 className="font-syne font-semibold text-[24px] leading-[1.2] tracking-[-0.04em] text-[#1A1A1A] mt-2">
                {property.title}
              </h2>
            </div>

            <div className="flex items-center gap-[12px]">
              <div className="relative w-[40px] h-[40px] bg-[#CFB9FD] rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src="/images/userfeatured.png" 
                  alt={property.agent.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <h3 className="font-syne font-bold text-[15px] text-[#1A1A1A]" style={{ margin: 0, padding: 0, lineHeight: 1.2 }}>
                  {property.agent.name}
                </h3>
                <p className="font-hanken font-light text-[13px] text-[#666666]" style={{ margin: 0, padding: 0, lineHeight: 1.2 }}>
                  {property.agent.role}
                </p>
              </div>

              <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#F7F2FF] cursor-pointer hover:bg-[#E8E1FF] transition-all flex-shrink-0">
                <Image src="/images/telpon.svg" alt="Phone" width={18} height={18} />
              </div>
            </div>
          </div>

          <div
            className="flex flex-col gap-[8px]"
            style={{ marginTop: isMidRange ? '12px' : isSmall ? '8px' : '0' }}
          >
            <div className="flex items-center gap-[6px]">
              <MapPin size={16} className="text-[#666666]" />
              <span className="font-hanken font-light text-[16px] text-[#666666]">
                {property.address}, {property.city}
              </span>
            </div>
            <p className="font-hanken font-light text-[16px] leading-[1.6] text-[#000000] max-w-[550px]">
              {property.description.substring(0, 100)}...{" "}
              <span className="text-black font-bold cursor-pointer underline">Read More</span>
            </p>
          </div>

          <div
            className="mt-auto bg-[#F7F2FF] rounded-[15px] p-[24px]"
            style={{
              display: 'grid',
              gridTemplateColumns: isSmall ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isSmall ? '16px' : '16px',
              alignItems: 'start',
            }}
          >
            <PropertyFeature type="bedrooms" label="Bedrooms" value={property.bedrooms} />
            <PropertyFeature type="bathrooms" label="Bathrooms" value={property.bathrooms} />
            <PropertyFeature type="squareArea" label="Square Area" value={`${property.squareArea}x8 m²`} />
            <PropertyFeature type="design" label="Type Property" value={property.design} />
          </div>
        </div>
      </div>
    </div>
  );
};