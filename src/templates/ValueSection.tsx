import React from "react";
import Image from "next/image";
import { ValueCard } from "../components/organisms/ValueCard";

export const ValueSection = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 bg-[#FBFAFF]" style={{ padding: '100px 16px' }}>
      <div className="flex flex-row justify-between items-start gap-10 mb-20">
        <h2 className="font-syne font-bold text-[48px] leading-[1.1] max-w-[550px] text-[#1A1A1A]">
          Comfort Is Our Top Priority For You
        </h2>
        <p className="font-hanken text-[#666666] max-w-[420px] pt-4 mt-[50px] text-[16px] leading-[1.6]">
          We guarantee that the products we sell will make our customers happy 
          because we are very concerned about our consumer satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-[30px] w-full items-stretch mt-[40px]">
        <ValueCard 
          icon={<Image src="/icons/coin.svg" alt="Affordable Price" width={32} height={32} />}
          title="Affordable Price"
          description="We provide the best for you. The price we offer accordance with the quality we provide."
        />
        <ValueCard 
          icon={<Image src="/icons/like-shapes.svg" alt="Clear Legality" width={32} height={32} />}
          title="Clear Legality"
          description="Put your trust in us. We are a legal entity with official legality in the relevant government."
        />
        <ValueCard 
          icon={<Image src="/icons/people.svg" alt="Experienced Agent" width={32} height={32} />}
          title="Experienced Agent"
          description="We always work with agents in their fields so that we can provide the best quality."
        />
      </div>
    </section>
  );
};