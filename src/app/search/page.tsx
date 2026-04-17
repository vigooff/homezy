import { SearchTemplate } from "../../templates/SearchTemplate";
import { Property } from "../../types/properties";

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

export default async function SearchPage() {
  const properties = await getProperties();
  return <SearchTemplate properties={properties} />;
}