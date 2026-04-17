"use client";

import React, { useState, useEffect } from "react";
import { CategoryCard } from "../components/organisms/CategoryCard";
import { Category } from "../types/category";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const initialCategories = categories.filter((cat) =>
    ["Studio", "Apartment", "Office"].includes(cat.title)
  );

  const displayCategories = isExpanded ? categories : initialCategories;

  return (
    <section className="w-full bg-[#FBFAFF] overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto py-[40px] px-[5%] lg:px-[10%] box-border">
        
        <div className="max-w-[1200px] mx-auto w-full">
          
          {/* Header Section */}
          <div className="flex justify-between items-center mb-[50px] w-full max-[900px]:flex-col max-[900px]:text-center gap-4 min-[901px]:h-[56px]">
          <h2 className="font-syne font-semibold text-[48px] leading-[56px] text-[#1A1A1A] max-[1200px]:text-[38px] max-[900px]:text-[32px]">
            Featured Categories
          </h2>
            
            <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-transparent p-0 border-none outline-none flex items-center gap-2 group transition-all cursor-pointer hover:opacity-80 shrink-0"
          >
            {isExpanded ? (
              <>
                <ArrowLeft size={20} className="text-[#1A1A1A] transition-transform group-hover:-translate-x-1" />
                <span className="font-hanken font-bold text-[18px] text-[#1A1A1A]">Show Less</span>
              </>
            ) : (
              <>
                <span className="font-hanken font-bold text-[18px] text-[#1A1A1A]">Browse All Categories</span>
                <ArrowRight size={20} className="text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

          <div className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-[24px] lg:gap-[30px] w-full justify-items-center transition-all duration-500">
            {displayCategories.map((category: Category) => (
              <div key={category.id} className="w-full flex justify-center">
                 <CategoryCard
                   iconName={category.iconName}
                   title={category.title}
                   count={category.count}
                 />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};