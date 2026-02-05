"use client";
import React from "react";

interface FeaturedBadgeProps {
  className?: string;
  style?: React.CSSProperties; // Tambahkan ini agar bisa menerima posisi dinamis
}

export const FeaturedBadge = ({ className = "", style }: FeaturedBadgeProps) => {
  return (
    <div
      className={`absolute z-[100] ${className}`}
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
        flexShrink: 0,
        ...style,
      }}
    >
      <span 
        style={{ 
          color: "#FFFFFF",
          fontSize: "14px", 
          lineHeight: 1, 
          fontWeight: 700 
        }}
      >
        ✦
      </span>
      <span 
        style={{ 
          color: "#FFFFFF",
          fontSize: "10px", 
          lineHeight: 1, 
          fontWeight: 900, 
          textTransform: "uppercase", 
          letterSpacing: "0.08em", 
          whiteSpace: "nowrap" 
        }}
      >
        FEATURED
      </span>
    </div>
  );
};