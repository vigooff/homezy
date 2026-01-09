import React from "react";
import { Logo, NavLink, Button } from "../atoms";

export const Navbar = () => {
  return (
    <nav className="w-full h-[100px] px-[80px] py-[24px] flex items-center relative z-50">
      <div className="flex-1">
        <Logo />
      </div>

      <div className="flex justify-center items-center gap-[48px]">
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">Properties</NavLink>
        <NavLink href="#">Agents</NavLink>
        <NavLink href="#" hasDropdown>Pages</NavLink>
      </div>

      <div className="flex-1 flex justify-end pr-[150px]">
        <Button 
          variant="outline" 
          className="w-[145px] h-[52px] rounded-xl border-black text-black hover:bg-black hover:text-white transition-all flex-shrink-0"
        >
          Contact Us
        </Button>
      </div>
    </nav>
  );
};