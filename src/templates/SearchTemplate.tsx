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
    
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      setWindowWidth(width);
      console.log('🖥️ Initial Window Width:', width);
    }
    
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setWindowWidth(width);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      if (windowWidth < 768) {
        console.log('🟢 RENDERING: Mobile Layout (<768px)');
      } else if (windowWidth >= 768 && windowWidth < 1200) {
        console.log('🟡 RENDERING: Mid-Range Layout (768px - 1199px)');
      } else {
        console.log('🔵 RENDERING: Desktop Layout (≥1200px)');
      }
    }
  }, [isMounted, windowWidth]);
  
  // ─── Breakpoint helpers ─────────────────────────────────────────────────
  // Harus dideklarasi SEBELUM itemsPerPage karena itemsPerPage bergantung padanya
  const isSmallMobile = isMounted && windowWidth <= 500;
  const isMobile      = isMounted && windowWidth > 500 && windowWidth < 768;
  const isMidRange    = isMounted && windowWidth >= 768 && windowWidth < 1200;
  const isDesktop     = isMounted && windowWidth >= 1200;
  // ─────────────────────────────────────────────────────────────────────────

  // 4 kartu di mid-range (grid 2x2), 3 di mobile & desktop
  const itemsPerPage = isMidRange ? 4 : 3;
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
      setFilteredProperties(filtered);
      setActiveFilters(filters);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  const handleClearFilters = () => {
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

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // Sedikit halaman: tampilkan semua
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Banyak halaman: tampilkan window sekitar currentPage
    const pages: (number | string)[] = [];

    // Selalu tampilkan halaman 1
    pages.push(1);

    // Ellipsis kiri jika currentPage jauh dari awal
    if (currentPage > 3) pages.push('...');

    // Neighbor kiri
    if (currentPage > 2) pages.push(currentPage - 1);

    // Current page (kecuali sudah ada di array)
    if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);

    // Neighbor kanan
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);

    // Ellipsis kanan jika currentPage jauh dari akhir
    if (currentPage < totalPages - 2) pages.push('...');

    // Selalu tampilkan halaman terakhir
    pages.push(totalPages);

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

      {/* ═══════════════════════════════════════════════════════════════════
          HEADER & SEARCH BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="w-full pt-8 pb-8 md:pt-16 md:pb-12 bg-white border-b border-[#E8E1FF]/50 mb-6 md:mb-10 lg:mb-16">

        {/* ── SMALL MOBILE LAYOUT (≤500px) — layout natural browser ──────── */}
        {isSmallMobile && (
          <div className="mx-auto px-[16px] pb-8 flex flex-col gap-4">
            <h1 className="font-syne font-bold text-[clamp(28px,8vw,40px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">
              Search Properties
            </h1>
            <SearchPropertiesCard />
            <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex items-center justify-center hover:bg-[#DBCBFF] transition-all relative"
            style={{ height: "52px", marginTop: "8px", marginBottom: "8px" }}
          >
            <div className="flex items-center justify-center gap-3 pointer-events-none">
              <Image src="/icons/candle.svg" alt="Filter" width={18} height={18} />
              <span className="font-hanken font-bold text-[13px]">More Filter</span>
            </div>
            
          </button>
          </div>
        )}

        {/* ── MOBILE LAYOUT (501px - 767px) ───────────────────────────────── */}
        {isMobile && (
          <div className="max-w-[1440px] mb-[3%] mx-auto px-[20px] flex flex-col gap-6">
            <h1 className="font-syne font-bold text-[clamp(32px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">
              Search Properties
            </h1>
            <SearchPropertiesCard />
            <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex items-center justify-center hover:bg-[#DBCBFF] transition-all relative"
            style={{ height: "58px", paddingTop: "20px", paddingBottom: "20px", paddingLeft: "32px", paddingRight: "32px", marginTop: "16px" }}
          >
            <div className="flex items-center justify-center gap-3 pointer-events-none">
              <Image src="/icons/candle.svg" alt="Filter" width={20} height={20} />
              <span className="font-hanken font-bold text-[14px]">More Filter</span>
            </div>
          </button>
          </div>
        )}

        {/* ── MID-RANGE LAYOUT (768px - 1199px) ─────────────────────────── */}
        {isMidRange && (
          <div
            className="max-w-[1440px] mx-auto flex flex-col gap-8"
            style={{ 
              paddingLeft: '7.5%', 
              paddingRight: '7.5%', 
              paddingBottom: '80px'
            }}
          >
            <h1 className="font-syne font-bold text-[clamp(32px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">
              Search Properties
            </h1>

            <div className="flex items-stretch w-full">

              <div style={{ width: '75%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <SearchPropertiesCard />
              </div>

              <div style={{ width: '5%' }} className="flex-shrink-0" />

              {/* Filter Button: Lebar 20% — wrapper relative sebagai anchor popup */}
              <div className="relative flex-shrink-0" style={{ width: '20%' }}>
                {/* ✅ FIX: Wrap icon+teks dalam div tersendiri agar badge tidak masuk ke flex flow */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}                  
                  className="w-full h-full bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex flex-col items-center justify-center hover:bg-[#DBCBFF] transition-all relative"
                  >
                  <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <Image src="/icons/candle.svg" alt="Filter" width={28} height={28} />
                    <span className="font-hanken font-bold text-[16px] text-[#1A1A1A]">More Filter</span>
                  </div>
                  
                </button>

                {/* POPUP — absolute anchored ke bawah button, rata kanan, lebar fixed 441px */}
                {isFilterOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '441px',
                      zIndex: 200,
                      filter: 'drop-shadow(0px 20px 50px rgba(0,0,0,0.15))'
                    }}
                  >
                    <PopupFilter
                      onClose={() => setIsFilterOpen(false)}
                      onApplyFilter={handleApplyFilter}
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ── DESKTOP LAYOUT (≥1200px) ───────────────────── */}
        {isDesktop && (
          <div className="max-w-[1440px] mb-[3%] mx-auto px-[10%] flex flex-col gap-10">
            <h1 className="font-syne font-bold text-[clamp(32px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">
              Search Properties
            </h1>
            <div className="flex items-center w-full gap-[5%]">
              <div className="flex-1 min-w-0">
                <SearchPropertiesCard />
              </div>
              <div className="relative flex justify-end flex-shrink-0" style={{ marginLeft: "24px" }}>
                {/* ✅ FIX: Wrap icon+teks dalam div tersendiri agar badge tidak masuk ke flex flow */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex flex-col items-center justify-center hover:bg-[#DBCBFF] transition-all relative z-[101]"
                  style={{ width: "120px", height: "96px" }}
                >
                  <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <Image src="/icons/candle.svg" alt="Filter" width={24} height={24} />
                    <span className="font-hanken font-bold text-[14px]">More Filter</span>
                  </div>
                  
                </button>
                {isFilterOpen && (
                  <div
                    className="absolute top-[110%] right-0 z-[100]"
                    style={{ width: '441px', filter: 'drop-shadow(0px 20px 50px rgba(0,0,0,0.1))' }}
                  >
                    <PopupFilter
                      onClose={() => { console.log('🚪 Closing filter popup...'); setIsFilterOpen(false); }}
                      onApplyFilter={handleApplyFilter}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </header>

      {/* ── SMALL MOBILE FILTER POPUP ─────────────────────────────────── */}
      {isSmallMobile && isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-end justify-center p-0">
          <div className="w-full max-w-[500px]">
            <PopupFilter
              onClose={() => setIsFilterOpen(false)}
              onApplyFilter={handleApplyFilter}
            />
          </div>
        </div>
      )}

      {/* ── MOBILE FILTER POPUP — Full Screen Overlay ──────────────────── */}
      {isMobile && isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="w-full max-w-[441px]">
            <PopupFilter
              onClose={() => setIsFilterOpen(false)}
              onApplyFilter={handleApplyFilter}
            />
          </div>
        </div>
      )}

      {/* MID-RANGE FILTER POPUP: dirender langsung di dalam wrapper filter button
          sebagai absolute positioned element — lihat header section mid-range */}

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN CONTENT: MAP + PROPERTY LIST
      ═══════════════════════════════════════════════════════════════════ */}
      <div id="results-start" className="w-full">

        {/* ── SMALL MOBILE LAYOUT (≤500px) — layout natural browser ──────── */}
        {isSmallMobile && (
          <div className="mx-auto px-[16px] pt-6 pb-8 mb-[8%]">
            <div className="flex flex-col gap-5">
              <section className="w-full">
                <div className="w-full rounded-[15px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]" style={{ height: '280px' }}>
                  <MapProvider properties={memoizedProperties} />
                </div>
              </section>
              <div className="flex flex-col gap-2">
                <h2 className="font-syne font-bold text-[20px] text-[#1A1A1A]">{filteredProperties.length} Results</h2>
                {activeFilters && getActiveFilterCount() > 0 && (
                <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                  <span className="text-sm text-[#000000]">{getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active</span>
                  <button onClick={handleClearFilters} className="text-sm text-[#1A1A1A] underline hover:text-[#bba1f7] transition-colors bg-transparent border-none">Clear all</button>
                </div>
              )}
              </div>
              <div className="flex flex-col gap-[20px]">
                {currentProperties.length > 0 ? (
                  currentProperties.map((item) => (<PropertyCardSearch key={item.id} property={item} />))
                ) : (
                  <div className="text-center py-16">
                    <p className="text-base text-[#868893] mb-4">No properties match your filters</p>
                    <button onClick={handleClearFilters} className="px-5 py-2 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all">Clear Filters</button>
                  </div>
                )}
              </div>
              {currentProperties.length > 0 && (
                <div className="flex flex-col items-center justify-center gap-3 pt-4 pb-8">
                  <p className="font-hanken text-xs text-[#7C5F93] text-center">
                    Showing <span className="font-bold text-[#1A1A1A]">{startIndex + 1}</span> to <span className="font-bold text-[#1A1A1A]">{Math.min(endIndex, filteredProperties.length)}</span> of <span className="font-bold text-[#1A1A1A]">{filteredProperties.length}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage === 1} className={`p-2 transition-all border-none bg-transparent ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}>
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        <button key={index} onClick={() => typeof page === 'number' && goToPage(page)}
                          className={`min-w-[32px] h-[32px] rounded-[8px] font-hanken font-bold transition-all border-none text-xs ${currentPage === page ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md' : 'bg-transparent text-[#868893]'}`}>
                          {page}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 transition-all border-none bg-transparent ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── MOBILE LAYOUT (501px - 767px) ───────────────────────────────── */}
        {isMobile && (
          <div className="max-w-[1440px] mx-auto px-[20px] py-10 mb-[8%]">
            <div className="flex flex-col gap-6">

              <section className="w-full">
                <div className="w-full rounded-[15px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]" style={{ height: '409px' }}>
                  <MapProvider properties={memoizedProperties} />
                </div>
              </section>

              <div className="flex flex-col gap-2">
                <h2 className="font-syne font-bold text-[24px] text-[#1A1A1A]">{filteredProperties.length} Results</h2>
                {activeFilters && getActiveFilterCount() > 0 && (
                <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                  <span className="text-sm text-[#000000]">{getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active</span>
                  <button onClick={handleClearFilters} className="text-sm text-[#1A1A1A] underline hover:text-[#bba1f7] transition-colors bg-transparent border-none">Clear all</button>
                </div>
              )}
              </div>

              <div className="flex flex-col gap-[24px]">
                {currentProperties.length > 0 ? (
                  currentProperties.map((item) => (<PropertyCardSearch key={item.id} property={item} />))
                ) : (
                  <div className="text-center py-20">
                    <p className="text-lg text-[#868893] mb-4">No properties match your filters</p>
                    <button onClick={handleClearFilters} className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all">Clear Filters</button>
                  </div>
                )}
              </div>

              {currentProperties.length > 0 && (
                <div className="flex flex-col items-center justify-center gap-4 pt-6 pb-10">
                  <p className="font-hanken text-sm text-[#7C5F93] text-center">
                    Showing <span className="font-bold text-[#1A1A1A]">{startIndex + 1}</span> to <span className="font-bold text-[#1A1A1A]">{Math.min(endIndex, filteredProperties.length)}</span> of <span className="font-bold text-[#1A1A1A]">{filteredProperties.length}</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage === 1} className={`p-2 transition-all border-none bg-transparent ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}>
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                      {getPageNumbers().map((page, index) => (
                        <button key={index} onClick={() => typeof page === 'number' && goToPage(page)}
                          className={`min-w-[36px] h-[36px] rounded-[10px] font-hanken font-bold transition-all border-none text-sm ${currentPage === page ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md' : 'bg-transparent text-[#868893]'}`}>
                          {page}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 transition-all border-none bg-transparent ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── MID-RANGE LAYOUT (768px - 1199px) ─────────────────────────── */}
        {isMidRange && (
          <div
            className="max-w-[1440px] mx-auto py-10 mb-[8%]"
            style={{ paddingLeft: '7.5%', paddingRight: '7.5%' }}
          >
            <div className="flex flex-col gap-8">

              {/* MAP — full width, tinggi compact */}
              <section className="w-full">
                <div className="w-full rounded-[24px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]" style={{ height: '400px' }}>
                  <MapProvider properties={memoizedProperties} />
                </div>
              </section>

              {/* RESULTS HEADER */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <h2 className="font-syne font-bold text-[28px] text-[#1A1A1A]">{filteredProperties.length} Results</h2>
                  {activeFilters && getActiveFilterCount() > 0 && (
                  <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                    <span className="text-sm text-[#000000]">{getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active</span>
                    <button onClick={handleClearFilters} className="text-sm text-[#1A1A1A] underline hover:text-[#bba1f7] transition-colors bg-transparent border-none">Clear all</button>
                  </div>
                )}
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center justify-center bg-[#F0EBFF] border border-[#1A1A1A] transition-all" style={{ width: '36px', height: '36px', padding: '8px', borderRadius: '8px' }}>
                    <Image src="/icons/menu-search.svg" alt="Grid View" width={20} height={20} />
                  </button>
                  <button className="flex items-center justify-center bg-transparent border-none transition-all" style={{ width: '36px', height: '36px', padding: '8px' }}>
                    <Image src="/icons/menu-search2.svg" alt="List View" width={20} height={20} />
                  </button>
                </div>
              </div>

              {/* GRID 2x2 */}
              {currentProperties.length > 0 ? (
                <div className="grid mb-8" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {currentProperties.map((item) => (
                    <PropertyCardSearch key={item.id} property={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-[#868893] mb-4">No properties match your filters</p>
                  <button onClick={handleClearFilters} className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all">Clear Filters</button>
                </div>
              )}

              {/* PAGINATION */}
              {currentProperties.length > 0 && (
                <div className="flex flex-col items-center justify-center gap-6 pt-4 pb-[40px]">
                  <p className="font-hanken text-sm text-[#7C5F93]">
                    Showing <span className="font-bold text-[#1A1A1A]">{startIndex + 1}</span> to <span className="font-bold text-[#1A1A1A]">{Math.min(endIndex, filteredProperties.length)}</span> of <span className="font-bold text-[#1A1A1A]">{filteredProperties.length}</span> properties
                  </p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage === 1} className={`p-2 transition-all border-none bg-transparent outline-none ring-0 ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A] hover:scale-110'}`}>
                      <ChevronLeft size={24} />
                    </button>
                    <div className="flex items-center gap-4">
                      {getPageNumbers().map((page, index) => (
                        <button key={index} onClick={() => typeof page === 'number' && goToPage(page)}
                          className={`min-w-[44px] h-[44px] rounded-[12px] font-hanken font-bold transition-all border-none outline-none ring-0 ${currentPage === page ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md' : 'bg-transparent text-[#868893] hover:text-[#1A1A1A]'}`}>
                          {page}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 transition-all border-none bg-transparent outline-none ring-0 ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A] hover:scale-110'}`}>
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ── DESKTOP LAYOUT (≥1200px) — tidak diubah ───────────────────── */}
        {isDesktop && (
          <div className="max-w-[1440px] mx-auto px-[10%] py-10 mb-[8%]">
            <div className="flex flex-row gap-[40px] items-start relative">

              <section className="w-[45%] flex-shrink-0 sticky top-10">
                <div className="w-full rounded-[24px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]" style={{ height: '930px' }}>
                  <MapProvider properties={memoizedProperties} />
                </div>
              </section>

              <section className="flex-1 min-w-0 flex-col" style={{ maxWidth: "55%" }}>

                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-syne font-bold text-[32px] text-[#1A1A1A]">{filteredProperties.length} Results</h2>
                    {activeFilters && getActiveFilterCount() > 0 && (
                  <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                    <span className="text-sm text-[#000000]">{getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active</span>
                    <button onClick={handleClearFilters} className="text-sm text-[#1A1A1A] underline hover:text-[#bba1f7] transition-colors bg-transparent border-none">Clear all</button>
                  </div>
                )}
                  </div>
                  <div className="flex items-center gap-3 relative" style={{ top: '-32px', right: '0px' }}>
                    <button className="flex items-center justify-center bg-[#F0EBFF] border border-[#1A1A1A] transition-all" style={{ width: '36px', height: '36px', padding: '8px', borderRadius: '8px', gap: '8px' }}>
                      <Image src="/icons/menu-search.svg" alt="Grid View" width={20} height={20} />
                    </button>
                    <button className="flex items-center justify-center bg-transparent border-none transition-all" style={{ width: '36px', height: '36px', padding: '8px', opacity: 1 }}>
                      <Image src="/icons/menu-search2.svg" alt="List View" width={20} height={20} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-[32px] mb-12">
                  {currentProperties.length > 0 ? (
                    currentProperties.map((item) => (<PropertyCardSearch key={item.id} property={item} />))
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-xl text-[#868893] mb-4">No properties match your filters</p>
                      <button onClick={handleClearFilters} className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all">Clear Filters</button>
                    </div>
                  )}
                </div>

                {currentProperties.length > 0 && (
                  <div className="flex flex-col items-center justify-center gap-6 pt-10 pb-[40px]">
                    <p className="font-hanken text-sm text-[#7C5F93]">
                      Showing <span className="font-bold text-[#1A1A1A]">{startIndex + 1}</span> to <span className="font-bold text-[#1A1A1A]">{Math.min(endIndex, filteredProperties.length)}</span> of <span className="font-bold text-[#1A1A1A]">{filteredProperties.length}</span> properties
                    </p>
                    <div className="flex items-center gap-4">
                      <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage === 1} className={`p-2 transition-all border-none bg-transparent outline-none ring-0 ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A] hover:scale-110'}`}>
                        <ChevronLeft size={24} />
                      </button>
                      <div className="flex items-center gap-4">
                        {getPageNumbers().map((page, index) => (
                          <button key={index} onClick={() => typeof page === 'number' && goToPage(page)}
                            className={`min-w-[44px] h-[44px] rounded-[12px] font-hanken font-bold transition-all border-none outline-none ring-0 ${currentPage === page ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md' : 'bg-transparent text-[#868893] hover:text-[#1A1A1A]'}`}>
                            {page}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 transition-all border-none bg-transparent outline-none ring-0 ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A] hover:scale-110'}`}>
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </section>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};