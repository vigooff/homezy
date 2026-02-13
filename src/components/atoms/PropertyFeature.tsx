"use client";
import React from "react";
import { Bed, Bath, Maximize, Home } from "lucide-react";

interface PropertyFeatureProps {
  type: "bedrooms" | "bathrooms" | "squareArea" | "design";
  value: string | number;
  label?: string; // Label tetap opsional
}

export const PropertyFeature: React.FC<PropertyFeatureProps> = ({
  type,
  value,
  label,
}) => {
  const getIcon = () => {
    const iconStyle = "text-[#1A1A1A] flex-shrink-0 w-[24px] h-[24px]"; // Sesuaikan ukuran icon agar lebih tegas
    
    switch (type) {
      case "bedrooms": return <Bed className={iconStyle} />;
      case "bathrooms": return <Bath className={iconStyle} />;
      case "squareArea": return <Maximize className={iconStyle} />;
      case "design": return <Home className={iconStyle} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-[12px] w-full"> 
      {/* 1. Menampilkan Title Categories (Label) yang hilang */}
      <span className="font-hanken font-light text-[16px] text-[#666666] whitespace-nowrap">
        {label}
      </span>

      {/* 2. Menampilkan Icon dan Value di bawahnya */}
      <div className="flex items-center gap-[10px]">
        {getIcon()}
        <span className="font-syne font-bold text-[18px] text-[#1A1A1A] whitespace-nowrap">
          {value}
        </span>
      </div>
    </div>
  );
};