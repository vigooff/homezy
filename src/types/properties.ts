import { Agent } from "./agent";

export interface Property {
  id: string;
  title: string;
  price: number;
  priceType: "month" | "sale";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  isFeatured: boolean;
  description: string;
  bedrooms: number;
  bathrooms: number;
  squareArea: number;
  design: string;
  agent: Agent;
}

export interface PropertiesData {
  properties: Property[];
}