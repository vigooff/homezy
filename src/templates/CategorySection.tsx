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
    <section className="max-w-[1200px] mx-auto px-4 bg-[#FBFAFF]" style={{ padding: '100px 16px' }}>
      <div className="flex justify-between items-center mb-[60px]">
        <h2 className="font-syne font-bold text-[40px] leading-tight text-[#1A1A1A]">
          Featured Categories
        </h2>

        {isExpanded ? (
          <button 
            onClick={() => setIsExpanded(false)}
            className="bg-transparent p-0 border-none outline-none flex items-center gap-2 group transition-all cursor-pointer hover:opacity-80"
          >
            <ArrowLeft 
              size={20} 
              className="text-[#1A1A1A] transition-transform group-hover:-translate-x-1" 
            />
            <span className="font-hanken font-bold text-[18px] leading-[22px] text-[#1A1A1A]">
              Show Less
            </span>
          </button>
        ) : (
          <button 
            onClick={() => setIsExpanded(true)}
            className="bg-transparent p-0 border-none outline-none flex items-center gap-2 group transition-all cursor-pointer hover:opacity-80"
          >
            <span className="font-hanken font-bold text-[18px] leading-[22px] text-[#1A1A1A]">
              Browse All Categories
            </span>
            <ArrowRight 
              size={20} 
              className="text-[#1A1A1A] transition-transform group-hover:translate-x-1" 
            />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-[30px] w-full transition-all duration-500">
        {displayCategories.map((category: Category) => (
          <CategoryCard 
            key={category.id}
            iconName={category.iconName} 
            title={category.title}
            count={category.count}
          />
        ))}
      </div>
    </section>
  );
};