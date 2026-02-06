import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';

interface PopupFilterProps {
  onClose?: () => void;
}

export const PopupFilter = ({ onClose }: PopupFilterProps) => {
  return (
    <div 
      className="bg-white shadow-2xl flex flex-col border border-[#E8E1FF] z-50 animate-in fade-in zoom-in duration-200"
      style={{ 
        width: '441px', 
        height: '664px', 
        padding: '24px', 
        borderRadius: '15px', 
        gap: '24px' 
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-syne font-bold text-[24px] text-[#1A1A1A]">More Filter</h3>
        <button onClick={onClose} className="text-[#868893] hover:text-black transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* STATUS TOGGLE (For Sale / For Rent) */}
      <div className="flex bg-[#F7F5FF] p-2 rounded-[12px] w-full">
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-3 rounded-[10px] font-hanken font-bold text-[16px]">
          For Sale
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-[#868893] py-3 rounded-[10px] font-hanken font-bold text-[16px]">
          <Image src="/icons/house-icon.svg" alt="Rent" width={20} height={20} className="opacity-50" />
          For Rent
        </button>
      </div>

      {/* CATEGORY DROPDOWN */}
      <div className="flex flex-col gap-2">
        <label className="font-hanken font-bold text-[16px] text-[#1A1A1A]">Category</label>
        <div className="relative w-full">
          <select className="w-full h-[56px] px-4 bg-white border border-[#E8E1FF] rounded-[12px] appearance-none font-hanken text-[#868893] focus:outline-none focus:border-[#1A1A1A]">
            <option>Category</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]" size={20} />
        </div>
      </div>

      {/* BEDROOMS & BATHROOMS ROW */}
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-2 relative">
          <label className="font-hanken font-bold text-[16px] text-[#1A1A1A]">Bedrooms</label>
          <div className="relative w-full">
            <div className="w-full h-[56px] flex items-center px-4 bg-white border border-[#E8E1FF] rounded-[12px] font-hanken text-[#868893]">
              Select
            </div>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]" size={20} />
          </div>

          {/* SIMULASI DROPDOWN YANG TERBUKA (Seperti di gambar) */}
          <div className="absolute top-[90px] left-0 w-full bg-white shadow-xl rounded-[12px] border border-[#E8E1FF] overflow-hidden z-10">
            <div className="px-4 py-3 bg-[#1A1A1A] text-white font-hanken font-bold flex justify-between items-center cursor-pointer">
              2 beds
              <span className="text-[12px]">☝️</span>
            </div>
            <div className="px-4 py-3 hover:bg-[#F7F5FF] text-[#1A1A1A] font-hanken cursor-pointer">3 beds</div>
            <div className="px-4 py-3 hover:bg-[#F7F5FF] text-[#1A1A1A] font-hanken cursor-pointer">4 beds</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label className="font-hanken font-bold text-[16px] text-[#1A1A1A]">Bathrooms</label>
          <div className="relative w-full">
            <select className="w-full h-[56px] px-4 bg-white border border-[#E8E1FF] rounded-[12px] appearance-none font-hanken text-[#868893] focus:outline-none">
              <option>Select</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]" size={20} />
          </div>
        </div>
      </div>

      {/* YEAR RANGE ROW */}
      <div className="flex gap-4 mt-auto">
        <div className="flex-1">
          <div className="relative w-full">
            <select className="w-full h-[56px] px-4 bg-[#F7F5FF] border border-transparent rounded-[12px] appearance-none font-hanken text-[#868893] focus:outline-none">
              <option>Min Year</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]" size={20} />
          </div>
        </div>
        <div className="flex-1">
          <div className="relative w-full">
            <select className="w-full h-[56px] px-4 bg-white border border-[#E8E1FF] rounded-[12px] appearance-none font-hanken text-[#868893] focus:outline-none">
              <option>Max Year</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]" size={20} />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-4">
        <button 
          onClick={onClose}
          className="flex-1 h-[60px] flex items-center justify-center gap-2 bg-[#F7F5FF] text-[#1A1A1A] rounded-[12px] font-hanken font-bold"
        >
          <Image src="/icons/cancel-icon.svg" alt="Cancel" width={20} height={20} />
          Cancel
        </button>
        <button className="flex-1 h-[60px] bg-[#1A1A1A] text-white rounded-[12px] font-hanken font-bold hover:bg-black transition-all">
          Apply Filter
        </button>
      </div>
    </div>
  );
};