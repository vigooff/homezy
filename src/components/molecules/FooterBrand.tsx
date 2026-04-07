"use client";
import { useState, useEffect } from "react";
import { Logo } from "../atoms/Logo";
import { SocialIcon } from "../atoms/SocialIcon";
import { FooterData } from "../../types/footer";
import footerDataJson from "../../data/footer.json";

const footerData = (footerDataJson as unknown) as FooterData;

export const FooterBrand = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmall   = isMounted && windowWidth < 900;
  const isMedium  = isMounted && windowWidth >= 900 && windowWidth < 1160;

  // Desktop: 358px fixed
  // Medium:  280px (beri ruang lebih untuk nav)
  // Small:   100% full width
  const containerWidth = isSmall ? '100%' : isMedium ? '280px' : '358px';
  const descWidth      = isSmall ? '100%' : isMedium ? '280px' : '358px';

  return (
    <div
      className="footer-brand-container flex flex-col opacity-100"
      style={{ width: containerWidth, gap: '24px' }}
    >
      <div className="footer-logo-wrapper" style={{ width: '190px', height: '50px' }}>
        <Logo />
      </div>
      
      <p
        className="footer-brand-desc font-hanken font-light text-base text-[#344054]"
        style={{ width: descWidth, lineHeight: '26px' }}
      >
        {footerData.brand.description}
      </p>

      <div className="footer-social-wrapper flex items-center" style={{ gap: '24px' }}>
        {footerData.brand.socials.map((type: string) => (
          <div key={type} className="footer-social-icon-item">
            <SocialIcon type={type} />
          </div>
        ))}
      </div>
    </div>
  );
};