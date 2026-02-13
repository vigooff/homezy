export interface Property {
  id: string;
  title: string;
  price: number;
  priceType: "month" | "sale";
  address: string;
  location: {
    lat: number;
    lng: number;
  };
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
  yearBuilt: number;
  agent: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    phone?: string;
  };
}
