import { NextRequest, NextResponse } from "next/server";
import { Property, PropertiesData } from "../../../types/properties";
import propertiesDataJson from "../../../data/properties";

const propertiesData = (propertiesDataJson as unknown) as PropertiesData;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const location = searchParams.get("location")?.toLowerCase();
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const bedrooms = searchParams.get("bedrooms");
  const bathrooms = searchParams.get("bathrooms");
  const design = searchParams.get("design")?.toLowerCase();
  const featured = searchParams.get("featured");

  let filteredProperties: Property[] = [...propertiesData.properties];

  if (location) {
    filteredProperties = filteredProperties.filter(
      (property: Property) =>
        property.city.toLowerCase().includes(location) ||
        property.state.toLowerCase().includes(location) ||
        property.address.toLowerCase().includes(location)
    );
  }

  if (minPrice) {
    const min = parseInt(minPrice);
    filteredProperties = filteredProperties.filter(
      (property: Property) => property.price >= min
    );
  }
  
  if (maxPrice) {
    const max = parseInt(maxPrice);
    filteredProperties = filteredProperties.filter(
      (property: Property) => property.price <= max
    );
  }

  if (bedrooms) {
    const bedroomsCount = parseInt(bedrooms);
    filteredProperties = filteredProperties.filter(
      (property: Property) => property.bedrooms === bedroomsCount
    );
  }

  if (bathrooms) {
    const bathroomsCount = parseInt(bathrooms);
    filteredProperties = filteredProperties.filter(
      (property: Property) => property.bathrooms === bathroomsCount
    );
  }

  if (design) {
    filteredProperties = filteredProperties.filter(
      (property: Property) => property.design.toLowerCase() === design
    );
  }

  if (featured === "true") {
    filteredProperties = filteredProperties.filter(
      (property: Property) => property.isFeatured === true
    );
  }

  return NextResponse.json({
    success: true,
    count: filteredProperties.length,
    data: filteredProperties,
  });
}