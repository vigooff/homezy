import Image from "next/image";
import { Navbar, HeroContent } from "../components/molecules";
import { HeroSearchCard, HeroVisualSection } from "../components/organisms";

export const HeroSection = () => {
  return (
    <div className="relative z-10 bg-[#FBFAFF]">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none -z-10">
        <div className="relative w-full h-full">
          <Image 
            src="/images/Pattern.png" 
            alt="Background Pattern" 
            fill 
            className="object-contain object-right-bottom opacity-100"
            priority
          />
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[900px] h-[900px] opacity-[0.02] pointer-events-none -z-10">
        <svg width="900" height="900" viewBox="0 0 900 900" fill="none">
          <path d="M150 650H650" stroke="#1A1A1A" strokeWidth="1.5"/>
        </svg>
      </div>

      <section className="px-[140px] pt-[40px] flex items-start justify-between relative">
        <div className="flex flex-col pt-10 w-[48%] flex-shrink-0">
          <HeroContent />
          <div className="relative z-50 w-full max-w-[700px] mt-16">
            <HeroSearchCard />
          </div>
        </div>
        <HeroVisualSection />

      </section>
    </div>
  );
};