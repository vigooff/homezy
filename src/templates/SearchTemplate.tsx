"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { SearchPropertiesCard } from "../components/organisms/SearchPropertiesCard";
import { PropertyCardSearch } from "../components/organisms/PropertyCardSearch";
import { Property } from "../types/properties";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const MapComponent = dynamic(
  () => import("../components/organisms/MapProvider").then((mod) => mod.default),
  { 
    ssr: false, 
    loading: () => <div className="h-full w-full bg-[#E7DCFF]/10 animate-pulse rounded-[24px]" /> 
  }
);

interface SearchTemplateProps {
  properties: Property[];
}

export const SearchTemplate = ({ properties = [] }: SearchTemplateProps) => {
  const memoizedProperties = useMemo(() => properties, [properties]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full flex flex-col bg-[#FBFAFF] min-h-screen">
      <header className="w-full pt-16 pb-12 bg-white border-b border-[#E8E1FF]">
        <div className="max-w-[1440px] mb-[3%] mx-auto px-[2%] lg:px-[2%] flex flex-col gap-10">
          <h1 className="font-syne font-bold text-[clamp(40px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">
            Search Properties
          </h1>        
          <div className="flex items-center w-full" style={{ gap: "5%" }}>   
            <div className="flex-1 min-w-0">
              <SearchPropertiesCard />
            </div>
            <button className="bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex flex-col items-center justify-center gap-2 hover:bg-[#DBCBFF] transition-all flex-shrink-0" style={{ width: "120px", height: "96px" }}>
              <Image src="/icons/candle.svg" alt="Filter" width={24} height={24} className="w-6 h-6" />
              <span className="font-hanken font-bold text-[14px]">More Filter</span>
            </button>
          </div>
        </div>
      </header>

      <div className="w-full bg-[#FBFAFF] py-10">
        <div className="max-w-[1440px] mx-auto px-[2%] lg:px-[2%] flex flex-row gap-[40px] items-start">
          
          {/* KOLOM KIRI: MAP (Sticky & Fixed Height) */}
          <section className="w-[45%] sticky top-10 flex-shrink-0">
            <div className="w-full rounded-[24px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF] relative" 
                 style={{ height: 'calc(100vh - 80px)', minHeight: '600px' }}>
              <MapComponent properties={memoizedProperties} />
            </div>
          </section>

          {/* KOLOM KANAN: LIST (Scroll Alami) */}
          <section className="flex-1 flex flex-col min-w-0">
            <div className="flex justify-between items-end mb-6">
               <div>
                  <h2 className="font-syne font-bold text-[32px] text-[#1A1A1A]">{properties.length} Results</h2>
                  <p className="font-hanken text-[#666666]">Properties in California, US</p>
               </div>
               <div className="flex bg-[#E7DCFF]/50 p-1.5 rounded-xl gap-1">
                  <button className="p-2 bg-white rounded-lg shadow-sm"><LayoutGrid size={20}/></button>
                  <button className="p-2 text-[#666666]"><List size={20}/></button>
               </div>
            </div>
            
            <div className="flex flex-col gap-6 mb-10">
              {currentProperties.map((item) => (
                <PropertyCardSearch key={item.id} property={item} />
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-2 pb-20">
              <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage === 1} className={`w-10 h-10 flex items-center justify-center rounded-lg border border-[#E8E1FF] ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#F7F2FF]'}`}>
                <ChevronLeft size={20} />
              </button>
              {getPageNumbers().map((page, index) => (
                <button key={index} onClick={() => typeof page === 'number' && goToPage(page)} className={`w-10 h-10 rounded-lg font-medium border border-[#E8E1FF] ${currentPage === page ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#F7F2FF]'}`}>
                  {page}
                </button>
              ))}
              <button onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`w-10 h-10 flex items-center justify-center rounded-lg border border-[#E8E1FF] ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#F7F2FF]'}`}>
                <ChevronRight size={20} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};