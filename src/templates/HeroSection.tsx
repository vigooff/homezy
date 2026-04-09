import Image from "next/image";
import { HeroContent } from "../components/molecules";
import { HeroSearchCard, HeroVisualSection } from "../components/organisms";

export const HeroSection = () => {
  return (
    <div className="relative z-10 w-full bg-[#FBFAFF] overflow-visible">
      {/* Background Pattern tetap dipertahankan sesuai kode awalmu */}
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

      <section className="max-w-[1440px] mx-auto px-[60px] pt-[40px] pb-[60px] relative max-[1280px]:px-[80px] max-[1280px]:pb-[120px] max-lg:px-[60px] max-md:px-[40px] max-sm:px-[24px]">
        {/* Menggunakan flex-row untuk memastikan tetap kiri-kanan di layar besar */}
        <div className="flex flex-row justify-between items-center max-[1280px]:flex-col max-[1280px]:items-center gap-4">
          
          {/* KOLOM KIRI */}
<div className="flex flex-col z-20 pt-10 flex-1 min-w-0 max-w-[650px] max-[1280px]:items-center max-[1280px]:w-full relative">
  <HeroContent />
  
  {/* Search Card wrapper */}
  <div className="mt-12 lg:mt-[88px] relative h-[100px] w-full max-[1280px]:h-auto">
    <div className="
      absolute top-0 left-0 z-30
      w-[900px] 
      max-[1440px]:w-[800px] 
      max-[1380px]:w-[720px]
      max-[1320px]:w-[660px]
      max-[1280px]:relative 
      max-[1280px]:w-full 
      max-[1280px]:top-auto 
      max-[1280px]:left-auto
      max-[1280px]:mx-auto
    ">
      <HeroSearchCard />
    </div>
  </div>
  </div>

          {/* KOLOM KANAN: Visual Section ditaruh di sini supaya sejajar */}
          <div className="relative z-10 flex justify-start items-center flex-shrink-0 left-[40px]">
          <HeroVisualSection />
          </div>

        </div>
      </section>
    </div>
  );
};