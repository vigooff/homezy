import Image from "next/image";
import { HeroContent } from "../components/molecules";
import { HeroSearchCard, HeroVisualSection } from "../components/organisms";

export const HeroSection = () => {
  return (
    <div className="relative z-10 bg-[#FBFAFF] overflow-hidden">
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

      <section className="max-w-[1440px] mx-auto px-[140px] pt-[40px] pb-[60px] relative max-[1400px]:px-[80px] max-[1400px]:pb-[120px] max-lg:px-[60px] max-md:px-[40px] max-sm:px-[24px]">
        <div className="flex justify-between items-start max-[1400px]:flex-col max-[1400px]:items-center">
          
          <div className="flex flex-col pt-10 w-[48%] flex-shrink-0 max-[1400px]:w-full max-[1400px]:max-w-[800px] max-[1400px]:items-center">
            <HeroContent />
            
            <div className="relative mt-[5.5rem] max-[1400px]:mt-[4rem] max-md:mt-[3rem] w-full">

              <div className="w-full flex justify-center">
                <HeroSearchCard />
              </div>
              
              <div className="hidden min-[1401px]:block absolute left-[105%] top-1/2 -translate-y-1/2">
                <div className="translate-y-[-50%]"> 
                  <HeroVisualSection />
                </div>
              </div>
            </div>
          </div>

          <div className="min-[1401px]:hidden w-full mt-[6rem] max-md:mt-[4rem] flex justify-center">
             <HeroVisualSection />
          </div>

        </div>
      </section>
    </div>
  );
};