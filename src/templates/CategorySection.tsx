"use client";

import React, { useState } from "react";
import { CategoryCard } from "../components/organisms/CategoryCard";
import { Category, CategoriesData } from "../types/category";
import categoriesDataJson from "../data/categories.json";
import { ArrowRight, ArrowLeft } from "lucide-react";

const categoriesData = (categoriesDataJson as unknown) as CategoriesData;

export const CategorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialCategories = categoriesData.categories.filter(cat => 
    ["Studio", "Apartment", "Office"].includes(cat.title)
  );

  const displayCategories = isExpanded 
    ? categoriesData.categories 
    : initialCategories;

  return (
    <section className="w-full bg-[#FBFAFF] py-[100px]">
  <div className="max-w-[1280px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
    <div className="flex justify-between items-center mb-[60px]
    max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:text-center
    ">
        <h2 className="font-syne font-bold text-[40px] leading-tight text-[#1A1A1A] max-[600px]:text-[32px]">
          Featured Categories
        </h2>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-transparent p-0 border-none outline-none flex items-center gap-2 group transition-all cursor-pointer hover:opacity-80"
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
      <div className="grid grid-cols-3 max-[1200px]:grid-cols-1 gap-[30px] w-full justify-items-center transition-all duration-500">
        {displayCategories.map((category: Category) => (
          <CategoryCard 
            key={category.id}
            iconName={category.iconName} 
            title={category.title}
            count={category.count}
          />
        ))}
      </div>
    </div>
  </section>
  );
};