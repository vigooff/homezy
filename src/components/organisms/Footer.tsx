"use client";
import React, { useState, useEffect } from "react";
import { FooterBrand } from "../molecules/FooterBrand";
import { FooterNavGroup } from "../molecules/FooterNavGroup";
import { FooterData, FooterSection } from "../../types/footer";
import footerDataJson from "../../data/footer.json";

const footerData = (footerDataJson as unknown) as FooterData;

export const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Breakpoints:
  // isSmall  < 900px  → flex-col, brand + nav full width
  // isMedium 900-1159 → flex-row tapi nav wrapper tidak fixed 576px
  // isLarge  ≥ 1160   → layout desktop asli
  const isSmall  = isMounted && windowWidth < 900;
  const isLarge  = isMounted && windowWidth >= 1160;

  return (
    <footer className="w-full bg-[#FBFAFF] flex flex-col items-center relative z-10 overflow-x-hidden">
      <div className="w-full px-[4%] pt-10 pb-[4%] footer-main-container" style={{ maxWidth: '1160px', width: '95vw', margin: '0 auto', boxSizing: 'border-box' }}>
      <div
        className="footer-content-row w-full"
        style={{
          display: 'flex',
          flexDirection: isSmall ? 'column' : 'row',
          justifyContent: isSmall ? 'flex-start' : 'space-between',
          alignItems: 'flex-start',
          gap: isSmall ? '32px' : '60px',
          minHeight: '330px',
        }}
        > 

          <div className="footer-brand-wrapper" style={{ flexShrink: 0, width: 'auto' }}>
          <FooterBrand />
          </div>

          <div
          className="flex flex-col opacity-100 footer-nav-wrapper"
          style={{
          width: isSmall ? '100%' : undefined,
          flex: 'none',
          minWidth: 0,
          gap: '0px',
          }}
          >
            {footerData.sections.map((section: FooterSection) => (
              <FooterNavGroup
                key={section.title}
                title={section.title}
                links={section.links}
                columns={section.columns}
                width={section.width}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-[4%] pb-8 flex flex-col items-center">
        <div className="w-full max-w-[1160px] border-t border-[#EAECF0]">
          <p className="font-hanken font-light text-[#667085] py-[30px] text-sm text-center">
            ©2023 Homezy. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};