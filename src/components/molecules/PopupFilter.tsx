import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';

interface PopupFilterProps {
  onClose?: () => void;
  designTypes?: string[]; // Array of unique design types from properties
  onApplyFilter?: (filters: FilterOptions) => void; // Callback to parent with filter values
}

export interface FilterOptions {
  status: 'Sale' | 'Rent';
  category: string;
  bedrooms: string;
  bathrooms: string;
  priceRange: string;
  minYear: string;
  maxYear: string;
}

export const PopupFilter = ({ onClose, designTypes = ['Modern Loft', 'Contemporary', 'Traditional', 'Victorian'], onApplyFilter }: PopupFilterProps) => {
  const [selectedStatus, setSelectedStatus] = useState('Sale');
  
  // Dropdown states
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedBed, setSelectedBed] = useState('Select');
  const [selectedBath, setSelectedBath] = useState('Select');
  const [selectedPrice, setSelectedPrice] = useState('Select');
  const [selectedMinYear, setSelectedMinYear] = useState('Min Year');
  const [selectedMaxYear, setSelectedMaxYear] = useState('Max Year');
  
  // Open/close states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBedOpen, setIsBedOpen] = useState(false);
  const [isBathOpen, setIsBathOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isMinYearOpen, setIsMinYearOpen] = useState(false);
  const [isMaxYearOpen, setIsMaxYearOpen] = useState(false);

  // Options
  const bedroomOptions = ['2 beds', '3 beds', '4 beds'];
  const bathroomOptions = ['1 bath', '2 bath', '3 bath'];
  const yearOptions = ['2020', '2021', '2022', '2023', '2024', '2025'];
  
  // Price options based on status
  const priceOptionsRent = [
    { label: 'Low ($1,500 - $3,000)', value: 'low' },
    { label: 'Mid ($3,000 - $5,000)', value: 'mid' },
    { label: 'High ($5,000+)', value: 'high' }
  ];
  
  const priceOptionsSale = [
    { label: 'Low ($9,000 - $10,000)', value: 'low' },
    { label: 'Mid ($10,000 - $12,000)', value: 'mid' },
    { label: 'High ($12,000 - $15,000+)', value: 'high' }
  ];
  
  const currentPriceOptions = selectedStatus === 'Rent' ? priceOptionsRent : priceOptionsSale;

  // Reusable Dropdown Component
  const CustomDropdown = ({ 
    label, 
    value, 
    options, 
    isOpen, 
    setIsOpen, 
    setValue,
    width = "100%"
  }: {
    label: string; 
    value: string; 
    options: string[] | { label: string; value: string }[]; 
    isOpen: boolean; 
    setIsOpen: (open: boolean) => void; 
    setValue: (val: string) => void;
    width?: string;
  }) => {
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-[10px] relative" style={{ width }}> 
        <label className="font-hanken font-bold text-[16px] text-[#1A1A1A]">{label}</label>
        <div 
          className="relative flex items-center cursor-pointer bg-[#FFFFFF]" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            width: '100%',
            height: '50px', 
            borderRadius: '15px', 
            padding: '12px 16px',
            boxSizing: 'border-box',
            border: '1px solid #E8E1FF'
          }}
        >
          <span className="font-hanken text-[#868893] ml-[10px]">{value}</span>
          <ChevronDown className="ml-auto" style={{ marginRight: '4px', color: '#1A1A1A' }} size={20} />
          
          {isOpen && (
            <div 
              className="absolute left-[0px] w-full bg-[#FFFFFF] shadow-xl rounded-[15px] border border-[#E8E1FF] z-20"
              style={{
                top: '90px',
                paddingTop: '16px',
                paddingBottom: '16px',
                gap: '8px',
                display: 'flex',
                
                flexDirection: 'column'
                
              }}
            >
              {options.map((opt) => {
                const optionValue = typeof opt === 'string' ? opt : opt.label;
                const isSelected = value === optionValue;
                const isHovered = hoveredOption === optionValue;
                
                // Check if there's any selected value (not default placeholder)
                const hasSelectedValue = value !== 'Select' && value !== 'Category' && value !== 'Min Year' && value !== 'Max Year';
                
                // Determine background and text color based on state
                let bgColor = '';
                let textColor = 'text-[#1A1A1A]';
                
                if (isSelected) {
                  // Selected item → always black bg, white text (even when hovered)
                  bgColor = 'bg-[#1A1A1A]';
                  textColor = 'text-[#FFFFFF]';
                } else if (!isSelected && isHovered && hasSelectedValue) {
                  // Non-selected item being hovered + ada item yang selected → Violet bg, white text
                  bgColor = 'bg-[#E7DCFF]';
                  textColor = 'text-[#FFFFFF]';
                } else if (!isSelected && isHovered && !hasSelectedValue) {
                  // Non-selected item being hovered + ga ada yang selected → Black bg, white text
                  bgColor = 'bg-[#1A1A1A]';
                  textColor = 'text-[#FFFFFF]';
                } else {
                  // Non-selected, not hovered → White bg, black text
                  bgColor = '';
                  textColor = 'text-[#1A1A1A]';
                }
                
                return (
                  <div
                    key={optionValue}
                    onClick={(e) => { 
                      e.stopPropagation();
                      setValue(optionValue); 
                      setIsOpen(false); 
                    }}
                    onMouseEnter={() => setHoveredOption(optionValue)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`font-hanken cursor-pointer transition-colors ${bgColor} ${textColor}`}
                    style={{
                      height: '36px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {optionValue}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-[#FFFFFF] shadow-2xl flex flex-col border border-[#E8E1FF] z-50 animate-in fade-in zoom-in duration-200"
      style={{
        width: '441px',
        height: 'auto',
        padding: '24px',
        
        borderRadius: '15px',
        gap: '24px',
        position: 'relative'
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-syne font-bold text-[24px] text-[#1A1A1A]">More Filter</h3>
        <button onClick={onClose} className="bg-transparent border-none text-[#868893] hover:text-black transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* STATUS TOGGLE (VIOLET BOX BACKGROUND) */}
      <div 
  className="flex items-center justify-between bg-[#F7F5FF]" // Menggunakan justify-between
  style={{
    width: '430px', // Mengikuti lebar field agar konsisten dengan box di bawahnya
    height: '64px',
    borderRadius: '15px',
    padding: '6px', // Jarak tepi (ini yang membuat jarak ke tepi start dan end sama)
  }}
>
  <button 
    onClick={() => setSelectedStatus('Sale')}
    className="flex items-center justify-center font-hanken font-bold text-[16px] transition-all"
    style={{
      flex: 1, // Agar lebar tombol fleksibel
      height: '52px',
      borderRadius: '15px',
      backgroundColor: selectedStatus === 'Sale' ? '#1A1A1A' : 'transparent',
      color: selectedStatus === 'Sale' ? '#FFFFFF' : '#1A1A1A',
      marginRight: '3px' // Setengah dari total gap (total gap 6px agar sama dengan padding)
    }}
  >
    For Sale
  </button>
  
  <button 
    onClick={() => setSelectedStatus('Rent')}
    className="flex items-center justify-center gap-[8px] font-hanken font-bold text-[16px] transition-all"
    style={{
      flex: 1,
      height: '52px',
      borderRadius: '15px',
      backgroundColor: selectedStatus === 'Rent' ? '#1A1A1A' : 'transparent',
      color: selectedStatus === 'Rent' ? '#FFFFFF' : '#1A1A1A',
      marginLeft: '3px'
    }}
  >
    <Image src="/icons/gallery.svg" alt="Rent" width={20} height={20} className={selectedStatus === 'Rent' ? '' : 'opacity-50'} />
    For Rent
  </button>
</div>

      {/* CATEGORY FIELD (Full Width) */}
      <CustomDropdown
        label="Category"
        value={selectedCategory}
        options={designTypes}
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
        setValue={setSelectedCategory}
        width="100%"
      />

      {/* BEDROOMS & BATHROOMS ROW */}
      <div className="flex gap-[20px] w-full">
        <CustomDropdown
          label="Bedrooms"
          value={selectedBed}
          options={bedroomOptions}
          isOpen={isBedOpen}
          setIsOpen={setIsBedOpen}
          setValue={setSelectedBed}
          width="calc(50% - 10px)"
        />
        <CustomDropdown
          label="Bathrooms"
          value={selectedBath}
          options={bathroomOptions}
          isOpen={isBathOpen}
          setIsOpen={setIsBathOpen}
          setValue={setSelectedBath}
          width="calc(50% - 10px)"
        />
      </div>

      {/* PRICE FIELD (Full Width) */}
      <CustomDropdown
        label="Price Range"
        value={selectedPrice}
        options={currentPriceOptions}
        isOpen={isPriceOpen}
        setIsOpen={setIsPriceOpen}
        setValue={setSelectedPrice}
        width="100%"
      />

      {/* YEAR RANGE ROW */}
      <div className="flex gap-[20px] w-full">
        <CustomDropdown
          label="Min Year"
          value={selectedMinYear}
          options={yearOptions}
          isOpen={isMinYearOpen}
          setIsOpen={setIsMinYearOpen}
          setValue={setSelectedMinYear}
          width="calc(50% - 10px)"
        />
        <CustomDropdown
          label="Max Year"
          value={selectedMaxYear}
          options={yearOptions}
          isOpen={isMaxYearOpen}
          setIsOpen={setIsMaxYearOpen}
          setValue={setSelectedMaxYear}
          width="calc(50% - 10px)"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-[15px] mt-4">
        <button
          onClick={() => {
            // Reset all filters to default
            setSelectedStatus('Sale');
            setSelectedCategory('Category');
            setSelectedBed('Select');
            setSelectedBath('Select');
            setSelectedPrice('Select');
            setSelectedMinYear('Min Year');
            setSelectedMaxYear('Max Year');
          }}
          className="flex-1 h-[60px] flex items-center justify-center gap-2 bg-[#F7F5FF] text-[#1A1A1A] rounded-[12px] font-hanken font-bold hover:bg-[#E7DCFF] transition-all"
        >
          <Image src="/icons/gallery.svg" alt="Cancel" width={20} height={20} />
          Cancel
        </button>
        <button 
          onClick={() => {
            // Prepare filter data
            const filters: FilterOptions = {
              status: selectedStatus as 'Sale' | 'Rent',
              category: selectedCategory,
              bedrooms: selectedBed,
              bathrooms: selectedBath,
              priceRange: selectedPrice,
              minYear: selectedMinYear,
              maxYear: selectedMaxYear
            };
            
            // Call parent callback with filter data
            if (onApplyFilter) {
              onApplyFilter(filters);
            }
            
            // Close popup
            if (onClose) {
              onClose();
            }
          }}
          className="flex-1 h-[60px] bg-[#1A1A1A] text-[#FFFFFF] rounded-[12px] font-hanken font-bold hover:bg-[#000000] transition-all"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};
