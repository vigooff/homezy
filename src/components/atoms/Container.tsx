"use client";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export const Container = ({ children, className = "", size = "default" }: ContainerProps) => {
  const sizeClasses = {
    narrow: "max-w-[1100px]",
    default: "max-w-[1280px]",
    wide: "max-w-[1400px]",
  };

  return (
    <div className={`
      w-full
      ${sizeClasses[size]}
      mx-auto
      px-6
      sm:px-8
      md:px-10
      lg:px-12
      max-[400px]:px-[16px]
      max-[320px]:px-[12px]
      ${className}
    `.trim()}>
      {children}
    </div>
  );
};