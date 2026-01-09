import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, variant = 'primary', className = '', onClick }: ButtonProps) => {
  const baseStyles = "px-[32px] py-[16px] rounded-[15px] font-bold text-[16px] transition-all duration-300 flex items-center justify-center gap-[8px] cursor-pointer";
  const variants = {
    primary: "bg-[#1A1A1A] text-white hover:bg-[#333333] active:scale-95",
    outline: "border-[1.5px] border-[#1A1A1A] text-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A] hover:text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};