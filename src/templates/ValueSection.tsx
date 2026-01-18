"use client";
import React from "react";
import Image from "next/image";

export const ValueSection = () => {
  return (
    <section className="w-full bg-[#FBFAFF]">
      <div
  className="
    w-full
    max-w-[1200px]
    mx-auto
    px-6
    sm:px-8
    lg:px-12
    xl:px-0
    py-[100px]
  "
>

        <div className="flex justify-between items-start gap-10 mb-20 max-[900px]:flex-col max-[900px]:gap-6 max-[900px]:mb-10">
          <h2 className="font-syne font-bold text-[48px] leading-[1.1] max-w-[550px] text-[#1A1A1A] max-[1200px]:text-[38px] max-[900px]:text-[32px]">
            Comfort Is Our Top Priority For You
          </h2>

          <p className="font-hanken text-[#666666] max-w-[420px] text-[16px] leading-[1.6] mt-[24px] max-[900px]:mt-0">
            We guarantee that the products we sell will make our customers happy
            because we are very concerned about our consumer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-[32px] max-[900px]:grid-cols-1">
          <ValueCard
            icon="/icons/coin.svg"
            title="Affordable Price"
            description="We provide the best for you. The price we offer accordance with the quality we provide."
          />
          <ValueCard
            icon="/icons/like-shapes.svg"
            title="Clear Legality"
            description="Put your trust in us. We are a legal entity with official legality in the relevant government."
          />
          <ValueCard
            icon="/icons/people.svg"
            title="Experienced Agent"
            description="We always work with agents in their fields so that we can provide the best quality."
          />
        </div>
      </div>
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
    <div className="bg-white rounded-[12px] border border-black/10 p-[32px] flex flex-col gap-[16px]">
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
