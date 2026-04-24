"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useSearchFields, PRICE_OPTIONS, TYPE_OPTIONS } from "../../hooks/useSearchFields";
import { Property } from "../../types/properties";

interface HeroSearchCardProps {
  properties?: Property[];
}

// ─── Dropdown dengan position:absolute, lebar mengikuti parent field ──────────

function DropdownList({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (opt: string) => void;
  triggerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div
      className="absolute left-0 w-full bg-[#FFFFFF] shadow-2xl rounded-[15px] border border-[#E8E1FF] overflow-hidden z-[100]"
      style={{
        top: "calc(100% + 8px)",
        maxHeight: "280px",
        paddingTop: "8px",
        paddingBottom: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="overflow-y-auto custom-scrollbar">
        {options.map((opt) => {
          const isSelected = value === opt;
          const isHovered = hoveredOption === opt;
          const isDefault = opt.toLowerCase().includes("any") || opt.toLowerCase().includes("select");

          let bgColor = "";
          let textColor = "text-[#1A1A1A]";

          if (isSelected) {
            bgColor = "bg-[#1A1A1A]";
            textColor = "text-[#FFFFFF]";
          } else if (isHovered) {
            bgColor = !isDefault ? "bg-[#E7DCFF]" : "bg-[#F7F5FF]";
            textColor = "text-[#1A1A1A]";
          }

          return (
            <div
              key={opt}
              onMouseEnter={() => setHoveredOption(opt)}
              onMouseLeave={() => setHoveredOption(null)}
              className={`py-3 pr-6 font-hanken text-[15px] cursor-pointer transition-all duration-200 flex items-center ${bgColor} ${textColor}`}
              style={{ height: "44px", paddingLeft: "32px" }}
              onClick={() => onSelect(opt)}
            >
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const HeroSearchCard = ({ properties = [] }: HeroSearchCardProps) => {
  const [isMounted,   setIsMounted]   = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const locationRef = useRef<HTMLDivElement>(null);
  const priceRef    = useRef<HTMLDivElement>(null);
  const typeRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    location, setLocation, isLocationOpen, setIsLocationOpen, toggleLocation,
    price,    setPrice,    isPriceOpen,    setIsPriceOpen,    togglePrice,
    type,     setType,     isTypeOpen,     setIsTypeOpen,     toggleType,
    locationOptions,
    handleBrowse,
  } = useSearchFields({ properties, mode: "hero" });

  const displayLocation = location === "Any Location" ? "e.g. California, US" : location;
  const displayPrice    = price    === "Any Price"    ? "$1500-$2500"         : price;
  const displayType     = type     === "Any Type"     ? "Apartment"           : type;

  const isPlaceholderLocation = location === "Any Location";
  const isPlaceholderPrice    = price    === "Any Price";
  const isPlaceholderType     = type     === "Any Type";

  if (!isMounted) return null;

  const isMobile = windowWidth < 768;

  // ── Style helpers ─────────────────────────────────────────────────────────

  const rowStyle: React.CSSProperties = {
    flex:           isMobile ? undefined : "1",
    width:          isMobile ? "100%" : undefined,
    minWidth:       "0",
    gap:            "12px",
    display:        "flex",
    alignItems:     "center",
    justifyContent: isMobile ? "center" : "flex-start",
    paddingBottom:  isMobile ? "16px" : undefined,
    borderBottom:   isMobile ? "1px solid #F2F4F7" : undefined,
    cursor:         "pointer",
    userSelect:     "none",
    position:       "relative",
  };

  return (
    <div
      style={{
        width: "100%", maxWidth: "100%",
        height: "auto", minHeight: "96px",
        borderRadius: "15px", padding: "28px 32px", gap: "32px",
        opacity: 1, border: "1px solid #000000",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        ...(isMobile ? {} : { minWidth: "720px" }),
      }}
    >
      {/* ── Location ── */}
      <div ref={locationRef} style={rowStyle} onClick={(e) => toggleLocation(e)}>
        <div style={{
          width: "40px", height: "40px", backgroundColor: "#E7DCFF",
          borderRadius: "15px", display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
        }}>
          <Image src="/icons/location.svg" alt="Location" width={20} height={20} />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467] pointer-events-none">
            Location
          </span>
          <div className="flex items-center justify-between gap-1">
            <span className={`font-hanken text-[16px] leading-[24px] truncate ${
              isPlaceholderLocation ? "font-normal text-[#AAAAAA]" : "font-bold text-[#1A1A1A]"
            }`}>
              {displayLocation}
            </span>
            <ChevronDown
              size={14}
              className="flex-shrink-0 text-[#1A1A1A] transition-transform duration-200"
              style={{ transform: isLocationOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </div>
        </div>
        {isLocationOpen && (
          <DropdownList
            options={locationOptions}
            value={location}
            triggerRef={locationRef}
            onSelect={(opt) => { setLocation(opt); setIsLocationOpen(false); }}
          />
        )}
      </div>

      {/* ── Price ── */}
      <div ref={priceRef} style={rowStyle} onClick={(e) => togglePrice(e)}>
        <div style={{
          width: "40px", height: "40px", backgroundColor: "#E7DCFF",
          borderRadius: "15px", display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
        }}>
          <Image src="/icons/price.svg" alt="Price" width={20} height={20} />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467] pointer-events-none">
            Price
          </span>
          <div className="flex items-center justify-between gap-1">
            <span className={`font-hanken text-[16px] leading-[24px] truncate ${
              isPlaceholderPrice ? "font-normal text-[#AAAAAA]" : "font-bold text-[#1A1A1A]"
            }`}>
              {displayPrice}
            </span>
            <ChevronDown
              size={14}
              className="flex-shrink-0 text-[#1A1A1A] transition-transform duration-200"
              style={{ transform: isPriceOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </div>
        </div>
        {isPriceOpen && (
          <DropdownList
            options={PRICE_OPTIONS}
            value={price}
            triggerRef={priceRef}
            onSelect={(opt) => { setPrice(opt); setIsPriceOpen(false); }}
          />
        )}
      </div>

      {/* ── Type of Property ── */}
      <div
        ref={typeRef}
        style={{ ...rowStyle, borderBottom: "none", paddingBottom: "0" }}
        onClick={(e) => toggleType(e)}
      >
        <div style={{
          width: "40px", height: "40px", backgroundColor: "#E7DCFF",
          borderRadius: "15px", display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
        }}>
          <Image src="/icons/house.svg" alt="House" width={20} height={20} />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <span className="font-hanken font-light text-[14px] leading-[20px] text-[#475467] pointer-events-none">
            Type of Property
          </span>
          <div className="flex items-center justify-between gap-1">
            <span className={`font-hanken text-[16px] leading-[24px] truncate ${
              isPlaceholderType ? "font-normal text-[#AAAAAA]" : "font-bold text-[#1A1A1A]"
            }`}>
              {displayType}
            </span>
            <ChevronDown
              size={14}
              className="flex-shrink-0 text-[#1A1A1A] transition-transform duration-200"
              style={{ transform: isTypeOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </div>
        </div>
        {isTypeOpen && (
          <DropdownList
            options={TYPE_OPTIONS}
            value={type}
            triggerRef={typeRef}
            onSelect={(opt) => { setType(opt); setIsTypeOpen(false); }}
          />
        )}
      </div>

      {/* ── Browse Button ── */}
      <button
        onClick={handleBrowse}
        aria-label="Search properties"
        className="font-hanken font-bold transition-all duration-300 hover:bg-[#333333]"
        style={{
          backgroundColor: "#1A1A1A", color: "#FFFFFF",
          padding: "16px 32px", borderRadius: "15px",
          fontSize: "16px", lineHeight: "24px",
          height: "56px", minWidth: "128px",
          width:      isMobile ? "100%" : undefined,
          flexShrink: 0,
          marginTop:  isMobile ? "8px" : "0px",
        }}
      >
        Browse
      </button>
    </div>
  );
};