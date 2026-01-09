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
    <section className="w-full max-w-[1200px] mx-auto px-4 bg-[#FBFAFF]" style={{ padding: '100px 16px' }}>
      <div className="flex justify-between items-center mb-[40px]">
        <h2 className="font-syne font-bold text-[40px] leading-tight text-[#1A1A1A]">
          Featured Listings
        </h2>
        
        <button className="bg-transparent p-0 border-none outline-none flex items-center gap-2 group transition-all cursor-pointer hover:opacity-80">
          <span className="font-hanken font-bold text-[18px] leading-[22px] text-[#1A1A1A]">
            Browse All Featured
          </span>
          <ArrowRight 
            size={20} 
            className="text-[#1A1A1A] transition-transform group-hover:translate-x-1" 
          />
        </button>
      </div>

      <div className="flex flex-col gap-[40px]">
        <PropertyCardLarge property={featuredMain} />

        {otherFeatured.length > 0 && (
          <div className="grid grid-cols-3 gap-[30px] w-full">
            {otherFeatured.map((property) => (
              <PropertyCardSmall key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};