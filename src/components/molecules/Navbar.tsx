"use client";
import React, { useState } from "react";
import { Logo, NavLink, Button } from "../atoms";
import { Menu, X } from "lucide-react";
import { Container } from "../atoms/Container";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="w-full h-[100px] bg-white relative z-[100] flex justify-center">
      <div className="w-full max-w-[1440px] ml-[5%] px-[5%] md:px-[10%] h-full flex items-center justify-between">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        <div className="hidden min-[901px]:flex items-center justify-center flex-1 gap-[20px]">
          <NavLink href="#" label="Home" />
          <NavLink href="#" label="Properties" />
          <NavLink href="#" label="Agents" />
          <NavLink href="#" label="Pages" hasDropdown />
        </div>
        <div className="flex-shrink-0 flex items-center mr-[5%]">
          <div className="hidden min-[901px]:block">
            <Button 
              variant="outline" 
              className="w-[145px] h-[52px] rounded-xl border border-black text-black hover:bg-black hover:text-white transition-all font-medium"
            >
              Contact Us
            </Button>
          </div>
          <div className="min-[901px]:hidden">
            <button 
              className="flex p-2 text-black items-center justify-center transition-transform active:scale-95 bg-transparent border-0 outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={32} strokeWidth={2} /> : <Menu size={32} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-white border-b border-gray-100 min-[901px]:hidden shadow-xl">
          <Container className="py-8">
            <div className="flex flex-col gap-8 items-center text-center">
              <NavLink href="#" label="Home" />
              <NavLink href="#" label="Properties" />
              <NavLink href="#" label="Agents" />
              <NavLink href="#" label="Pages" />
              <div className="pt-6 border-t border-gray-100 w-full">
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