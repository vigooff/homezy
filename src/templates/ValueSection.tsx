"use client";
import React, { useState } from "react";
import Image from "next/image";

export const ValueSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const values = [
    {
      icon: "/icons/coin.svg",
      title: "Affordable Price",
      description: "We provide the best for you. The price we offer accordance with the quality we provide."
    },
    {
      icon: "/icons/like-shapes.svg",
      title: "Clear Legality",
      description: "Put your trust in us. We are a legal entity with official legality in the relevant government."
    },
    {
      icon: "/icons/people.svg",
      title: "Experienced Agent",
      description: "We always work with agents in their fields so that we can provide the best quality."
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? values.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === values.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#FBFAFF] overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto py-[40px] px-[5%] lg:px-[10%] box-border">
        <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="
          flex flex-col min-[901px]:flex-row min-[901px]:justify-between 
          items-center
          min-[901px]:items-center
          text-center min-[901px]:text-left 
          gap-8 w-full
          mb-[60px]
        ">
          <h2 className="font-syne font-bold text-[40px] md:text-[38px] lg:text-[48px] leading-[1.1] text-[#1A1A1A] max-w-[550px]">
            Comfort Is Our Top<br className="hidden min-[901px]:block"/>
            Priority For You
          </h2>
          <p className="font-hanken text-[#666666] text-[16px] leading-[1.6] max-w-[420px]">
            We guarantee that the products we sell will make our customers happy
            because we are very concerned about our consumer satisfaction.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden min-[901px]:grid grid-cols-3 gap-[24px] lg:gap-[32px] w-full">
          {values.map((item, index) => (
            <div key={index} className="w-full flex justify-center">
               <ValueCard {...item} />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="hidden max-[900px]:flex flex-col items-center gap-8">
          <div className="w-full max-w-[400px]">
            <ValueCard {...values[currentIndex]} />
          </div>
          
          <div className="flex gap-0"> 
            <button 
              onClick={handlePrev}
              className="w-[50px] h-[50px] bg-[#1A1A1A] rounded-[7px] mr-[15px] mt-[30px] flex items-center justify-center transition-opacity hover:opacity-80 shadow-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="w-[50px] h-[50px] bg-[#1A1A1A] rounded-[7px] ml-[15px] mt-[30px] flex items-center justify-center transition-opacity hover:opacity-80 shadow-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ icon, title, description }: any) => (
  <div className="
    bg-[#FFFFFF] 
    rounded-[15px] 
    border border-black/10 
    p-[40px] 
    flex flex-col 
    w-full 
    max-w-[362px] 
    mx-auto 
    box-border 
    h-[352px] 
    transition-all 
    hover:shadow-lg
  ">
    
    {/* Icon Container 90x90 */}
    <div className="w-[90px] h-[90px] bg-[#E8E1FF] rounded-[16px] flex items-center justify-center shrink-0">
      <Image src={icon} alt={title} width={48} height={48} />
    </div>
    <div className="flex-1 flex flex-col justify-end gap-4 text-left">
      <h3 className="font-syne font-bold text-[22px] leading-tight text-[#1A1A1A]">
        {title}
      </h3>
      <p className="font-hanken text-[#666666] text-[15px] leading-[1.6]">
        {description}
      </p>
    </div>
  </div>
);