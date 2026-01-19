"use client";
import React from "react";

export const SubscribeForm = () => {
  return (
    <form 
      className="subscribe-form-responsive flex items-center bg-[#FFFFFF] border border-[#E8E1FF] transition-all duration-300 mx-auto"
      style={{
        width: "414px",
        maxWidth: "100%",
        padding: "8px",
        borderRadius: "15px",
        height: "auto",
      }}
    >
      <input
        type="email"
        placeholder="Enter Your Email Address"
        className="subscribe-input outline-none border-none bg-transparent font-hanken font-light text-[#666666] placeholder:text-[#B7B8C1] flex-1 px-4"
        style={{
          fontSize: "16px",
          minWidth: "0",
          height: "52px", 
        }}
        required
      />      
      
      <button
        type="submit"
        className="subscribe-button bg-[#1A1A1A] text-[#FFFFFF] font-hanken font-bold transition-all hover:bg-[#333333] border-none flex-shrink-0"
        style={{
          width: "130px",
          height: "52px",
          borderRadius: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        Subscribe
      </button>
    </form>
  );
};