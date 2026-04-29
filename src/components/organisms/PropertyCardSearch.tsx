"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Property } from "../../types/properties";
import { PropertyFeature } from "../atoms/PropertyFeature";

interface PropertyCardSearchProps {
  property: Property;
  /** Dipanggil saat card diklik → trigger highlight marker di map */
  onClick?: (id: string) => void;
  /** True kalau card ini sedang di-highlight dari luar (e.g. marker diklik di map) */
  isHighlighted?: boolean;
}

export const PropertyCardSearch: React.FC<PropertyCardSearchProps> = ({
  property,
  onClick,
  isHighlighted = false,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted]     = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (!isMounted) return null;

  const isMidRange = windowWidth >= 768 && windowWidth < 1200;

  // Highlight ring saat card ini aktif
  const highlightStyle: React.CSSProperties = isHighlighted
    ? { boxShadow: "0 0 0 2px #7C3AED, 0 4px 20px rgba(124,58,237,0.2)" }
    : {};

  const sharedCardProps = {
    onClick: () => onClick?.(property.id),
  };

  return (
    <>
      {/* MID-RANGE VERSION - Vertical Card */}
      {isMidRange && (
        <div
          {...sharedCardProps}
          className="flex flex-col bg-[#FFFFFF] overflow-hidden hover:shadow-md transition-all group cursor-pointer"
          style={{
            width: "100%",
            borderRadius: "15px",
            border: "1px solid #E8E1FF",
            transition: "box-shadow .2s ease, border-color .2s ease",
            ...highlightStyle,
          }}
        >
          <div className="relative w-full overflow-hidden" style={{ height: "200px" }}>
            <Image src={property.image} alt={property.title} fill priority
              sizes="(max-width: 1200px) 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex flex-col" style={{ padding: "16px", gap: "10px" }}>
            <div className="flex items-baseline gap-1">
              <span className="font-syne font-bold text-[22px] leading-[26px] text-[#1A1A1A]">
                ${property.price.toLocaleString("en-US")}
              </span>
              {property.priceType && (
                <span className="font-hanken text-[14px] text-[#666666]">/{property.priceType}</span>
              )}
            </div>
            <h3 className="font-syne font-bold text-[16px] leading-[22px] text-[#1A1A1A] line-clamp-2">
              {property.title}
            </h3>
            <p className="font-hanken text-[12px] text-[#999999] leading-[18px] truncate">
              {property.address}
            </p>
            <div className="flex items-center justify-between border-t border-[#E8E1FF] pt-[12px]">
              <PropertyFeature type="bedrooms"   value={`${property.bedrooms} Beds`} />
              <PropertyFeature type="bathrooms"  value={`${property.bathrooms} Baths`} />
              <PropertyFeature type="squareArea" value="5x7 m²" />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE VERSION */}
      {windowWidth < 768 && (
        <div
          {...sharedCardProps}
          className="flex flex-col bg-[#FFFFFF] overflow-hidden hover:shadow-md transition-all group cursor-pointer"
          style={{
            width: "100%", maxWidth: "none",
            borderRadius: "15px", border: "1px solid #E8E1FF", margin: "0 auto",
            transition: "box-shadow .2s ease",
            ...highlightStyle,
          }}
        >
          <div className="relative w-full overflow-hidden" style={{ height: "230px" }}>
            <Image src={property.image} alt={property.title} fill priority
              sizes="(max-width: 768px) 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex flex-col" style={{ padding: "16px", gap: "12px" }}>
            <div className="flex items-baseline gap-1">
              <span className="font-syne font-bold text-[28px] leading-[28px] text-[#1A1A1A]">
                ${property.price.toLocaleString("en-US")}
              </span>
              {property.priceType && (
                <span className="font-hanken text-[16px] text-[#666666]">/{property.priceType}</span>
              )}
            </div>
            <h3 className="font-syne font-bold text-[18px] leading-[24px] text-[#1A1A1A] line-clamp-2">
              {property.title}
            </h3>
            <p className="font-hanken text-[13px] text-[#999999] leading-[20px] truncate">
              {property.address}
            </p>
            <div className="flex items-center justify-between border-t border-[#E8E1FF] pt-[16px]">
              <PropertyFeature type="bedrooms"   value={`${property.bedrooms} Beds`} />
              <PropertyFeature type="bathrooms"  value={`${property.bathrooms} Baths`} />
              <PropertyFeature type="squareArea" value="5x7 m²" />
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP VERSION */}
      {windowWidth >= 1200 && (
        <div
          {...sharedCardProps}
          className="flex bg-[#FFFFFF] overflow-hidden hover:shadow-md transition-all group w-full cursor-pointer"
          style={{
            height: "216px", borderRadius: "15px", border: "1px solid #E8E1FF",
            transition: "box-shadow .2s ease",
            ...highlightStyle,
          }}
        >
          <div className="relative w-[200px] h-full flex-shrink-0 overflow-hidden">
            <Image src={property.image} alt={property.title} fill priority sizes="200px"
              className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex-1 flex flex-col justify-between min-w-0"
            style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "20px", boxSizing: "border-box" }}>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-syne font-bold text-[34px] font-[600] leading-[30px] text-[#1A1A1A]">
                  ${property.price.toLocaleString("en-US")}
                </span>
                {property.priceType && (
                  <span className="font-hanken text-[20px] text-[#666666]">/{property.priceType}</span>
                )}
              </div>
              <h3 className="font-syne font-[700] text-[20px] text-[24px] leading-[32px] text-[#1A1A1A] truncate"
                style={{ marginTop: "8px" }}>{property.title}</h3>
              <p className="font-hanken text-[13px] text-[#999999] text-[16px] leading-[26px] truncate mt-[-15px]">
                {property.address}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-[#E8E1FF] pb-[25px] pt-[20px] mt-auto"
              style={{ width: "100%", opacity: 1 }}>
              <PropertyFeature type="bedrooms"   value={`${property.bedrooms} Beds`} />
              <PropertyFeature type="bathrooms"  value={`${property.bathrooms} Baths`} />
              <PropertyFeature type="squareArea" value="5x7 m²" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};