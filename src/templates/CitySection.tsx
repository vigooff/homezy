"use client";
import React, { useState, useEffect } from "react";
import { CityCard } from "../components/organisms/CityCard";
import { City } from "../types/city";
import { ArrowRight } from "lucide-react";

export const CitySection = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/cities");
        const json = await res.json();
        if (json.success) {
          setCities(json.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };
    fetchCities();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cities.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cities.length - 1 ? 0 : prev + 1));
  };

  if (cities.length === 0) return null;

  return (
    <section className="w-full bg-[#FBFAFF] py-[40px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[10%]">
        
        {/* Inner Wrapper */}
        <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center min-[901px]:items-stretch">
          
          {/* Header Section */}
          <div className="flex justify-between items-center mb-[50px] w-full max-[900px]:flex-col max-[900px]:text-center gap-4">
            <h2 className="font-syne font-semibold text-[48px] leading-[56px] text-[#1A1A1A] max-[1200px]:text-[38px] max-[900px]:text-[32px]">
              Explore Cities
            </h2>
            <button className="flex items-center gap-2 group cursor-pointer hover:opacity-80 bg-transparent border-none p-0 outline-none">
              <span className="font-hanken font-bold text-[18px] text-[#1A1A1A]">
                Browse All Cities
              </span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Desktop Grid */}
          <div className="hidden min-[901px]:grid grid-cols-3 gap-[24px] lg:gap-[32px] w-full">
          {cities.map((city: City) => (
            <div key={city.id} className="w-full">
              <CityCard
                name={city.name}
                state={city.state}
                count={city.count}
                image={city.image}
              />
            </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="hidden max-[900px]:flex flex-col items-center w-full">
            <div className="w-full max-w-[365px]">
              <CityCard
                name={cities[currentIndex].name}
                state={cities[currentIndex].state}
                count={cities[currentIndex].count}
                image={cities[currentIndex].image}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};