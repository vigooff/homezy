"use client";
import React from "react";
import Image from "next/image";
import { FeedbackCard } from "../components/organisms/FeedbackCard";

const feedbacks = [
  {
    id: 1,
    name: "Brooklyn Simmons",
    role: "CEO of Asana",
    comment: "Your company is truly upstanding and is behind its product 100%. It's the perfect solution for our business.",
  },
  {
    id: 2,
    name: "Pria Solo",
    role: "CTO of Microsoft",
    comment: "Company mu mantap banget wok,dan agent nya juga ramah semua,suka bantuin klien. Pokoknya recomended bgt deh buat kalian.",
  },
  {
    id: 3,
    name: "Cheng Yuan",
    role: "CEO of Google",
    comment: "贵公司真的很棒，所有经纪人都非常友好热情。总而言之，我强烈推荐给所有正在寻找理想家园的人。",
  },
  {
    id: 4,
    name: "Louise",
    role: "CEO of Apple",
    comment: "Votre entreprise est vraiment formidable, et tous les agents sont aimables et serviables. En résumé, je la recommande vivement.",
  },
  {
    id: 5,
    name: "Park Hyung Seok",
    role: "CEO of Amazon",
    comment: "귀사는 정말 훌륭하고, 모든 직원분들이 친절하고 도움을 많이 주셨습니다. 꿈에 그리던 집을 찾고 계신 분들께 강력 추천합니다.",
  },
];

export const FeedbackSection = () => {
  return (
    <section className="w-full bg-[#FBFAFF] relative overflow-hidden" style={{ padding: '100px 0' }}>
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <h2 className="font-syne font-semibold text-[48px] leading-[56px] tracking-[-0.04em] text-[#1A1A1A] text-center mb-[60px] px-4">
          Kind Words From Our Customers
        </h2>

        <div className="feedback-carousel-wrapper w-full mb-[70px]">
          <div className="feedback-carousel-track">
            {[...feedbacks, ...feedbacks, ...feedbacks].map((item, index) => (
              <div key={`feedback-${index}`} className="feedback-carousel-slide">
                <FeedbackCard
                  name={item.name}
                  role={item.role}
                  comment={item.comment}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-6 relative z-20">
          <button 
            className="w-[60px] h-[60px] bg-[#1A1A1A] rounded-[15px] flex items-center justify-center hover:bg-[#CFB9FD] transition-all group shadow-lg mr-[20px]"
            aria-label="Previous"
          >
            <div className="transition-transform group-hover:-translate-x-1">
              <Image 
                src="/icons/arrow-left.svg" 
                alt="Previous" 
                width={24} 
                height={24} 
              />
            </div>
          </button>

          <button 
            className="w-[60px] h-[60px] bg-[#1A1A1A] rounded-[15px] flex items-center justify-center hover:bg-[#CFB9FD] transition-all group shadow-lg ml-[20px]"
            aria-label="Next"
          >
            <div className="transition-transform group-hover:translate-x-1">
              <Image 
                src="/icons/arrow-right.svg" 
                alt="Next" 
                width={24} 
                height={24} 
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};