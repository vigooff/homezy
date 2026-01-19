"use client";
import React from "react";
import { Bed, Bath, Maximize, Home } from "lucide-react";

interface PropertyFeatureProps {
  type: "bedrooms" | "bathrooms" | "squareArea" | "design";
  label: string;
  value: string | number;
}

export const PropertyFeature: React.FC<PropertyFeatureProps> = ({
  type,
  label,
  value,
}) => {
  const getIcon = () => {
    switch (type) {
      case "bedrooms":
        return <Bed className="w-5 h-5" />;
      case "bathrooms":
        return <Bath className="w-5 h-5" />;
      case "squareArea":
        return <Maximize className="w-5 h-5" />;
      case "design":
        return <Home className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span
        className="font-hanken text-[#666666]"
        style={{
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2 text-[#101828]">
        {getIcon()}
        <span
          className="font-hanken font-bold"
          style={{
            fontSize: "16px",
            lineHeight: "20px",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};