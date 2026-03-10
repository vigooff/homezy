"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { SearchPropertiesCard } from "../components/organisms/SearchPropertiesCard";
import { PropertyCardSearch } from "../components/organisms/PropertyCardSearch";
import { Property } from "../types/properties";
import { PopupFilter, FilterOptions } from "../components/molecules/PopupFilter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { filterProperties } from "../utils/filterUtils";

const MapProvider = dynamic(
  () => import("../components/organisms/MapProvider"),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-[24px]" /> 
  }
);

interface SearchTemplateProps {
  properties: Property[];
}

export const SearchTemplate = ({ properties = [] }: SearchTemplateProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  React.useEffect(() => {
    setIsMounted(true);
    
    // Debug: Log initial window width
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      setWindowWidth(width);
      console.log('🖥️ Initial Window Width:', width);
      console.log('📱 Breakpoint Status:', width >= 768 ? 'DESKTOP (≥768px)' : 'MOBILE (<768px)');
    }
    
    // Debug: Listen to window resize
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setWindowWidth(width);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debug: Log which layout is being rendered
  React.useEffect(() => {
    if (isMounted) {
      if (windowWidth < 768) {
        console.log('🟢 RENDERING: Mobile Layout');
      } else if (windowWidth >= 768) {
        console.log('🔵 RENDERING: Desktop Layout');
      }
    }
  }, [isMounted, windowWidth]);
  
  const itemsPerPage = 3;
 
  const memoizedProperties = useMemo(() => filteredProperties, [filteredProperties]);
 
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
 
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const handleApplyFilter = (filters: FilterOptions) => {
    console.log('🎯 SearchTemplate: Filters received:', filters);
    
    try {
      const filtered = filterProperties(properties, filters);
      
      console.log('Filtered results:', filtered.length, 'properties');
      console.log('Original count:', properties.length);
      
      setFilteredProperties(filtered);
      setActiveFilters(filters);
      setCurrentPage(1);
      
      console.log('Filter applied successfully!');
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  const handleClearFilters = () => {
    console.log('🔄 Clearing all filters...');
    setFilteredProperties(properties);
    setActiveFilters(null);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('results-start');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mobile pagination: < 1 2 3 ... >
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      // Show all if 5 or less pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Mobile logic: show first 3 pages + ellipsis
      pages.push(1);
      if (currentPage > 2) pages.push(2);
      if (currentPage > 3) pages.push(3);
      if (currentPage < totalPages - 1) pages.push('...');
    }
    
    return pages;
  };

  const getActiveFilterCount = () => {
    if (!activeFilters) return 0;
    
    let count = 0;
    if (activeFilters.category !== 'Category') count++;
    if (activeFilters.bedrooms !== 'Select') count++;
    if (activeFilters.bathrooms !== 'Select') count++;
    if (activeFilters.priceRange !== 'Select') count++;
    if (activeFilters.minYear !== 'Min Year') count++;
    if (activeFilters.maxYear !== 'Max Year') count++;
    
    return count;
  };

  return (
    <div className="w-full flex flex-col bg-[#FBFAFF]">
      
      
     
      {/* HEADER N SEARCH BAR */}
      <header className="w-full pt-16 pb-12 bg-white border-[#E8E1FF]/50">
        <div className="max-w-[1440px] mb-[3%] mx-auto px-[20px] md:px-[10%] flex flex-col gap-6 md:gap-10">
          <h1 className="font-syne font-bold text-[clamp(32px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">
            Search Properties
          </h1>        
          
          {/* MOBILE LAYOUT - Using inline media query check */}
          {isMounted && windowWidth < 768 && (
            <div className="flex flex-col gap-[24px] w-full">
              <SearchPropertiesCard />
              
              {/* MOBILE FILTER BUTTON */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex items-center justify-center gap-3 hover:bg-[#DBCBFF] transition-all relative"
                style={{ 
                  height: "58px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "32px",
                  paddingRight: "32px"
                }}
              >
                <Image src="/icons/candle.svg" alt="Filter" width={20} height={20} />
                <span className="font-hanken font-bold text-[14px]">More Filter</span>
                
                {getActiveFilterCount() > 0 && (
                  <span 
                    className="absolute top-2 right-2 bg-[#1A1A1A] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* DESKTOP LAYOUT - Using inline media query check */}
          {isMounted && windowWidth >= 768 && (
            <div className="flex items-center w-full gap-[5%]">
              <div className="flex-1 min-w-0">
                <SearchPropertiesCard />
              </div>

              {/* CONTAINER UNTUK FILTER & POPUP */}
              {/* Menambahkan margin-right agar seluruh container (termasuk popup) bergeser ke kiri */}
              <div className="relative flex justify-end" style={{ marginRight: "40px" }}> 
                
                {/* FILTER BUTTON */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex flex-col items-center justify-center gap-2 hover:bg-[#DBCBFF] transition-all flex-shrink-0 relative z-[101]"
                  style={{ width: "120px", height: "96px" }}
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Image src="/icons/candle.svg" alt="Filter" width={24} height={24} />
                    <span className="font-hanken font-bold text-[14px]">More Filter</span>
                  </div>

                  {getActiveFilterCount() > 0 && (
                    <span 
                      className="absolute top-2 right-2 bg-[#1A1A1A] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold"
                      style={{ pointerEvents: 'none' }}
                    >
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>

                {/* POPUP FILTER - DESKTOP */}
                {isFilterOpen && (
                  <div 
                    className="absolute top-[110%] right-0 z-[100]" 
                    style={{ 
                      width: '441px',
                      filter: 'drop-shadow(0px 20px 50px rgba(0,0,0,0.1))' 
                    }}
                  >
                    <PopupFilter 
                      onClose={() => {
                        console.log('🚪 Closing filter popup...');
                        setIsFilterOpen(false);
                      }}
                      onApplyFilter={handleApplyFilter}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE FILTER POPUP - Full Screen Overlay - Using inline check */}
      {isMounted && windowWidth < 768 && isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="w-full max-w-[441px]">
            <PopupFilter 
              onClose={() => setIsFilterOpen(false)}
              onApplyFilter={handleApplyFilter}
            />
          </div>
        </div>
      )}

      <div id="results-start" className="w-full">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[10%] py-10 mb-[8%]">
          
          {/* MOBILE LAYOUT - Using inline check */}
          {isMounted && windowWidth < 768 && (
            <div className="flex flex-col gap-6">
              
              {/* MAP SECTION - Mobile */}
              <section className="w-full">
                <div
                  className="w-full rounded-[15px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]"
                  style={{ height: '409px' }}
                >
                  <MapProvider properties={memoizedProperties} />
                </div>
              </section>

              {/* RESULTS HEADER - Mobile */}
              <div className="flex flex-col gap-2">
                <h2 className="font-syne font-bold text-[24px] text-[#1A1A1A]">
                  {filteredProperties.length} Results
                </h2>
                
                {activeFilters && getActiveFilterCount() > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#868893]">
                      {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active
                    </span>
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-[#1A1A1A] underline hover:text-[#000000] transition-colors bg-transparent border-none"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              {/* PROPERTY CARDS - Mobile */}
              <div className="flex flex-col gap-[24px]">
                {currentProperties.length > 0 ? (
                  currentProperties.map((item) => (
                    <PropertyCardSearch key={item.id} property={item} />
                  ))
                ) : (
                  <div className="text-center py-20">
                    <p className="text-lg text-[#868893] mb-4">No properties match your filters</p>
                    <button
                      onClick={handleClearFilters}
                      className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>

              {/* PAGINATION - Mobile */}
              {currentProperties.length > 0 && (
                <div className="flex flex-col items-center justify-center gap-4 pt-6 pb-10">
                  <p className="font-hanken text-sm text-[#7C5F93] text-center">
                    Showing <span className="font-bold text-[#1A1A1A]">{startIndex + 1}</span> to <span className="font-bold text-[#1A1A1A]">{Math.min(endIndex, filteredProperties.length)}</span> of <span className="font-bold text-[#1A1A1A]">{filteredProperties.length}</span>
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 transition-all border-none bg-transparent ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                      {getPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => typeof page === 'number' && goToPage(page)}
                          className={`min-w-[36px] h-[36px] rounded-[10px] font-hanken font-bold transition-all border-none text-sm
                            ${currentPage === page
                              ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md'
                              : 'bg-transparent text-[#868893]'
                            }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 transition-all border-none bg-transparent ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* DESKTOP LAYOUT - Using inline check */}
          {isMounted && windowWidth >= 768 && (
            <div className="flex flex-row gap-[40px] items-start relative">
           
              {/* MAP */}
              <section className="w-[45%] flex-shrink-0 sticky top-10 pb-6%">
                <div
                  className="w-full rounded-[24px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]"
                  style={{ height: '930px' }}
                >
                  <MapProvider properties={memoizedProperties} />
                </div>
              </section>

              {/* RIGHT COLUMN */}
              <section className="flex-1 min-w-0 flex-col">

                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-syne font-bold text-[32px] text-[#1A1A1A]">
                      {filteredProperties.length} Results
                    </h2>
                    
                    {/* Active Filters Display */}
                    {activeFilters && getActiveFilterCount() > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#868893]">
                          {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active
                        </span>
                        <button
                          onClick={handleClearFilters}
                          className="text-sm text-[#1A1A1A] underline hover:text-[#000000] transition-colors bg-transparent border-none"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className="flex items-center gap-3 relative"
                    style={{
                      top: '-32px',
                      right: '0px'
                    }}
                  >
                    <button
                      className="flex items-center justify-center bg-[#F0EBFF] border border-[#1A1A1A] transition-all"
                      style={{
                        width: '36px',
                        height: '36px',
                        padding: '8px',
                        borderRadius: '8px',
                        gap: '8px'
                      }}
                    >
                      <Image
                        src="/icons/menu-search.svg"
                        alt="Grid View"
                        width={20}
                        height={20}
                      />
                    </button>
                   
                    <button
                      className="flex items-center justify-center bg-transparent border-none transition-all"
                      style={{
                        width: '36px',
                        height: '36px',
                        padding: '8px',
                        opacity: 1
                      }}
                    >
                      <Image
                        src="/icons/menu-search2.svg"
                        alt="List View"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
               
                {/* CARD PROPERTY CONTAINER */}
                <div className="flex flex-col gap-[32px] mb-12">
                  {currentProperties.length > 0 ? (
                    currentProperties.map((item) => (
                      <PropertyCardSearch key={item.id} property={item} />
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-xl text-[#868893] mb-4">No properties match your filters</p>
                      <button
                        onClick={handleClearFilters}
                        className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
               
                {/* PAGINATION SECTION */}
                {currentProperties.length > 0 && (
                  <div className="flex flex-col items-center justify-center gap-6 pt-10 pb-20 border-[#E8E1FF] mt-4 pb-[40px]">
                    <p className="font-hanken text-sm text-[#7C5F93]">
                      Showing <span className="font-bold text-[#1A1A1A]">{startIndex + 1}</span> to <span className="font-bold text-[#1A1A1A]">{Math.min(endIndex, filteredProperties.length)}</span> of <span className="font-bold text-[#1A1A1A]">{filteredProperties.length}</span> properties
                    </p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 transition-all border-none bg-transparent outline-none ring-0 ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A] hover:scale-110'}`}
                      >
                        <ChevronLeft size={24} />
                      </button>

                      <div className="flex items-center gap-4">
                        {getPageNumbers().map((page, index) => (
                          <button
                            key={index}
                            onClick={() => typeof page === 'number' && goToPage(page)}
                            className={`min-w-[44px] h-[44px] rounded-[12px] font-hanken font-bold transition-all border-none outline-none ring-0
                              ${currentPage === page
                                ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md'
                                : 'bg-transparent text-[#868893] hover:text-[#1A1A1A]'
                              }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 transition-all border-none bg-transparent outline-none ring-0 ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A] hover:scale-110'}`}
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </section>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
