import React from "react";
import { FooterBrand } from "../molecules/FooterBrand";
import { FooterNavGroup } from "../molecules/FooterNavGroup";
import { FooterData, FooterSection } from "../../types/footer";
import footerDataJson from "../../data/footer.json";

const footerData = (footerDataJson as unknown) as FooterData;

export const Footer = () => {
  return (
    <footer className="w-full bg-[#FBFAFF] flex flex-col items-center">
      <div className="w-full max-w-[1160px] px-[1%] pt-[8%] pb-[4%] footer-main-container">
        <div className="flex justify-between items-start w-full min-h-[330px] footer-content-row">
          <div className="footer-brand-wrapper">
            <FooterBrand />
          </div>

          <div 
            className="flex opacity-100 footer-nav-wrapper" 
            style={{ width: '576px', gap: '104px' }}
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

      <div className="w-full px-[1%] pb-8 flex flex-col items-center">
        <div className="w-full max-w-[1160px] border-t border-[#EAECF0]">
          <p className="font-hanken font-light text-[#98A2B3] py-[30px] text-sm text-center">
            ©2023 Homezy. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};