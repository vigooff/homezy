import { Suspense } from "react";
import { HeroSection } from "../templates/HeroSection";
import { FeaturedSection } from "../templates/FeaturedSection";
import { ValueSection } from "../templates/ValueSection";
import { CategorySection } from "../templates/CategorySection";
import { CitySection } from "../templates/CitySection";
import { AgentSection } from "../templates/AgentSection";
import { FeedbackSection } from "../templates/FeedbackSection";
import { SubscribeSection } from "../templates/SubscribeSection";
import { PropertiesData } from "../types/properties";
import propertiesDataJson from "../data/properties";

const propertiesData = propertiesDataJson as PropertiesData;

export default async function Home() {
  const properties = propertiesData.properties;

  return (
    <Suspense fallback={null}>
      <div className="w-full bg-[#FBFAFF]">
        <HeroSection />
        <div className="flex flex-col w-full relative z-0">
          {properties.length > 0 ? (
            <FeaturedSection properties={properties} />
          ) : (
            <div className="py-20 text-center text-gray-500">
              No properties available at the moment.
            </div>
          )}
          <ValueSection />
          <CategorySection />
          <CitySection />
          <AgentSection />
          <FeedbackSection />
          <SubscribeSection />
        </div>
      </div>
    </Suspense>
  );
}