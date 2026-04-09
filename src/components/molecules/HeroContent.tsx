import React from "react";

export const HeroContent = () => {
  return (
    <div className="flex flex-col max-[1280px]:items-center max-[1280px]:text-center">
      <h1 className="hero-title font-syne font-bold tracking-[-0.015em] mb-8 text-[#1A1A1A]">
        We help people<br />
        to realize their<br />
        dream property
      </h1>

      <p className="text-[18px] font-hanken font-light leading-[30px] text-gray-500 max-w-[520px] mt-[-20px] max-[1280px]:text-center max-[1280px]:br-none">
        We are creative people who provide the best way
        to you who want to have a new comfortable and
        suitable place to live
      </p>
    </div>
  );
};