"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Container } from "../components/atoms/Container";

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
    <section className="w-full bg-[#FBFAFF]">
      <Container className="py-[100px]">
        <div className="flex justify-between items-start gap-10 ml-[20px] mb-20 max-[900px]:flex-col max-[900px]:gap-6 max-[900px]:mb-10 max-[900px]:items-center max-[900px]:text-center max-[900px]:ml-0">
        <h2 className="font-syne font-bold text-[48px] leading-[1.1] max-w-[550px] text-[#1A1A1A] max-[1200px]:text-[38px] max-[900px]:text-[32px]">
          Comfort Is Our Top<br/>
          Priority For You
        </h2>

        <p className="font-hanken text-[#666666] max-w-[420px] text-[16px] leading-[1.6] mt-[24px] max-[900px]:mt-0 max-[900px]:text-center">
          We guarantee that the products we sell will make our customers happy
          because we are very concerned about our consumer satisfaction.
        </p>
      </div>

        <div className="hidden min-[901px]:grid grid-cols-3 gap-[32px]">
          {values.map((item, index) => (
            <ValueCard key={index} {...item} />
          ))}
        </div>

        <div className="hidden max-[900px]:flex flex-col items-center gap-8">
          <div className="w-full max-w-[400px]">
            <ValueCard {...values[currentIndex]} />
          </div>
          
          <div className="flex gap-6"> 
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
      </Container>
    </section>
  );
};

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <div className="bg-[#FFFFFF] rounded-[12px] border border-black/10 p-[32px] flex flex-col gap-[16px] h-full max-w-[400px] mx-auto">
      <div className="w-[64px] h-[64px] bg-[#E8E1FF] rounded-[16px] flex items-center justify-center">
        <Image src={icon} alt={title} width={28} height={28} />
      </div>

      <h3 className="font-syne font-bold text-[22px] text-[#1A1A1A]">
        {title}
      </h3>

      <p className="font-hanken text-[#666666] text-[15px] leading-[1.6]">
        {description}
      </p>
    </div>
  );
};