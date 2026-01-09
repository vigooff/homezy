import { HeroSection } from "../templates/HeroSection";
import { FeaturedSection } from "../templates/FeaturedSection";
import { ValueSection } from "../templates/ValueSection";
import { CategorySection } from "../templates/CategorySection";
import { CitySection } from "../templates/CitySection";
import { AgentSection } from "../templates/AgentSection";
import { FeedbackSection } from "../templates/FeedbackSection";
import { SubscribeSection } from "../templates/SubscribeSection";
import { Navbar } from "../components/molecules/Navbar";

async function getProperties() {
  const res = await fetch("http://localhost:3000/api/properties", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="w-full min-h-screen overflow-hidden bg-[#FBFAFF]">
      <HeroSection />
      <div className="flex flex-col w-full">
        {properties.length > 0 && <FeaturedSection properties={properties} />}
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