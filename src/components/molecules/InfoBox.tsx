import React from "react";

export const InfoBox = () => {
  return (
    <div className="relative top-[5px]"> 
      <div 
        className="absolute bg-transparent"
        style={{
          top: "-40px", 
          right: "0px", 
          width: "40px",
          height: "40px",
          borderBottomRightRadius: "35px", 
          boxShadow: "0px 20px 0 0 #1A1A1A", 
          zIndex: 10
        }}
      />

      <div 
        className="relative bg-[#1A1A1A] flex items-center justify-center shadow-lg border-x-[2px] border-b-[2px] border-black"
        style={{
          width: "160px",
          height: "60px",
          padding: "20px 24px",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px", 
          zIndex: 20,
          color: "#FFFFFF"
        }}
      >
        <p 
          className="font-hanken text-[14px] leading-snug text-left w-full"
          style={{ color: "#FFFFFF" }}
        >
          We provide our best properties to give great services possible
        </p>
      </div>
    </div>
  );
};