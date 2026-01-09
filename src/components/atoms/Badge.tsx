import React from "react";
import { Bed, Bath, Maximize, Home } from "lucide-react";

// Badge Component - Design Foto 2
interface BadgeProps {
  text: string;
  variant?: "featured" | "default";
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = "default" }) => {
  const styles = {
    featured: "bg-[#1A1A1A] text-white",
    default: "bg-gray-200 text-gray-800"
  };

  return (
    <div className={`${styles[variant]} rounded-[8px] flex items-center gap-[8px] px-[12px] py-[6px] w-[79px] h-[24px]`}>
      {variant === "featured" && (
        <span className="text-white text-[14px] leading-none">✦</span>
      )}
      <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
        {text}
      </span>
    </div>
  );
};

// PropertyFeature Component - RESPONSIVE
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
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5 text-[#1A1A1A] flex-shrink-0";
    switch (type) {
      case "bedrooms":
        return <Bed className={iconClass} />;
      case "bathrooms":
        return <Bath className={iconClass} />;
      case "squareArea":
        return <Maximize className={iconClass} />;
      case "design":
        return <Home className={iconClass} />;
    }
  };

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0">
      <span 
        className="font-hanken text-[#666666] truncate"
        style={{
          fontWeight: 300,
          fontSize: 'clamp(12px, 2vw, 13px)',
          lineHeight: 'tight'
        }}
      >
        {label}
      </span>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {getIcon()}
        <span 
          className="font-hanken text-foreground truncate"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            lineHeight: 'tight'
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};