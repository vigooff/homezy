"use client";
import React from "react";
import { Bed, Bath, Maximize, Home } from "lucide-react";

interface PropertyFeatureProps {
  type: "bedrooms" | "bathrooms" | "squareArea" | "design";
  value: string | number;
}

export const PropertyFeature: React.FC<PropertyFeatureProps> = ({
  type,
  value,
}) => {
  const getIcon = () => {
    const iconStyle = "text-[#666666] flex-shrink-0 w-[clamp(16px,1.2vw,20px)] h-[clamp(16px,1.2vw,20px)]";
    
    switch (type) {
      case "bedrooms":
        return <Bed className={iconStyle} />;
      case "bathrooms":
        return <Bath className={iconStyle} />;
      case "squareArea":
        return <Maximize className={iconStyle} />;
      case "design":
        return <Home className={iconStyle} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="flex items-center flex-shrink-0 justify-center"
      style={{ 
        gap: 'clamp(4px, 1vw, 8px)',
      }}
    >
      {getIcon()}
      <span 
        className="font-hanken font-medium whitespace-nowrap text-[#1A1A1A]" 
        style={{ 
          fontSize: 'clamp(11px, 0.9vw, 14px)' 
        }}
      >
        {value} {type === "bedrooms" ? "Beds" : type === "bathrooms" ? "Baths" : ""}
      </span>
    </div>
  );
};