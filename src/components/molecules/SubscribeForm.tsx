"use client";
import React from "react";

export const SubscribeForm = () => {
  return (
    <form 
      className="flex items-center bg-[#FFFFFF] border border-[#E8E1FF]"
      style={{
        width: "414px",
        height: "68px",
        gap: "72px",
        padding: "8px 8px 8px 24px",
        borderRadius: "15px",
        opacity: 1,
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
         lineHeight: "26px",
         letterSpacing: "0%",
        }}
        required
      />      
      
      <button
        type="submit"
        className="bg-[#1A1A1A] ml-[25px] text-white font-hanken font-bold transition-all hover:bg-[#333333] border-none"
        style={{
          width: "130px",
          height: "52px",
          gap: "8px",
          padding: "16px 32px",
          borderRadius: "15px",
          fontSize: "16px",
          lineHeight: "20px",
          color: "#FFFFFF",
          opacity: 1,
          cursor: "pointer"
        }}
      >
        Subscribe
      </button>
    </form>
  );
};