"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroContent } from "../components/molecules";
import { HeroSearchCard, HeroVisualSection } from "../components/organisms";
import propertiesDataJson from "../data/properties";
import { PropertiesData } from "../types/properties";

// Cast dulu ke PropertiesData, lalu ambil array-nya — sama persis seperti Home page
const propertiesData = (propertiesDataJson as PropertiesData).properties;

export const HeroSection = () => {
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative z-10 w-full bg-[#FBFAFF]">
      {/* Background Pattern tetap statis atau bisa diberi fade-in tipis */}
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

      <section className="max-w-[1440px] mx-auto px-[60px] pt-[20px] pb-[60px] relative max-[1280px]:px-[40px] max-[1280px]:pb-[80px] max-[640px]:px-[16px] max-md:px-[24px] max-sm:px-[16px]">
        <div className="flex flex-row justify-between items-center gap-4 max-[1280px]:flex-col max-[1280px]:items-center">

          {/* KOLOM KIRI */}
          <div className="flex flex-col z-20 pt-10 flex-1 min-w-0 max-w-[650px] relative max-[1280px]:items-center max-[1280px]:w-full max-[1280px]:max-w-[700px] max-[900px]:max-w-full">

            {/* Animasi untuk HeroContent */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <HeroContent />
            </motion.div>

            <div className="mt-12 lg:mt-[88px] relative h-[100px] w-full max-[1280px]:h-auto">
              {/* Animasi untuk HeroSearchCard dengan delay sedikit agar muncul setelah content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="absolute top-0 left-0 z-30 w-[900px] max-[1440px]:w-[800px] max-[1380px]:w-[720px] max-[1320px]:w-[660px] max-[1280px]:relative max-[1280px]:w-full max-[1280px]:top-auto max-[1280px]:left-auto"
              >
                <HeroSearchCard properties={propertiesData} />
              </motion.div>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 flex-shrink-0 flex justify-center items-center max-[1280px]:w-full max-[1280px]:justify-center max-[1280px]:pl-[10%] max-[600px]:pl-0"
          >
            <HeroVisualSection />
          </motion.div>

        </div>
      </section>
    </div>
  );
};