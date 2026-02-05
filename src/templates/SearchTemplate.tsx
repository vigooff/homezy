"use client";

import React, { useMemo, useState, useEffect } from "react";
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

  // === KODE NUKLIR & DEBUG ===
  useEffect(() => {
    console.log("=== PAGINATION DEBUG STATUS ===");
    console.log("Total Data:", properties.length);
    console.log("Current Page:", currentPage);

    // Paksa semua parent dari level main ke atas supaya tidak nge-cut konten
    const forceStyles = () => {
      const elementsToFix = document.querySelectorAll('main, body, html, #__next');
      elementsToFix.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.height = 'auto';
          el.style.minHeight = '100vh';
          el.style.overflow = 'visible';
          el.style.display = 'block';
        }
      });
      
      // Cek apakah element pagination ada di DOM
      const paginationEl = document.getElementById('pagination-trigger');
      if (paginationEl) {
        const rect = paginationEl.getBoundingClientRect();
        console.log("Pagination Position Y:", rect.top + window.scrollY);
      } else {
        console.error("Pagination element NOT FOUND in DOM!");
      }
    };

    forceStyles();
    // Re-run setelah sedikit delay untuk memastikan Next.js selesai render
    const timeout = setTimeout(forceStyles, 500);
    return () => clearTimeout(timeout);
  }, [currentPage, properties.length]);

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
    <div className="w-full flex flex-col bg-[#FBFAFF]" style={{ isolation: 'isolate' }}>
      <header className="w-full pt-16 pb-12 bg-white">
        <div className="max-w-[1440px] mb-[3%] mx-auto px-[2%] flex flex-col gap-10">
          <h1 className="font-syne font-bold text-[clamp(40px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">
            Search Properties
          </h1>        
          <div className="flex items-center w-full gap-[5%]">   
            <div className="flex-1 min-w-0">
              <SearchPropertiesCard />
            </div>
            <button className="bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex flex-col items-center justify-center gap-2 hover:bg-[#DBCBFF] transition-all flex-shrink-0" style={{ width: "120px", height: "96px" }}>
              <Image src="/icons/candle.svg" alt="Filter" width={24} height={24} />
              <span className="font-hanken font-bold text-[14px]">More Filter</span>
            </button>
          </div>
        </div>
      </header>

      <div className="w-full">
        <div className="max-w-[1440px] mx-auto px-[2%] py-10">
          <div className="flex flex-row gap-[40px] items-start relative">
            
            {/* LEFT COLUMN: MAP */}
            <section className="w-[45%] flex-shrink-0">
              <div className="sticky top-24 w-full">
                 <div 
                   className="w-full rounded-[24px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]"
                   style={{ height: 'calc(100vh - 120px)', minHeight: '500px' }}
                 >
                  <MapComponent properties={memoizedProperties} />
                </div>
              </div>
            </section>

            {/* RIGHT COLUMN: LIST */}
            <section className="flex-1 min-w-0 flex flex-col">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="font-syne font-bold text-[32px] text-[#1A1A1A]">
                    {properties.length} Results
                  </h2>
                </div>
              </div>
              
              <div className="flex flex-col gap-[32px] mb-12">
                {currentProperties.map((item) => (
                  <PropertyCardSearch key={item.id} property={item} />
                ))}
              </div>
              
              {/* PAGINATION - Gue kasih ID buat di-track console log */}
              <div 
                id="pagination-trigger"
                className="flex flex-col items-center justify-center gap-6 py-20 border-t border-[#E8E1FF] mt-20"
                style={{ minHeight: '200px', width: '100%', clear: 'both' }}
              >
                <p className="font-hanken text-sm text-[#868893]">
                  Showing <span className="font-bold text-[#1A1A1A]">{startIndex + 1}</span> to <span className="font-bold text-[#1A1A1A]">{Math.min(endIndex, properties.length)}</span> of <span className="font-bold text-[#1A1A1A]">{properties.length}</span> properties
                </p>

                <div className="flex items-center gap-[16px]">
                  <button 
                    onClick={() => currentPage > 1 && goToPage(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className={`p-2 transition-all ${currentPage === 1 ? 'opacity-20' : 'text-[#1A1A1A]'}`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-[12px]">
                    {getPageNumbers().map((page, index) => (
                      <button 
                        key={index} 
                        onClick={() => typeof page === 'number' && goToPage(page)} 
                        className={`min-w-[44px] h-[44px] rounded-[12px] ${currentPage === page ? 'bg-[#1A1A1A] text-white' : 'text-[#868893]'}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    className={`p-2 transition-all ${currentPage === totalPages ? 'opacity-20' : 'text-[#1A1A1A]'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              {/* Spacer tambahan biar bener-bener gak ketutup footer */}
              <div className="h-[100px] w-full"></div>
            </section> section
          </div>
        </div>
      </div>
    </div>
  );
};