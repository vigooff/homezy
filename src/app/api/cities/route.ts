import { NextRequest, NextResponse } from "next/server";
import { City, CitiesData } from "../../../types/city";
import citiesDataJson from "../../../data/cities.json";

const citiesData = (citiesDataJson as unknown) as CitiesData;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const name = searchParams.get("name")?.toLowerCase();
  const state = searchParams.get("state")?.toLowerCase();
  const minCount = searchParams.get("minCount");
  const maxCount = searchParams.get("maxCount");
  const search = searchParams.get("search")?.toLowerCase();

  let filteredCities: City[] = [...citiesData.cities];

  if (search) {
    filteredCities = filteredCities.filter(
      (city: City) =>
        city.name.toLowerCase().includes(search) ||
        city.state.toLowerCase().includes(search)
    );
  }

  if (name) {
    filteredCities = filteredCities.filter(
      (city: City) => city.name.toLowerCase().includes(name)
    );
  }

  if (state) {
    filteredCities = filteredCities.filter(
      (city: City) => city.state.toLowerCase() === state
    );
  }

  if (minCount) {
    const min = parseInt(minCount);
    filteredCities = filteredCities.filter(
      (city: City) => city.count >= min
    );
  }

  if (maxCount) {
    const max = parseInt(maxCount);
    filteredCities = filteredCities.filter(
      (city: City) => city.count <= max
    );
  }

  return NextResponse.json({
    success: true,
    count: filteredCities.length,
    data: filteredCities,
  });
}
