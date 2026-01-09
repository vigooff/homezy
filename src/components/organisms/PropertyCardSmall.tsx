import React from "react";
import Image from "next/image";
import { Property } from "../../types/properties";
import { Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardSmallProps {
  property: Property;
}

export const PropertyCardSmall: React.FC<PropertyCardSmallProps> = ({ property }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-[20px] shadow-card hover:shadow-card-hover transition-all duration-300 overflow-visible group cursor-pointer w-full border border-[#E8E1FF] shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative">
      <div className="relative w-full h-[240px] rounded-t-[15px]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-[15px]"
        />
      </div>
  
      {property.isFeatured && (
        <div 
          className="absolute z-[100]"
          style={{
            bottom: '222px',
            left: '-4px',
              width: '80px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#000000',
              borderRadius: '8px',
              paddingLeft: '12px',
              paddingRight: '12px',
              height: '34px',
              flexShrink: 0
            }}
          >
            <span 
              style={{
                color: '#FFFFFF',
                fontSize: '14px',
                lineHeight: 1,
                fontWeight: 700
              }}
            >
              ✦
            </span>
            <span 
              style={{
                color: '#FFFFFF',
                fontSize: '10px',
                lineHeight: 1,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap'
              }}
            >
              FEATURED
            </span>
          </div>
      )}

      <div className="p-4 sm:p-5 lg:p-6 mt-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-baseline gap-1 flex-wrap pl-[20px]">
            <span 
              className="font-syne text-[#1A1A1A]"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(24px, 5vw, 32px)',
                lineHeight: '1.25',
                letterSpacing: '-0.04em'
              }}
            >
              ${property.price.toLocaleString()}
            </span>
            <span 
              className="font-hanken text-[#666666]"
              style={{
                fontWeight: 300,
                fontSize: 'clamp(14px, 3vw, 16px)',
                lineHeight: '1.25'
              }}
            >
              /{property.priceType}
            </span>
          </div>

          <h3 
            className="font-syne text-[#1A1A1A] pl-[20px]"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(18px, 4vw, 24px)',
              lineHeight: '1.33',
              letterSpacing: '-0.04em'
            }}
          >
            {property.title}
          </h3>
        </div>

        <p 
          className="font-hanken text-[#666666] line-clamp-2 pl-[20px]"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            lineHeight: '1.625',
            marginTop: '8px',
            marginBottom: '10px'
          }}
        >
          {property.address}
        </p>

        <div 
          className="flex items-center gap-[4px] pt-[10px] pb-[10px] flex-wrap"
          style={{
            borderTop: '1px solid #F7F2FF3',
            marginLeft: '15px',
            marginRight: '15px'
          }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 ml-[10px]">
            <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-[#666666] flex-shrink-0" />
            <span 
              className="font-hanken text-foreground font-medium whitespace-nowrap ml-[10px]"
              style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}
            >
              {property.bedrooms} Beds
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 ml-[40px]">
            <Bath className="w-4 h-4 sm:w-5 sm:h-5 text-[#666666] flex-shrink-0" />
            <span 
              className="font-hanken text-foreground font-medium whitespace-nowrap ml-[10px]"
              style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}
            >
              {property.bathrooms} Baths
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 ml-[40px]">
            <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-[#666666] flex-shrink-0" />
            <span 
              className="font-hanken text-foreground font-medium whitespace-nowrap ml-[10px]"
              style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}
            >
              5x7 m²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};