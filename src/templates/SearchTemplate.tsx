"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchPropertiesCard } from "../components/organisms/SearchPropertiesCard";
import { PropertyCardSearch } from "../components/organisms/PropertyCardSearch";
import { Property, PaginationMeta } from "../types/properties";
import { PopupFilter, FilterOptions } from "../components/molecules/PopupFilter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const MapProvider = dynamic(
  () => import("../components/organisms/MapProvider"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-[24px]" />
  }
);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
// ─────────────────────────────────────────────────────────────────────────────

const EMPTY_PAGINATION: PaginationMeta = {
  current_page: 1,
  per_page: 3,
  total_items: 0,
  total_pages: 0,
};

const EMPTY_API_FILTERS = {
  purpose: '',
  category: '',
  bedroom: '',
  bathroom: '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  minFloorArea: '',
  maxFloorArea: '',
};

export const SearchTemplate = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ── API state ─────────────────────────────────────────────────────────
  const [results, setResults] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(EMPTY_PAGINATION);
  const [isLoading, setIsLoading] = useState(false);

  // ── Popup filter state ────────────────────────────────────────────────
  const [apiFilters, setApiFilters] = useState({ ...EMPTY_API_FILTERS });
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);

  // ── Location options ──────────────────────────────────────────────────
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  // ── Responsive ────────────────────────────────────────────────────────
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  React.useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      setWindowWidth(width);
    }
    const handleResize = () => {
      if (typeof window !== 'undefined') setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      if (windowWidth < 768) console.log('🟢 RENDERING: Mobile Layout (<768px)');
      else if (windowWidth >= 768 && windowWidth < 1200) console.log('🟡 RENDERING: Mid-Range Layout (768px - 1199px)');
      else console.log('🔵 RENDERING: Desktop Layout (≥1200px)');
    }
  }, [isMounted, windowWidth]);

  // ── Fetch semua property sekali untuk location dropdown ──
  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/properties?per_page=100`);
        const json = await res.json();
        if (!cancelled) setAllProperties(json.data || []);
      } catch (err) {
        console.error("Error fetching all properties:", err);
      }
    };
    fetchAll();
    return () => { cancelled = true; };
  }, []);

  // ── Derived values ────────────────────────────────────────────────────
  const isSmallMobile = isMounted && windowWidth <= 500;
  const isMobile      = isMounted && windowWidth > 500 && windowWidth < 600;
  const isMidRange    = isMounted && windowWidth >= 600 && windowWidth < 1200;
  const isDesktop     = isMounted && windowWidth >= 1200;
  const itemsPerPage  = isMidRange ? 4 : 3;

  // ── Reset ke page 1 saat filter berubah ───
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams, apiFilters]);

  // ── Fetch hasil search dari API ───
  useEffect(() => {
    let cancelled = false;

    const fetchResults = async () => {
      if (!isMounted) return;
      setIsLoading(true);

      const params = new URLSearchParams();

      const loc  = searchParams.get("loc");
      const prc  = searchParams.get("price");
      const tp   = searchParams.get("type");

      if (loc) params.set("location", loc);
      if (prc && prc !== "Any Price") params.set("price", prc);
      if (tp && tp !== "Any Type") params.set("type", tp);

      if (apiFilters.purpose)       params.set("purpose", apiFilters.purpose);
      if (apiFilters.category)      params.set("category", apiFilters.category);
      if (apiFilters.bedroom)       params.set("bedroom", apiFilters.bedroom);
      if (apiFilters.bathroom)      params.set("bathroom", apiFilters.bathroom);
      if (apiFilters.minPrice)      params.set("min_price", apiFilters.minPrice);
      if (apiFilters.maxPrice)      params.set("max_price", apiFilters.maxPrice);
      if (apiFilters.minYear)       params.set("min_year", apiFilters.minYear);
      if (apiFilters.maxYear)       params.set("max_year", apiFilters.maxYear);
      if (apiFilters.minFloorArea)  params.set("min_floor_area", apiFilters.minFloorArea);  // ← tambahan
      if (apiFilters.maxFloorArea)  params.set("max_floor_area", apiFilters.maxFloorArea);  // ← tambahan

      params.set("page", currentPage.toString());
      params.set("per_page", itemsPerPage.toString());

      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/properties?${params.toString()}`);
        const json = await res.json();
        if (!cancelled) {
          setResults(json.data || []);
          setPagination(json.pagination || EMPTY_PAGINATION);
        }
      } catch (err) {
        if (!cancelled) {
          setResults([]);
          setPagination(EMPTY_PAGINATION);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchResults();
    return () => { cancelled = true; };
  }, [searchParams, apiFilters, currentPage, itemsPerPage, isMounted]);

  const [mapProperties, setMapProperties] = useState<Property[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchMapData = async () => {
      if (!isMounted) return;

      const params = new URLSearchParams();
      const loc  = searchParams.get("loc");
      const prc  = searchParams.get("price");
      const tp   = searchParams.get("type");

      if (loc) params.set("location", loc);
      if (prc && prc !== "Any Price") params.set("price", prc);
      if (tp && tp !== "Any Type") params.set("type", tp);
      if (apiFilters.purpose)       params.set("purpose", apiFilters.purpose);
      if (apiFilters.category)      params.set("category", apiFilters.category);
      if (apiFilters.bedroom)       params.set("bedroom", apiFilters.bedroom);
      if (apiFilters.bathroom)      params.set("bathroom", apiFilters.bathroom);
      if (apiFilters.minPrice)      params.set("min_price", apiFilters.minPrice);
      if (apiFilters.maxPrice)      params.set("max_price", apiFilters.maxPrice);
      if (apiFilters.minYear)       params.set("min_year", apiFilters.minYear);
      if (apiFilters.maxYear)       params.set("max_year", apiFilters.maxYear);
      if (apiFilters.minFloorArea)  params.set("min_floor_area", apiFilters.minFloorArea);
      if (apiFilters.maxFloorArea)  params.set("max_floor_area", apiFilters.maxFloorArea);
      params.set("per_page", "100");

      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/properties?${params.toString()}`);
        const json = await res.json();
        if (!cancelled) setMapProperties(json.data || []);
      } catch (err) {
        if (!cancelled) setMapProperties([]);
      }
    };

    fetchMapData();
    return () => { cancelled = true; };
  }, [searchParams, apiFilters, isMounted]);

  const memoizedProperties = useMemo(() => mapProperties, [mapProperties]);

  // ── Callback dari SearchPropertiesCard ───
  const handleSearch = useCallback(() => {
  }, []);

  // ── Popup filter ───
  const handleApplyFilter = (filters: FilterOptions) => {
    setActiveFilters(filters);

    let purpose = '';
    if (filters.status === 'Sale') purpose = 'for_sale';
    else if (filters.status === 'Rent') purpose = 'for_rent';

    const category = filters.category !== 'Category' ? filters.category : '';

    let bedroom = '';
    const bedMatch = filters.bedrooms.match(/(\d+)/);
    if (bedMatch) bedroom = bedMatch[1];

    let bathroom = '';
    const bathMatch = filters.bathrooms.match(/(\d+)/);
    if (bathMatch) bathroom = bathMatch[1];

    let minPrice = '';
    let maxPrice = '';
    if (filters.priceRange !== 'Select') {
      const rangeMatch = filters.priceRange.match(/\$?([\d,]+)\s*[-–—]\s*\$?([\d,]+)/);
      if (rangeMatch) {
        minPrice = rangeMatch[1].replace(/,/g, '');
        maxPrice = rangeMatch[2].replace(/,/g, '');
      } else {
        const numMatch = filters.priceRange.match(/\$?([\d,]+)/);
        if (numMatch) minPrice = numMatch[1].replace(/,/g, '');
      }
    }

    const minYear = filters.minYear !== 'Min Year' ? filters.minYear : '';
    const maxYear = filters.maxYear !== 'Max Year' ? filters.maxYear : '';

    const minFloorArea = filters.minFloorArea !== 'Min Area' ? filters.minFloorArea : '';
    const maxFloorArea = filters.maxFloorArea !== 'Max Area' ? filters.maxFloorArea : '';

    setApiFilters({
      purpose,
      category,
      bedroom,
      bathroom,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minFloorArea,
      maxFloorArea,
    });
  };

  const handleClearFilters = () => {
    setActiveFilters(null);
    setApiFilters({ ...EMPTY_API_FILTERS });
    router.replace('/search', { scroll: false });
  };

  // ── Pagination (dari API) ──
  const totalPages = pagination.total_pages;
  const startIndex = (pagination.current_page - 1) * pagination.per_page;
  const endIndex   = Math.min(startIndex + pagination.per_page, pagination.total_items);
  const cardsKey   = results.map((p) => p.id).join("-");

  const goToPage = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('results-start');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [];
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    if (currentPage > 2) pages.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const getActiveFilterCount = () => {
    if (!activeFilters) return 0;
    let count = 0;
    if (activeFilters.status !== 'Sale') count++;
    if (activeFilters.category !== 'Category') count++;
    if (activeFilters.bedrooms !== 'Select') count++;
    if (activeFilters.bathrooms !== 'Select') count++;
    if (activeFilters.priceRange !== 'Select') count++;
    if (activeFilters.minYear !== 'Min Year') count++;
    if (activeFilters.maxYear !== 'Max Year') count++;
    if (activeFilters.minFloorArea && activeFilters.minFloorArea !== 'Min Area') count++;
    if (activeFilters.maxFloorArea && activeFilters.maxFloorArea !== 'Max Area') count++;
    return count;
  };

  const CardSkeleton = () => (
    <div className="w-full rounded-[15px] bg-gray-100 animate-pulse" style={{ height: isDesktop ? "200px" : "220px" }} />
  );

  return (
    <div className="w-full flex flex-col bg-[#FBFAFF]">

      {/* ═══════════════════════════════════════════════════════════════════
          HEADER & SEARCH BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="w-full pt-8 pb-8 md:pt-16 md:pb-12 bg-white border-[#E8E1FF]/50 mb-6 md:mb-10 lg:mb-16">

        {/* ── SMALL MOBILE LAYOUT (≤500px) ────────────────────────────────── */}
        {isSmallMobile && (
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full box-border px-[16px] pb-8 flex flex-col gap-4"
          >
            <h1 className="font-syne font-bold text-[clamp(28px,8vw,40px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">Search Properties</h1>
            <SearchPropertiesCard onSearch={handleSearch} properties={allProperties} />
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex items-center justify-center hover:bg-[#DBCBFF] transition-all relative" style={{ height: "52px", marginTop: "8px", marginBottom: "8px" }}>
              <div className="flex items-center justify-center gap-3 pointer-events-none">
                <Image src="/icons/candle.svg" alt="Filter" width={18} height={18} />
                <span className="font-hanken font-bold text-[13px]">More Filter</span>
              </div>
            </button>
          </motion.div>
        )}

        {/* ── MOBILE LAYOUT (501px - 767px) ───────────────────────────────── */}
        {isMobile && (
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[1440px] mb-[3%] mx-auto px-[20px] flex flex-col gap-6"
          >
            <h1 className="font-syne font-bold text-[clamp(32px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">Search Properties</h1>
            <SearchPropertiesCard onSearch={handleSearch} properties={allProperties} />
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex items-center justify-center hover:bg-[#DBCBFF] transition-all relative" style={{ height: "58px", paddingTop: "20px", paddingBottom: "20px", paddingLeft: "32px", paddingRight: "32px", marginTop: "16px" }}>
              <div className="flex items-center justify-center gap-3 pointer-events-none">
                <Image src="/icons/candle.svg" alt="Filter" width={20} height={20} />
                <span className="font-hanken font-bold text-[14px]">More Filter</span>
              </div>
            </button>
          </motion.div>
        )}

        {/* ── MID-RANGE LAYOUT (768px - 1199px) ─────────────────────────── */}
        {isMidRange && (
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[1440px] mx-auto flex flex-col gap-8" style={{ paddingLeft: '7.5%', paddingRight: '7.5%', paddingBottom: '80px' }}
          >
            <h1 className="font-syne font-bold text-[clamp(32px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">Search Properties</h1>
            <div className="flex items-stretch w-full gap-[16px]">
              <div style={{ width: '75%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <SearchPropertiesCard onSearch={handleSearch} properties={allProperties} />
              </div>
              <div style={{ width: '10%' }} className="flex-shrink-0" />
              <div className="relative flex-shrink-0" style={{ width: '20%' }}>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full h-full bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex flex-col items-center justify-center hover:bg-[#DBCBFF] transition-all relative">
                  <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <Image src="/icons/candle.svg" alt="Filter" width={28} height={28} />
                    <span className="font-hanken font-bold text-[16px] text-[#1A1A1A]">More Filter</span>
                  </div>
                </button>
                {isFilterOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '441px', zIndex: 200, filter: 'drop-shadow(0px 20px 50px rgba(0,0,0,0.15))' }}>
                    <PopupFilter onClose={() => setIsFilterOpen(false)} onApplyFilter={handleApplyFilter} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── DESKTOP LAYOUT (≥1200px) ───────────────────── */}
        {isDesktop && (
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[1440px] mb-[3%] mx-auto px-[60px] max-[1300px]:px-[40px] flex flex-col gap-10"
          >
            <h1 className="font-syne font-bold text-[clamp(32px,5vw,64px)] leading-tight tracking-[-0.04em] text-[#1A1A1A]">Search Properties</h1>
            <div className="flex items-center w-full gap-[5%]">
              <div className="flex-1 min-w-0">
                <SearchPropertiesCard onSearch={handleSearch} properties={allProperties} />
              </div>
              <div className="relative flex justify-end flex-shrink-0" style={{ marginLeft: "24px" }}>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-[#E7DCFF] border border-[#E8E1FF] rounded-[15px] flex flex-col items-center justify-center hover:bg-[#DBCBFF] transition-all relative z-[101]" style={{ width: "120px", height: "96px" }}>
                  <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <Image src="/icons/candle.svg" alt="Filter" width={24} height={24} />
                    <span className="font-hanken font-bold text-[14px]">More Filter</span>
                  </div>
                </button>
                {isFilterOpen && (
                  <div className="absolute top-[110%] right-0 z-[100]" style={{ width: '441px', filter: 'drop-shadow(0px 20px 50px rgba(0,0,0,0.1))' }}>
                    <PopupFilter onClose={() => { setIsFilterOpen(false); }} onApplyFilter={handleApplyFilter} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* ── SMALL MOBILE FILTER POPUP ─────────────────────────────────── */}
      {isSmallMobile && isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-end justify-center p-0">
          <div className="w-full max-w-[500px]">
            <PopupFilter onClose={() => setIsFilterOpen(false)} onApplyFilter={handleApplyFilter} />
          </div>
        </div>
      )}

      {/* ── MOBILE FILTER POPUP ──────────────────────────────────────── */}
      {isMobile && isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="w-full max-w-[441px]">
            <PopupFilter onClose={() => setIsFilterOpen(false)} onApplyFilter={handleApplyFilter} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN CONTENT: MAP + PROPERTY LIST
      ═══════════════════════════════════════════════════════════════════ */}
      <div id="results-start" className="w-full overflow-x-hidden">

        {/* ── SMALL MOBILE LAYOUT (≤500px) ──────────────────────────────── */}
        {isSmallMobile && (
          <div className="mx-auto px-[16px] pt-6 pb-8 mb-[8%]">
            <div className="flex flex-col gap-5">
              <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full">
                <div className="w-full rounded-[15px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]" style={{ height: '280px' }}>
                  <MapProvider properties={memoizedProperties} />
                </div>
              </motion.section>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col gap-2">
                <h2 className="font-syne font-bold text-[20px] text-[#1A1A1A]">{pagination.total_items} Results</h2>
                {activeFilters && getActiveFilterCount() > 0 && (
                  <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                    <span className="text-sm text-[#000000]">{getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active</span>
                    <button onClick={handleClearFilters} className="text-sm text-[#1A1A1A] underline hover:text-[#bba1f7] transition-colors bg-transparent border-none">Clear all</button>
                  </div>
                )}
              </motion.div>
              {isLoading ? (
                <div className="flex flex-col gap-[20px]">
                  <CardSkeleton /><CardSkeleton /><CardSkeleton />
                </div>
              ) : results.length > 0 ? (
                <motion.div 
                  key={cardsKey} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={staggerContainer} 
                  className="flex flex-col gap-[20px]"
                >
                  {results.map((item) => (
                    <motion.div key={item.id} variants={staggerItem}><PropertyCardSearch property={item} /></motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-base text-[#868893] mb-4">No properties match your filters</p>
                  <button onClick={handleClearFilters} className="px-5 py-2 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all">Clear Filters</button>
                </div>
              )}
              {results.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center justify-center gap-3 pt-4 pb-8">
                  <p className="font-hanken text-xs text-[#7C5F93] text-center">
                    Showing <span className="font-bold text-[#1A1A1A]">{pagination.total_items > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-[#1A1A1A]">{endIndex}</span> of <span className="font-bold text-[#1A1A1A]">{pagination.total_items}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage === 1} className={`p-2 transition-all border-none bg-transparent ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}><ChevronLeft size={18} /></button>
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        <button key={index} onClick={() => typeof page === 'number' && goToPage(page)} className={`min-w-[32px] h-[32px] rounded-[8px] font-hanken font-bold transition-all border-none text-xs ${currentPage === page ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md' : 'bg-transparent text-[#868893]'}`}>{page}</button>
                      ))}
                    </div>
                    <button onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 transition-all border-none bg-transparent ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}><ChevronRight size={18} /></button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ── MOBILE LAYOUT (501px - 767px) ───────────────────────────────── */}
        {isMobile && (
          <div className="max-w-[1440px] mx-auto px-[20px] py-10 mb-[8%]">
            <div className="flex flex-col gap-6">
              <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full">
                <div className="w-full rounded-[15px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]" style={{ height: '409px' }}><MapProvider properties={memoizedProperties} /></div>
              </motion.section>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col gap-2">
                <h2 className="font-syne font-bold text-[24px] text-[#1A1A1A]">{pagination.total_items} Results</h2>
                {activeFilters && getActiveFilterCount() > 0 && (
                  <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                    <span className="text-sm text-[#000000]">{getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active</span>
                    <button onClick={handleClearFilters} className="text-sm text-[#1A1A1A] underline hover:text-[#bba1f7] transition-colors bg-transparent border-none">Clear all</button>
                  </div>
                )}
              </motion.div>
              {isLoading ? (
                <div className="flex flex-col gap-[24px]"><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>
              ) : results.length > 0 ? (
                <motion.div 
                  key={cardsKey} 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                  className="flex flex-col gap-[24px]"
                >
                  {results.map((item) => (<motion.div key={item.id} variants={staggerItem}><PropertyCardSearch property={item} /></motion.div>))}
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-[#868893] mb-4">No properties match your filters</p>
                  <button onClick={handleClearFilters} className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all">Clear Filters</button>
                </div>
              )}
              {results.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center justify-center gap-4 pt-6 pb-10">
                  <p className="font-hanken text-sm text-[#7C5F93] text-center">
                    Showing <span className="font-bold text-[#1A1A1A]">{pagination.total_items > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-[#1A1A1A]">{endIndex}</span> of <span className="font-bold text-[#1A1A1A]">{pagination.total_items}</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage === 1} className={`p-2 transition-all border-none bg-transparent ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}><ChevronLeft size={20} /></button>
                    <div className="flex items-center gap-2">
                      {getPageNumbers().map((page, index) => (
                        <button key={index} onClick={() => typeof page === 'number' && goToPage(page)} className={`min-w-[36px] h-[36px] rounded-[10px] font-hanken font-bold transition-all border-none text-sm ${currentPage === page ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md' : 'bg-transparent text-[#868893]'}`}>{page}</button>
                      ))}
                    </div>
                    <button onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 transition-all border-none bg-transparent ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A]'}`}><ChevronRight size={20} /></button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ── MID-RANGE LAYOUT (768px - 1199px) ─────────────────────────── */}
        {isMidRange && (
          <div className="max-w-[1440px] mx-auto py-10 mb-[8%]" style={{ paddingLeft: '7.5%', paddingRight: '7.5%' }}>
            <div className="flex flex-col gap-8">
              <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full">
                <div className="w-full rounded-[24px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]" style={{ height: '400px' }}><MapProvider properties={memoizedProperties} /></div>
              </motion.section>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <h2 className="font-syne font-bold text-[28px] text-[#1A1A1A]">{pagination.total_items} Results</h2>
                  {activeFilters && getActiveFilterCount() > 0 && (
                    <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                      <span className="text-sm text-[#000000]">{getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active</span>
                      <button onClick={handleClearFilters} className="text-sm text-[#1A1A1A] underline hover:text-[#bba1f7] transition-colors bg-transparent border-none">Clear all</button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center justify-center bg-[#F0EBFF] border border-[#1A1A1A] transition-all" style={{ width: '36px', height: '36px', padding: '8px', borderRadius: '8px' }}><Image src="/icons/menu-search.svg" alt="Grid View" width={20} height={20} /></button>
                  <button className="flex items-center justify-center bg-transparent border-none transition-all" style={{ width: '36px', height: '36px', padding: '8px' }}><Image src="/icons/menu-search2.svg" alt="List View" width={20} height={20} /></button>
                </div>
              </motion.div>
              {isLoading ? (
                <div className="grid mb-8" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>
              ) : results.length > 0 ? (
                <motion.div 
                  key={cardsKey} 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                  className="grid mb-8" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}
                >
                  {results.map((item) => (<motion.div key={item.id} variants={staggerItem}><PropertyCardSearch property={item} /></motion.div>))}
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-[#868893] mb-4">No properties match your filters</p>
                  <button onClick={handleClearFilters} className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all">Clear Filters</button>
                </div>
              )}
              {results.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center justify-center gap-6 pt-4 pb-[40px]">
                  <p className="font-hanken text-sm text-[#7C5F93]">
                    Showing <span className="font-bold text-[#1A1A1A]">{pagination.total_items > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-[#1A1A1A]">{endIndex}</span> of <span className="font-bold text-[#1A1A1A]">{pagination.total_items}</span> properties
                  </p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage === 1} className={`p-2 transition-all border-none bg-transparent outline-none ring-0 ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A] hover:scale-110'}`}><ChevronLeft size={24} /></button>
                    <div className="flex items-center gap-4">
                      {getPageNumbers().map((page, index) => (
                        <button key={index} onClick={() => typeof page === 'number' && goToPage(page)} className={`min-w-[44px] h-[44px] rounded-[12px] font-hanken font-bold transition-all border-none outline-none ring-0 ${currentPage === page ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md' : 'bg-transparent text-[#868893] hover:text-[#1A1A1A]'}`}>{page}</button>
                      ))}
                    </div>
                    <button onClick={() => currentPage < totalPages && goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 transition-all border-none bg-transparent outline-none ring-0 ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#1A1A1A] hover:scale-110'}`}><ChevronRight size={24} /></button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ── DESKTOP LAYOUT (≥1200px) */}
        {isDesktop && (
          <div className="max-w-[1440px] mx-auto px-[60px] max-[1300px]:px-[40px] py-10 mb-[8%]">
            <div className="flex flex-row gap-[40px] max-[1300px]:gap-[24px] items-start relative">
              <motion.section 
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                transition={{ ...fadeInUp, delay: 0.2 }} 
                className="w-[45%] max-[1300px]:w-[40%] flex-shrink-0 sticky top-10"
              >
                <div className="w-full rounded-[24px] overflow-hidden shadow-sm bg-white border border-[#E8E1FF]" style={{ height: '930px' }}>
                  <MapProvider properties={memoizedProperties} />
                </div>
              </motion.section>
              <section className="flex-1 min-w-0 flex-col">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex justify-between items-end mb-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-syne font-bold text-[32px] text-[#1A1A1A]">{pagination.total_items} Results</h2>
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
                </motion.div>
                {isLoading ? (
                  <div className="flex flex-col gap-[32px] mb-12"><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>
                ) : results.length > 0 ? (
                  <motion.div
                    key={cardsKey}
                    className="flex flex-col gap-[32px] mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    {results.map((item) => (
                      <motion.div key={item.id} variants={staggerItem}>
                        <PropertyCardSearch property={item} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-xl text-[#868893] mb-4">No properties match your filters</p>
                    <button onClick={handleClearFilters} className="px-6 py-3 bg-[#1A1A1A] text-white rounded-[12px] hover:bg-[#000000] transition-all">Clear Filters</button>
                  </div>
                )}
                {results.length > 0 && (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center justify-center gap-6 pt-10 pb-[40px]">
                    <p className="font-hanken text-sm text-[#7C5F93]">
                      Showing <span className="font-bold text-[#1A1A1A]">{pagination.total_items > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-[#1A1A1A]">{endIndex}</span> of <span className="font-bold text-[#1A1A1A]">{pagination.total_items}</span> properties
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
                            className={`min-w-[44px] h-[44px] rounded-[12px] font-hanken font-bold transition-all border-none outline-none ring-0 ${currentPage === page ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-md' : 'bg-transparent text-[#868893] hover:text-[#1A1A1A]'}`}
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
                  </motion.div>
                )}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};