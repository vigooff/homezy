"use client";
import React, { useState } from "react";
import { CityCard } from "../components/organisms/CityCard";
import { City, CitiesData } from "../types/city";
import citiesDataJson from "../data/cities.json";
import { ArrowRight } from "lucide-react";

const citiesData = citiesDataJson as unknown as CitiesData;

export const CitySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cities = citiesData.cities;
  const displayCities = cities.slice(0, 3);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayCities.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayCities.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#FBFAFF] py-[100px] overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-4 max-[450px]:px-[24px]">
      <div className="flex justify-between items-center mb-[50px] ml-[20px] 
      max-[900px]:flex-col max-[900px]:items-center max-[900px]:text-center max-[900px]:gap-4
      max-[900px]:pl-[10%] max-[900px]:pr-[15%]
      ">
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
        <div 
          className="hidden min-[901px]:grid grid-cols-3 gap-[32px] justify-center w-full mx-auto
                     max-[1200px]:grid-cols-[repeat(3,255px)]
                     max-[1200px]:gap-[20px]"
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
        <div className="hidden max-[900px]:flex flex-col items-center w-full">
          <div className="w-full max-w-[365px]">
            <CityCard 
              name={displayCities[currentIndex].name}
              state={displayCities[currentIndex].state}
              count={displayCities[currentIndex].count}
              image={displayCities[currentIndex].image}
            />
          </div>
          <div className="flex gap-4 mt-8"> 
            <button 
              onClick={handlePrev}
              className="w-[50px] h-[50px] bg-[#1A1A1A] mr-[15px] mt-[30px] rounded-[7px] flex items-center justify-center transition-opacity hover:opacity-80 shadow-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="w-[50px] h-[50px] bg-[#1A1A1A] ml-[15px] mt-[30px] rounded-[7px] flex items-center justify-center transition-opacity hover:opacity-80 shadow-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};