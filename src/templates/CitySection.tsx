"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // 1. Import motion
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  if (cities.length === 0) return null;

  return (
    <section className="w-full bg-[#FBFAFF] py-[40px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[10%]">
        
        {/* Inner Wrapper */}
        <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center min-[901px]:items-stretch">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-between items-center mb-[50px] w-full max-[900px]:flex-col max-[900px]:text-center gap-4"
          >
            <h2 className="font-syne font-semibold text-[48px] leading-[56px] text-[#1A1A1A] max-[1200px]:text-[38px] max-[900px]:text-[32px]">
              Explore Cities
            </h2>
            <button className="flex items-center gap-2 group cursor-pointer hover:opacity-80 bg-transparent border-none p-0 outline-none">
              <span className="font-hanken font-bold text-[18px] text-[#1A1A1A]">
                Browse All Cities
              </span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1 text-[#1A1A1A]" />
            </button>
          </motion.div>

          {/* Desktop Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="hidden min-[901px]:grid grid-cols-3 gap-[24px] lg:gap-[32px] w-full"
          >
          {cities.map((city: City) => (
            <motion.div key={city.id} variants={itemVariants} className="w-full">
              <CityCard
                name={city.name}
                state={city.state}
                count={city.count}
                image={city.image}
              />
            </motion.div>
            ))}
          </motion.div>

          {/* Mobile Carousel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden max-[900px]:flex flex-col items-center w-full"
          >
            <div className="w-full max-w-[365px]">
              <CityCard
                name={cities[currentIndex].name}
                state={cities[currentIndex].state}
                count={cities[currentIndex].count}
                image={cities[currentIndex].image}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};