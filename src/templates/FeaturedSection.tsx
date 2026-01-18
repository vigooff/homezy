"use client";
import React from "react";
import { PropertyCardLarge } from "../components/organisms/PropertyCardLarge";
import { PropertyCardSmall } from "../components/organisms/PropertyCardSmall";
import { Property } from "../types/properties"; 
import { ArrowRight } from "lucide-react";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  if (!properties || properties.length === 0) return null;

  const featuredMain = properties.find(p => p.isFeatured) || properties[0];
  
  const otherFeatured = properties
    .filter(p => p.id !== featuredMain.id)
    .slice(0, 3);

  if (!featuredMain) return null;

  return (
    <section className="w-full bg-[#FBFAFF]" style={{ padding: "100px 0" }}>
      <div className="max-w-[1440px] mx-auto px-[10%]">
        
        <div className="w-full flex items-center justify-between mb-8 relative">
          <h2 className="font-syne font-bold text-[48px] max-[1200px]:text-[32px]">
            Featured Listings
          </h2>
          
          <button className="bg-transparent p-0 border-none outline-none flex items-center gap-2 group transition-all cursor-pointer hover:opacity-80">
            <span className="font-hanken font-bold text-[18px] max-[1200px]:text-[15px] leading-[22px] text-[#1A1A1A]">
              Browse All Featured
            </span>
            <ArrowRight 
              size={20} 
              className="text-[#1A1A1A] transition-transform group-hover:translate-x-1" 
            />
          </button>
        </div>

        <div className="flex flex-col mx-[50px] gap-[40px]">
          <PropertyCardLarge property={featuredMain} />

          {otherFeatured.length > 0 && (
            <div
              className="
                grid
                grid-cols-3
                max-[900px]:grid-cols-1
                gap-[30px]
                min-[1600px]:gap-[0px]
                min-[1600px]:pl-[7px]
                w-full
              "
            >
              {otherFeatured.map((property) => (
                <PropertyCardSmall key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
