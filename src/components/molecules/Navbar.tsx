"use client";
import React, { useState } from "react";
import { Logo, NavLink, Button } from "../atoms";
import { Menu, X } from "lucide-react";
import { Container } from "../atoms/Container";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full h-[100px] bg-white relative z-[100]">
      <Container className="h-full flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Menu - Menggunakan gap-12 (48px) agar sangat lega */}
        <div className="hidden min-[901px]:flex items-center justify-center gap-12 flex-1">
          <NavLink href="#" label="Home" />
          <NavLink href="#" label="Properties" />
          <NavLink href="#" label="Agents" />
          <NavLink href="#" label="Pages" hasDropdown />
        </div>

        {/* Right Section */}
        <div className="flex items-center flex-shrink-0">
          <div className="hidden min-[901px]:block">
            <Button 
              variant="outline" 
              className="w-[145px] h-[52px] rounded-xl border border-black text-black hover:bg-black hover:text-white transition-all font-medium"
            >
              Contact Us
            </Button>
          </div>

          <button 
            className="min-[901px]:hidden flex p-2 text-black items-center justify-center transition-transform active:scale-95 bg-transparent border-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} strokeWidth={2} /> : <Menu size={32} strokeWidth={2} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-white border-b border-gray-100 min-[901px]:hidden shadow-xl">
          <Container className="py-6">
            <div className="flex flex-col gap-6">
              <NavLink href="#" label="Home" />
              <NavLink href="#" label="Properties" />
              <NavLink href="#" label="Agents" />
              <NavLink href="#" label="Pages" />
              <div className="pt-4 border-t border-gray-100">
                <Button className="w-full h-[52px] border-black text-black rounded-xl">
                  Contact Us
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
};