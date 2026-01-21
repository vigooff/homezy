import { HeroSection } from "../templates/HeroSection";
import { FeaturedSection } from "../templates/FeaturedSection";
import { ValueSection } from "../templates/ValueSection";
import { CategorySection } from "../templates/CategorySection";
import { CitySection } from "../templates/CitySection";
import { AgentSection } from "../templates/AgentSection";
import { FeedbackSection } from "../templates/FeedbackSection";
import { SubscribeSection } from "../templates/SubscribeSection";
import { propertiesData } from "../data/properties";

export default function Home() {
  const properties = propertiesData;

  return (
    <main className="w-full min-h-screen overflow-hidden bg-[#FBFAFF]">
      <HeroSection />
      <div className="flex flex-col w-full relative z-0">
        {properties && properties.length > 0 ? (
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
    </main>
  );
}