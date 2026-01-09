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
    <div className="flex bg-[#FFFFFF] rounded-[15px] border border-[#E8E1FF] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-visible h-[420px] relative">
      <div className="relative w-[500px] h-full flex-shrink-0 rounded-l-[15px] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="500px"
          className="object-cover"
          priority
        />
      </div>
    
      {property.isFeatured && (
        <div style={{
          width: '80px',
          height: '20px',
          position: 'absolute',
          top: '20px',
          left: '-6px',
          backgroundColor: '#1A1A1A',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          zIndex: 50
        }}>
          <span 
            style={{
              color: '#FFFFFF',
              fontSize: '14px',
              lineHeight: 1,
              fontWeight: 700
            }}
          >
            ✦
          </span>
          <span 
            style={{
              color: '#FFFFFF',
              fontSize: '10px',
              lineHeight: 1,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap'
            }}
          >
            FEATURED
          </span>
        </div>
      )}
      

      <div className="flex-1 p-[32px] flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-[4px] w-[255px]">
            <div className="flex items-baseline gap-1">
              <span className="font-syne font-semibold text-[32px] leading-[40px] tracking-[-0.04em] text-[#1A1A1A]">
               ${property.price.toLocaleString('en-US')}
              </span>
              <span className="font-hanken font-light text-[16px] leading-[40px] text-[#666666]">
                /{property.priceType === "month" ? "month" : "sale"}
              </span>
            </div>

            <h2 className="font-syne font-semibold text-[24px] leading-[32px] tracking-[-0.04em] text-[#1A1A1A]">
              {property.title}
            </h2>
          </div>

          <div className="flex items-center gap-[12px] -mt-[25px]">
            <div className="relative w-[40px] h-[40px] bg-[#CFB9FD] rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src="/images/userfeatured.png" 
                alt={property.agent.name} 
                fill
                sizes="40px"
                className="object-cover" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-hanken font-bold text-[15px] leading-[1.2] text-[#1A1A1A]">
                {property.agent.name}
              </h4>
              <p className="font-hanken font-light text-[13px] leading-[1.2] text-[#666666] -mt-[10px]">
                {property.agent.role}
              </p>
            </div>
            <div className="ml-2 w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#E8E1FF] transition-all flex-shrink-0">
              <Image 
                src="/images/telpon.svg" 
                alt="Phone" 
                width={18} 
                height={18} 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[6px]">
            <MapPin size={16} className="text-[#666666]" />
            <span className="font-hanken font-light text-[16px] leading-[26px] text-[#666666]">
              {property.address}, {property.city}
            </span>
          </div>

          <p className="font-hanken font-light text-[16px] leading-[26px] text-[#666666] max-w-[596px]">
            {property.description.substring(0, 100)}...{" "}
            <span className="text-black font-bold cursor-pointer underline">Read More</span>
          </p>
        </div>

        <div className="p-[16px] bg-[#F7F2FF] rounded-[15px] flex items-center justify-between">
          <PropertyFeature type="bedrooms" label="Bedrooms" value={property.bedrooms} />
          <PropertyFeature type="bathrooms" label="Bathrooms" value={property.bathrooms} />
          <PropertyFeature type="squareArea" label="Square Area" value={`${property.squareArea}x8 m²`} />
          <PropertyFeature type="design" label="Type Property" value={property.design} />
        </div>
      </div>
    </div>
  );
};