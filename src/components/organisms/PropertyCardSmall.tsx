"use client";
import React from "react";
import Image from "next/image";
import { Property } from "../../types/properties";
import { Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardSmallProps {
  property: Property;
}

export const PropertyCardSmall: React.FC<PropertyCardSmallProps> = ({ property }) => {
  return (
    <div
      className="
        bg-[#FFFFFF]
        rounded-[20px]
        border border-[#E8E1FF]
        shadow-[0_2px_8px_rgba(0,0,0,0.04)]
        transition-all duration-300
        hover:shadow-card-hover
        cursor-pointer
        w-full
        relative
        max-[900px]:max-w-[400px]
        max-[900px]:mx-auto
        min-[1200px]:max-w-[370px]
        min-[1600px]:mx-[15px]
      "
    >
      <div className="relative w-full h-[240px] rounded-t-[15px]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 rounded-t-[15px]"
        />
      </div>

      {property.isFeatured && (
        <div
          className="absolute top-[222px] left-[-4px] z-[100]
                     max-[1400px]:scale-90 max-[1400px]:origin-left"
          style={{
            width: "80px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "#000000",
            borderRadius: "8px",
            paddingLeft: "12px",
            paddingRight: "12px",
            height: "34px",
            flexShrink: 0
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "14px", lineHeight: 1, fontWeight: 700 }}>✦</span>
          <span style={{ color: "#FFFFFF", fontSize: "10px", lineHeight: 1, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
            FEATURED
          </span>
        </div>
      )}

      <div className="p-4 sm:p-5 lg:p-6 mt-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-baseline gap-1 flex-wrap pl-[20px]">
            <span className="font-syne text-[#1A1A1A] text-[32px]" style={{ fontWeight: 600, lineHeight: "1.25", letterSpacing: "-0.04em" }}>
              ${property.price.toLocaleString()}
            </span>
            <span className="font-hanken text-[#666666] text-[16px]" style={{ fontWeight: 300, lineHeight: "1.25" }}>
              /{property.priceType}
            </span>
          </div>
          <h3 className="font-syne text-[#1A1A1A] pl-[20px] text-[24px]" style={{ fontWeight: 600, lineHeight: "1.33", letterSpacing: "-0.04em" }}>
            {property.title}
          </h3>
        </div>

        <p className="font-hanken text-[#666666] line-clamp-2 pl-[20px] text-[16px]" style={{ fontWeight: 300, lineHeight: "1.625", marginTop: "8px", marginBottom: "10px" }}>
          {property.address}
        </p>

        <div
          className="
            flex pt-[10px] pb-[10px] items-center 
            min-[900px]:max-[1200px]:flex-col 
            min-[900px]:max-[1200px]:justify-center 
            min-[900px]:max-[1200px]:items-center 
            min-[900px]:max-[1200px]:gap-3 
            flex-nowrap
          "
          style={{
            borderTop: "1px solid #F7F2FF",
            marginLeft: "15px",
            marginRight: "15px"
          }}
        >
          <div 
            className="flex items-center flex-shrink-0 min-[900px]:max-[1200px]:ml-0 min-[900px]:max-[1200px]:justify-center"
            style={{ 
              gap: 'clamp(4px, 0.5vw, 8px)',
              marginLeft: 'clamp(5px, 0.8vw, 10px)'
            }}
          >
            <Bed className="text-[#666666] flex-shrink-0" style={{ width: 'clamp(16px, 1.2vw, 20px)', height: 'clamp(16px, 1.2vw, 20px)' }} />
            <span className="font-hanken font-medium whitespace-nowrap" style={{ fontSize: 'clamp(11px, 0.9vw, 14px)' }}>
              {property.bedrooms} Beds
            </span>
          </div>

          <div 
            className="flex items-center flex-shrink-0 min-[900px]:max-[1200px]:ml-0 min-[900px]:max-[1200px]:justify-center"
            style={{ 
              gap: 'clamp(4px, 0.5vw, 8px)',
              marginLeft: 'clamp(10px, 2.5vw, 40px)' 
            }}
          >
            <Bath className="text-[#666666] flex-shrink-0" style={{ width: 'clamp(16px, 1.2vw, 20px)', height: 'clamp(16px, 1.2vw, 20px)' }} />
            <span className="font-hanken font-medium whitespace-nowrap" style={{ fontSize: 'clamp(11px, 0.9vw, 14px)' }}>
              {property.bathrooms} Baths
            </span>
          </div>

          <div 
            className="flex items-center flex-shrink-0 min-[900px]:max-[1200px]:ml-0 min-[900px]:max-[1200px]:justify-center"
            style={{ 
              gap: 'clamp(4px, 0.5vw, 8px)',
              marginLeft: 'clamp(10px, 2.5vw, 40px)' 
            }}
          >
            <Maximize className="text-[#666666] flex-shrink-0" style={{ width: 'clamp(16px, 1.2vw, 20px)', height: 'clamp(16px, 1.2vw, 20px)' }} />
            <span className="font-hanken font-medium whitespace-nowrap" style={{ fontSize: 'clamp(11px, 0.9vw, 14px)' }}>
              5x7 m²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};