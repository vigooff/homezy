import React from "react";
import { Phone, Instagram, Facebook, Twitter } from "lucide-react"; 

interface SocialIconProps {
  type: string;
}

export const SocialIcon = ({ type }: SocialIconProps) => {
  const iconSize = 14; 

  const labels: Record<string, string> = {
    phone: "Contact us by phone",
    instagram: "Follow us on Instagram",
    facebook: "Follow us on Facebook",
    twitter: "Follow us on Twitter",
  };

  return (
    <div 
      role="img"
      aria-label={labels[type] || "Social media icon"}
      className="w-[24px] h-[24px] rounded-full flex items-center justify-center bg-[#1A1A1A] cursor-pointer hover:bg-purple-600 transition-all flex-shrink-0 relative z-10"
    >
      {type === "phone" && <Phone size={iconSize} color="#FFFFFF" />}
      {type === "instagram" && <Instagram size={iconSize} color="#FFFFFF" />}
      {type === "facebook" && <Facebook size={iconSize} color="#FFFFFF" />}
      {type === "twitter" && <Twitter size={iconSize} color="#FFFFFF" />}
    </div>
  );
};