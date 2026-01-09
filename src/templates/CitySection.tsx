"use client";
import React from "react";
import { CityCard } from "../components/organisms/CityCard";
import { City, CitiesData } from "../types/city";
import citiesDataJson from "../data/cities.json";
import { ArrowRight } from "lucide-react";

const citiesData = citiesDataJson as unknown as CitiesData;

export const CitySection = () => {
  const displayCities = citiesData.cities.slice(0, 3);

  return (
    <section className="w-full max-w-[1160px] mx-auto px-4 bg-[#FBFAFF]" style={{ padding: '100px 16px' }}>
      <div className="flex justify-between items-center mb-[50px]">
        <h2 className="font-syne font-semibold text-[48px] leading-[56px] tracking-[-0.04em] text-[#1A1A1A]">
          Explore Cities
        </h2>
        
        <button className="bg-transparent p-0 border-none outline-none flex items-center gap-2 group transition-all cursor-pointer hover:opacity-80">
          <span className="font-hanken font-bold text-[18px] leading-[22px] text-[#1A1A1A]">
            Browse All Cities
          </span>
          <ArrowRight size={20} className="text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div 
        className="grid gap-[32px]" 
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(365px, 1fr))',
          maxWidth: '1160px'
        }}
      >
        {displayCities.map((city: City) => (
          <CityCard 
            key={city.id}
            name={city.name}
            state={city.state}
            count={city.count}
            image={city.image}
          />
        ))}
      </div>
    </section>
  );
};