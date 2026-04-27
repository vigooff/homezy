"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  const isSmall = isMounted && windowWidth < 900;

  return (
    <footer className="w-full bg-[#FBFAFF] flex flex-col items-center relative z-10 overflow-x-hidden">
      {/* Container 1440px */}
      <div className="w-full max-w-[1440px] mx-auto px-[5%] lg:px-[10%] box-border pt-10 pb-[4%]">
        
        {/* Inner Wrapper 1200px */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-[1200px] mx-auto w-full flex"
          style={{
            flexDirection: isSmall ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: isSmall ? 'center' : 'flex-start',
            gap: isSmall ? '40px' : '60px',
            minHeight: '330px',
            textAlign: isSmall ? 'center' : 'left',
          }}
        > 
          {/* Brand Section - Logo & Deskripsi */}
          <div 
            className="footer-brand-wrapper shrink-0" 
            style={{ 
                width: isSmall ? '100%' : 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isSmall ? 'center' : 'flex-start' 
            }}
          >
            <FooterBrand />
          </div>

          {/* Navigation Section - Links */}
          <div
            className="footer-nav-wrapper flex"
            style={{
              width: isSmall ? '100%' : 'auto',
              flex: 'none', 
              display: 'flex',
              flexDirection: isSmall ? 'column' : 'row',
              justifyContent: isSmall ? 'center' : 'flex-end',
              alignItems: isSmall ? 'center' : 'flex-start',
              gap: isSmall ? '40px' : '100px', 
            }}
          >
            {footerData.sections.map((section: FooterSection) => (
              <div 
                key={section.title} 
                className={isSmall ? "w-full flex flex-col items-center" : ""}
              >
                <FooterNavGroup
                  title={section.title}
                  links={section.links}
                  columns={section.columns}
                  width={isSmall ? '100%' : section.width}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Copyright Section */}
        <div className="max-w-[1200px] mx-auto w-full border-t border-[#EAECF0] mt-10">
          <p className="font-hanken font-light text-[#667085] py-[30px] text-sm text-center lg:text-left">
            ©2023 Homezy. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};