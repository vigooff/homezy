"use client";
import { useState, useEffect } from "react";
import { NavLink } from "../atoms/NavLink";

interface NavGroupProps {
  title: string;
  links: string[];
  columns?: number;
  width: string;
}

export const FooterNavGroup = ({ title, links, columns = 1, width }: NavGroupProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallMobile = isMounted && windowWidth <= 500;
  const isDesktop     = isMounted && windowWidth >= 900;

  const effectiveColumns = isSmallMobile ? 1 : columns;
  const columnGap    = isDesktop ? '80px' : '24px';
  const col1MaxWidth = isDesktop ? '182px' : 'none';
  const col2MaxWidth = isDesktop ? '149px' : 'none';

  return (
    <div
      className="footer-nav-group-container flex flex-col opacity-100"
      style={{ gap: '32px', width: isDesktop ? width : '100%', minWidth: 0 }}
    >
      <span className="footer-nav-title font-hanken font-normal text-[#98A2B3] text-sm uppercase tracking-wider">
        {title}
      </span>
      
      <div 
        className={`footer-nav-grid grid opacity-100 ${effectiveColumns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`} 
        style={{ gap: effectiveColumns === 2 ? columnGap : '16px' }}
      >
        <div className="flex flex-col footer-nav-col" style={{ gap: '16px', minWidth: 0 }}>
          {links.slice(0, Math.ceil(links.length / effectiveColumns)).map((link) => (
            <div key={link} className="footer-nav-link-item" style={{ height: '20px', maxWidth: col1MaxWidth }}>
              <NavLink label={link} href="#" noPadding />
            </div>
          ))}
        </div>
        
        {effectiveColumns === 2 && (
          <div className="flex flex-col footer-nav-col" style={{ gap: '16px', minWidth: 0 }}>
            {links.slice(Math.ceil(links.length / effectiveColumns)).map((link) => (
              <div key={link} className="footer-nav-link-item" style={{ height: '20px', maxWidth: col2MaxWidth }}>
                <NavLink label={link} href="#" noPadding />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};