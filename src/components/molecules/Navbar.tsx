"use client";

import React, { useState } from "react";
import { Logo, NavLink, Button } from "../atoms";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full h-[100px] bg-white relative z-[100]">
      <div className="max-w-[1440px] mx-auto h-full px-[140px] max-[1400px]:px-[80px] max-lg:px-[60px] max-md:px-[40px] max-sm:px-[24px] flex items-center justify-between">
        
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <div className="hidden min-[901px]:flex items-center gap-[48px] absolute left-1/2 -translate-x-1/2">
          <NavLink href="#" label="Home" />
          <NavLink href="#" label="Properties" />
          <NavLink href="#" label="Agents" />
          <NavLink href="#" label="Pages" hasDropdown />
        </div>

        <div className="flex items-center justify-end">
          <div className="hidden min-[901px]:block">
            <Button 
              variant="outline" 
              className="w-[145px] h-[52px] rounded-xl border border-black text-black hover:bg-black hover:text-white transition-all font-medium"
            >
              Contact Us
            </Button>
          </div>

          <button 
            className="min-[901px]:hidden flex p-0 text-black items-center justify-center transition-transform active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-white border-b border-gray-100 flex flex-col p-6 gap-6 min-[901px]:hidden shadow-2xl">
          <NavLink href="#" label="Home" />
          <NavLink href="#" label="Properties" />
          <NavLink href="#" label="Agents" />
          <NavLink href="#" label="Pages" />
          
          <div className="pt-4 border-t border-gray-100">
            <Button variant="outline" className="w-full h-[52px] border-black text-black rounded-xl">
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};