"use client";
import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyFeature } from "../atoms/PropertyFeature";
import { Property } from "../../types/properties";

interface PropertyCardLargeProps {
  property: Property;
}

export const PropertyCardLarge = ({ property }: PropertyCardLargeProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex bg-[#FFFFFF] rounded-[15px] border border-[#E8E1FF] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-visible min-h-[420px] relative max-[1200px]:flex-col max-[1200px]:h-auto w-full max-w-[1200px]">
        
        {property.isFeatured && (
          <div
            className="absolute top-[20px] left-[-5px] z-[100] max-[1400px]:scale-90 max-[1400px]:origin-left"
            style={{
              width: "auto",
              minWidth: "80px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              backgroundColor: "#000000",
              borderRadius: "8px",
              paddingLeft: "12px",
              paddingRight: "12px",
              height: "34px",
              flexShrink: 0,
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" 
            }}
          >
            <span style={{ color: "#FFFFFF", fontSize: "14px", lineHeight: 1, fontWeight: 700 }}>✦</span>
            <span style={{ color: "#FFFFFF", fontSize: "10px", lineHeight: 1, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
              FEATURED
            </span>
          </div>
        )}

        <div className="relative w-[500px] min-h-full flex-shrink-0 rounded-l-[15px] overflow-hidden max-[1200px]:w-full max-[1200px]:h-[300px] max-[1200px]:rounded-t-[15px] max-[1200px]:rounded-l-none">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 1200px) 100vw, 500px"
            className="object-cover"
            priority
          />
        </div>
      
        <div className="flex-1 p-[32px] flex flex-col gap-5 max-[1200px]:p-[24px]">
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
              
              <div className="flex flex-col justify-center h-[40px]">
                <h4 className="font-syne font-bold text-[15px] leading-none text-[#1A1A1A] m-0 p-0 mb-[4px]">
                  {property.agent.name}
                </h4>
                <p className="font-hanken font-light text-[13px] leading-none text-[#666666] m-0 p-0">
                  {property.agent.role}
                </p>
              </div>

              <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#F7F2FF] cursor-pointer hover:bg-[#E8E1FF] transition-all flex-shrink-0">
                <Image src="/images/telpon.svg" alt="Phone" width={18} height={18} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
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

          <div className="mt-auto bg-[#F7F2FF] rounded-[15px] p-[24px] grid grid-cols-4 gap-4 items-start">
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