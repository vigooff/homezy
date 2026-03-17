"use client";
import React from "react";
import { Bed, Bath, Maximize, Home } from "lucide-react";

interface PropertyFeatureProps {
  type: "bedrooms" | "bathrooms" | "squareArea" | "design";
  value: string | number;
  label?: string;
}

export const PropertyFeature: React.FC<PropertyFeatureProps> = ({
  type,
  value,
  label,
}) => {
  const getIcon = () => {
    const iconStyle = "text-[#1A1A1A] w-[20px] h-[20px] flex-shrink-0";
    switch (type) {
      case "bedrooms": return <Bed className={iconStyle} />;
      case "bathrooms": return <Bath className={iconStyle} />;
      case "squareArea": return <Maximize className={iconStyle} />;
      case "design": return <Home className={iconStyle} />;
      default: return null;
    }
  };

  if (!label) {
    return (
      <div 
        className="flex items-center" 
        style={{ width: "auto", height: "24px", gap: "8px", opacity: 1 }}
      >
        {getIcon()}
        <span className="font-hanken text-[14px] text-[#868893] whitespace-nowrap">
          {value}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="font-hanken font-light text-[14px] text-[#666666]" style={{ marginBottom: '4px' }}>{label}</span>
      <div className="flex items-center">
        {getIcon()}
        <span className="font-syne font-bold text-[16px] text-[#1A1A1A]" style={{ marginLeft: '10px' }}>{value}</span>
      </div>
    </div>
  );
};