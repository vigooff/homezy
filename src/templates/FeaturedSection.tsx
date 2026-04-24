"use client";
import React from "react";
import { motion } from "framer-motion"; // Import motion
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

  // Konfigurasi Animasi Webflow Style
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jeda 0.2 detik antar anak elemen
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Cubic-bezier khas Webflow
      },
    },
  };

  if (!featuredMain) return null;

  return (
    <section className="w-full bg-[#FBFAFF] py-[60px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[10%]">
        
        {/* Inner Wrapper */}
        <div className="max-w-[1200px] mx-auto w-full">
          
          {/* Header Section - Reveal dari kiri */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center justify-between mb-8 relative"
          >
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
          </motion.div>

          <div className="flex flex-col items-center gap-[40px] w-full">
            
            {/* Card Besar - Reveal Utama */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <PropertyCardLarge property={featuredMain} />
            </motion.div>

            {/* List Card Kecil - Staggered Reveal */}
            {otherFeatured.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="
                  grid
                  grid-cols-3
                  max-[900px]:grid-cols-2
                  max-[750px]:grid-cols-1
                  gap-[24px]
                  w-full
                  max-w-[1200px]
                "
              >
                {otherFeatured.map((property, index) => (
                  <motion.div 
                    key={property.id} 
                    variants={itemVariants}
                    className={index === 2 ? 'max-[900px]:col-span-2 max-[900px]:max-w-[calc(50%-12px)] max-[900px]:mx-auto max-[750px]:col-span-1 max-[750px]:max-w-[400px]' : ''}
                  >
                    <PropertyCardSmall
                      property={property}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};