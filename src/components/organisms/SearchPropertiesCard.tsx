"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useSearchFields, PRICE_OPTIONS, TYPE_OPTIONS } from "../../hooks/useSearchFields";
import { Property } from "../../types/properties";

interface SearchPropertiesCardProps {
  onSearch?: (params: { location: string; price: string; type: string }) => void;
  properties?: Property[];
}

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
              className={`pr-6 py-3 font-hanken text-[15px] cursor-pointer transition-all duration-200 flex items-center ${bgColor} ${textColor}`}
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

export const SearchPropertiesCard = ({
  onSearch,
  properties = [],
}: SearchPropertiesCardProps) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

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
  } = useSearchFields({ properties, mode: "search-page", onSearch });

  if (!isMounted) return null;

  const isSmallMobile = windowWidth <= 500;
  const isMobile      = windowWidth > 500  && windowWidth < 600;
  const isMidRange    = windowWidth >= 600  && windowWidth < 1200;
  const isDesktop     = windowWidth >= 1200;

  // ── Field sub-components ─────────────────────────────────────────────────

  const LocationField = ({ gap = "12px", pt = "0px", pb = "0px" }: { gap?: string; pt?: string; pb?: string }) => (
    <div
      ref={locationRef}
      className="flex items-center flex-1 min-w-0 relative cursor-pointer select-none"
      style={{ gap, paddingTop: pt, paddingBottom: pb }}
      onClick={(e) => toggleLocation(e)}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}
      >
        <Image src="/icons/location.svg" alt="Location" width={20} height={20} />
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1 pointer-events-none">
          Location
        </label>
        <div className="flex items-center justify-between gap-1">
          <span className={`font-hanken font-bold text-[15px] truncate ${
            location === "Any Location" ? "text-[#AAAAAA] font-normal" : "text-[#1A1A1A]"
          }`}>
            {location}
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
  );

  const PriceField = ({ gap = "12px", pt = "0px", pb = "0px" }: { gap?: string; pt?: string; pb?: string }) => (
    <div
      ref={priceRef}
      className="flex items-center flex-1 min-w-0 relative cursor-pointer select-none"
      style={{ gap, paddingTop: pt, paddingBottom: pb }}
      onClick={(e) => togglePrice(e)}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}
      >
        <Image src="/icons/price.svg" alt="Price" width={20} height={20} />
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1 pointer-events-none">
          Price
        </label>
        <div className="flex items-center justify-between gap-1">
          <span className={`font-hanken font-bold text-[15px] truncate ${
            price === "Any Price" ? "text-[#AAAAAA] font-normal" : "text-[#1A1A1A]"
          }`}>
            {price}
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
  );

  const TypeField = ({ gap = "12px", pt = "0px", pb = "0px" }: { gap?: string; pt?: string; pb?: string }) => (
    <div
      ref={typeRef}
      className="flex items-center flex-1 min-w-0 relative cursor-pointer select-none"
      style={{ gap, paddingTop: pt, paddingBottom: pb }}
      onClick={(e) => toggleType(e)}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: "48px", height: "48px", backgroundColor: "#E7DCFF", borderRadius: "12px" }}
      >
        <Image src="/icons/house.svg" alt="House" width={20} height={20} />
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <label className="font-hanken font-light text-[12px] text-[#666666] leading-none mb-1 pointer-events-none">
          Type of Property
        </label>
        <div className="flex items-center justify-between gap-1">
          <span className={`font-hanken font-bold text-[15px] truncate ${
            type === "Any Type" ? "text-[#AAAAAA] font-normal" : "text-[#1A1A1A]"
          }`}>
            {type}
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
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── SMALL MOBILE + MOBILE (<600px) ── */}
      {(isSmallMobile || isMobile) && (
        <div
          className="flex flex-col border border-[#000000] shadow-sm bg-[#FFFFFF]"
          style={{
            width: "100%", maxWidth: "100%", boxSizing: "border-box",
            height: "auto", minHeight: "318px",
            borderRadius: "15px", padding: "16px", gap: "24px",
          }}
        >
          <LocationField gap="12px" />
          <PriceField    gap="12px" />
          <TypeField     gap="12px" />
          <button
            onClick={handleBrowse}
            className="w-full font-hanken font-bold bg-[#1A1A1A] text-[#FFFFFF] transition-all hover:bg-[#333333] flex items-center justify-center"
            style={{ height: "62px", borderRadius: "15px" }}
          >
            Browse
          </button>
        </div>
      )}

      {/* ── MID-RANGE (600px – 1199px) ── */}
      {isMidRange && (
        <div
          className="flex flex-col border border-[#000000] shadow-sm bg-[#FFFFFF]"
          style={{
            width: "100%", height: "auto", minHeight: "318px",
            borderRadius: "24px", padding: "24px",
          }}
        >
          <LocationField gap="16px" pt="12px" pb="12px" />
          <PriceField    gap="16px" pt="12px" pb="12px" />
          <TypeField     gap="16px" pt="12px" pb="12px" />
          <button
            onClick={handleBrowse}
            className="w-full font-hanken font-bold bg-[#1A1A1A] text-[#FFFFFF] transition-all hover:bg-[#333333] flex items-center justify-center flex-shrink-0"
            style={{ height: "56px", borderRadius: "12px", marginTop: "12px" }}
          >
            Browse
          </button>
        </div>
      )}

      {/* ── DESKTOP (≥1200px) ── */}
      {isDesktop && (
        <div
          className="flex items-center border border-[#000000] shadow-sm bg-[#FFFFFF]"
          style={{
            width: "100%", height: "96px",
            borderRadius: "15px", padding: "0 24px", gap: "24px",
          }}
        >
          <LocationField gap="16px" />
          <div className="w-[1px] h-10 bg-[#E8E1FF] flex-shrink-0" />
          <PriceField    gap="16px" />
          <div className="w-[1px] h-10 bg-[#E8E1FF] flex-shrink-0" />
          <TypeField     gap="16px" />
          <button
            onClick={handleBrowse}
            className="font-hanken font-bold bg-[#1A1A1A] text-[#FFFFFF] transition-all hover:bg-[#333333] flex-shrink-0 flex items-center justify-center"
            style={{ width: "140px", height: "64px", gap: "8px", padding: "20px 40px", borderRadius: "15px" }}
          >
            Browse
          </button>
        </div>
      )}
    </>
  );
};