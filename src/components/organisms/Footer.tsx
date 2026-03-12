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
      <div className="w-full max-w-[1160px] px-[4%] pt-10 pb-[4%] footer-main-container">
        <div
          className="footer-content-row w-full"
          style={{
            display: 'flex',
            flexDirection: isSmall ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: isSmall ? '32px' : '0',
            minHeight: '330px',
          }}
        >
          <div className="footer-brand-wrapper" style={{ flexShrink: 0 }}>
            <FooterBrand />
          </div>

          <div
            className="flex flex-col opacity-100 footer-nav-wrapper"
            style={{
              // isSmall   → 100% (stack vertikal)
              // isLarge   → 576px fixed (desktop asli)
              // di antara → flex-1, ambil sisa ruang
              width: isSmall ? '100%' : isLarge ? '576px' : undefined,
              flex: (!isSmall && !isLarge) ? '1' : undefined,
              minWidth: 0,
              gap: '24px',
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
          <p className="font-hanken font-light text-[#98A2B3] py-[30px] text-sm text-center">
            ©2023 Homezy. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};