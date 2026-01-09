import React from "react";
import { Phone, Instagram, Facebook, Twitter } from "lucide-react"; 

interface SocialIconProps {
  type: string;
}

export const SocialIcon = ({ type }: SocialIconProps) => {
  const renderIcon = () => {
    switch (type) {
      case "phone": return <Phone size={16} color="white" />;
      case "instagram": return <Instagram size={16} color="white" />;
      case "facebook": return <Facebook size={16} color="white" />;
      case "twitter": return <Twitter size={16} color="white" />;
      default: return null;
    }
  };

  return (
    <div 
      className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-[#1A1A1A] cursor-pointer hover:bg-purple-600 transition-colors flex-shrink-0"
    >
      {renderIcon()}
    </div>
  );
};