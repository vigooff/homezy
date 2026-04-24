"use client";
import React from "react";
import { motion } from "framer-motion"; // 1. Import motion
import { Container } from '../components/atoms/Container';
import { SubscribeCard } from '../components/organisms/SubscribeCard';

export const SubscribeSection = () => {
  return (
    <section className="w-full bg-[#FBFAFF] py-[100px] flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-[5%] lg:px-[10%] box-border">
        {/* Wrapper Animasi - Scale + Fade In */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="subscribe-section-wrapper w-full flex justify-center items-center"
        >
          <SubscribeCard />
        </motion.div>
      </div>
    </section>
  );
};

export const SubscribeFormInternal = () => {
  return (
    <form 
      className="flex items-center bg-[#FFFFFF] border border-[#E8E1FF] transition-all duration-300 origin-left
                 max-[1400px]:scale-[0.8] max-[1200px]:scale-[0.7] max-[900px]:scale-[1]"
      style={{
        width: "414px",
        height: "68px",
        padding: "8px 8px 8px 24px",
        borderRadius: "15px",
      }}
    >
      <input
        type="email"
        placeholder="Enter Your Email Address"
        className="outline-none border-none bg-transparent font-hanken font-light text-[#666666] placeholder:text-[#B7B8C1]"
        style={{
          width: "180px",
          height: "26px",
          fontSize: "16px",
        }}
        required
      />      
      
      {/* Animasi simple pada button saat diklik/hover */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="bg-[#1A1A1A] ml-auto text-white font-hanken font-bold transition-all hover:bg-[#333333] border-none"
        style={{
          width: "130px",
          height: "52px",
          borderRadius: "15px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Subscribe
      </motion.button>
    </form>
  );
};