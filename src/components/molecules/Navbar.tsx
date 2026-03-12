"use client";
import React, { useState, useEffect } from "react";
import { Logo, NavLink } from "../atoms";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-16px); }
        }
        .nav-dropdown-enter { animation: slideDown 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
        .nav-dropdown-exit  { animation: slideUp  0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      <nav style={{ width: '100%', height: '100px', backgroundColor: '#FBFAFF', position: 'relative', zIndex: 100, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1440px', paddingLeft: '5%', paddingRight: '5%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <a href="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
            <Logo />
          </a>

          {/* Desktop nav */}
          <div className="hidden min-[901px]:flex" style={{ alignItems: 'center', justifyContent: 'center', flex: 1, gap: '20px' }}>
            <NavLink href="#" label="Home" />
            <NavLink href="#" label="Properties" />
            <NavLink href="#" label="Agents" />
            <NavLink href="#" label="Pages" hasDropdown />
          </div>

          <div style={{ flexShrink: 0 }}>
            {/* Desktop button */}
            <div className="hidden min-[901px]:block">
              <button
                style={{ width: '145px', height: '52px', borderRadius: '12px', border: '1px solid #000000', backgroundColor: 'transparent', color: '#000000', fontWeight: 500, fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#000000'; (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#000000'; }}
              >
                Contact Us
              </button>
            </div>

            {/* Hamburger */}
            <div className="min-[901px]:hidden">
              <button 
                style={{ display: 'flex', padding: '8px', color: '#000000', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={32} strokeWidth={2} /> : <Menu size={32} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {shouldRender && (
          <div
            className={`min-[901px]:hidden ${isAnimating ? 'nav-dropdown-enter' : 'nav-dropdown-exit'}`}
            style={{
              position: 'absolute',
              top: '100px',
              left: 0,
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
              boxShadow: '0 16px 32px -4px rgba(0,0,0,0.12)',
            clipPath: 'inset(0 -40px -40px -40px)',
              zIndex: 99,
            }}
          >
            <div style={{ padding: '32px 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
              <NavLink href="#" label="Home" className="!text-[22px]" />
              <NavLink href="#" label="Properties" className="!text-[22px]" />
              <NavLink href="#" label="Agents" className="!text-[22px]" />
              <NavLink href="#" label="Pages" className="!text-[22px]" />
              <button
                style={{ width: '100%', height: '52px', borderRadius: '12px', backgroundColor: '#000000', color: '#FFFFFF', fontWeight: 500, fontSize: '16px', border: 'none', cursor: 'pointer' }}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};