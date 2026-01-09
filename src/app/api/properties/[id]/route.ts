import { NextRequest, NextResponse } from "next/server";
import { Property, PropertiesData } from "../../../../types/properties";
import propertiesDataJson from "../../../../data/properties.json";

const propertiesData = (propertiesDataJson as unknown) as PropertiesData;

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;
  
  const properties: Property[] = propertiesData.properties;
  const property = properties.find((p: Property) => p.id === id);

  if (!property) {
    return NextResponse.json(
      { success: false, message: "Property not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: property,
  });
}