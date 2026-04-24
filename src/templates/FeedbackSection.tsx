"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import { FeedbackCard } from "../components/organisms/FeedbackCard";

interface Feedback {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("/api/feedback");
        const json = await res.json();
        if (json.success) {
          setFeedbacks(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));
  };

  if (feedbacks.length === 0) return null;

  return (
    <section className="w-full bg-[#FBFAFF] relative overflow-hidden py-[100px] max-[900px]:py-[60px]">
      <div className="max-w-100 mx-auto flex flex-col items-center">
        
        {/* Header - Animasi Konsisten */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-syne font-semibold text-[48px] leading-[56px] tracking-[-0.04em] text-[#1A1A1A] text-center mb-[60px] px-4 max-[1200px]:text-[38px] max-[900px]:text-[30px] max-[900px]:leading-[38px]"
        >
          Kind Words From Our Customers
        </motion.h2>

        {/* Carousel Wrapper - Animasi Reveal Tanpa Ganggu Track */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden min-[501px]:block feedback-carousel-wrapper w-full mb-[70px] max-[900px]:mb-[40px]"
        >
          <div className="feedback-carousel-track flex items-center gap-8 max-[1200px]:gap-6 max-[900px]:gap-4">
            {[...feedbacks, ...feedbacks, ...feedbacks].map((item, index) => (
              <div
                key={`feedback-${index}`}
                className="feedback-carousel-slide flex-shrink-0"
              >
                <FeedbackCard
                  name={item.name}
                  role={item.role}
                  comment={item.comment}
                  rating={item.rating}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Slider Mobile - Animasi Soft Reveal */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="min-[501px]:hidden w-full flex flex-col items-center px-[24px] mb-[40px]"
        >
          <div className="w-full flex justify-center">
            <FeedbackCard
              name={feedbacks[currentIndex].name}
              role={feedbacks[currentIndex].role}
              comment={feedbacks[currentIndex].comment}
              rating={feedbacks[currentIndex].rating}
            />
          </div>
        </motion.div>

        {/* Tombol Navigasi - Animasi Fade In */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex gap-6 relative z-20"
        >
          <button
            onClick={handlePrev}
            className="w-[60px] h-[60px] bg-[#1A1A1A] rounded-[15px] mr-[20px] mt-[30px] flex items-center justify-center hover:bg-[#CFB9FD] transition-all group shadow-lg max-[900px]:w-[50px] max-[900px]:h-[50px]"
          >
            <div className="transition-transform group-hover:-translate-x-1">
              <Image src="/icons/arrow-left.svg" alt="Prev" width={24} height={24} />
            </div>
          </button>
          <button
            onClick={handleNext}
            className="w-[60px] h-[60px] bg-[#1A1A1A] rounded-[15px] ml-[20px] mt-[30px] flex items-center justify-center hover:bg-[#CFB9FD] transition-all group shadow-lg max-[900px]:w-[50px] max-[900px]:h-[50px]"
          >
            <div className="transition-transform group-hover:translate-x-1">
              <Image src="/icons/arrow-right.svg" alt="Next" width={24} height={24} />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};