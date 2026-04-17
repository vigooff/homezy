import { HeroSection } from "../templates/HeroSection";
import { FeaturedSection } from "../templates/FeaturedSection";
import { ValueSection } from "../templates/ValueSection";
import { CategorySection } from "../templates/CategorySection";
import { CitySection } from "../templates/CitySection";
import { AgentSection } from "../templates/AgentSection";
import { FeedbackSection } from "../templates/FeedbackSection";
import { SubscribeSection } from "../templates/SubscribeSection";
import { Property } from "../types/properties";

async function getProperties(): Promise<Property[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/properties`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch properties");
    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function Home() {
  const properties = await getProperties();

  return (
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
  );
}