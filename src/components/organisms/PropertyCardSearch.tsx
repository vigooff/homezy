"use client";
import React from "react";
import Image from "next/image";
import { Property } from "../../types/properties";
import { PropertyFeature } from "../atoms/PropertyFeature";

interface PropertyCardSearchProps {
  property: Property;
}

export const PropertyCardSearch: React.FC<PropertyCardSearchProps> = ({ property }) => {
  return (
    <div 
      className="flex bg-[#FFFFFF] overflow-hidden hover:shadow-md transition-all group"
      style={{ 
        width: "564px",
        height: "226px",
        borderRadius: "15px",
        border: "1px solid #E8E1FF",
        opacity: 1
      }}
    >
      <div className="relative w-[200px] h-full flex-shrink-0 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          priority
          sizes="200px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0" style={{ paddingLeft: "10px", paddingRight: "20px", paddingTop: "20px", paddingBottom: "16px" }}>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="font-syne font-bold text-[28px] leading-none text-[#1A1A1A]">
              ${property.price.toLocaleString('en-US')}
            </span>
            {property.priceType && (
              <span className="font-hanken text-[14px] text-[#666666]">
                /{property.priceType}
              </span>
            )}
          </div>

          <h3 className="font-syne font-semibold text-[20px] leading-tight text-[#1A1A1A] truncate" style={{ marginTop: "5px" }}>
            {property.title}
          </h3>

          <p className="font-hanken text-[13px] text-[#999999] truncate" style={{ marginTop: "8px" }}>
            {property.address}
          </p>
        </div>

        <div className="flex items-center flex-shrink-0" style={{ gap: "clamp(12px, 1.5vw, 20px)", marginTop: "12px" }}>
          <PropertyFeature type="bedrooms" value={property.bedrooms} />
          <PropertyFeature type="bathrooms" value={property.bathrooms} />
          <PropertyFeature type="squareArea" value="5x7 m²" />
        </div>
      </div>
    </div>
  );
};