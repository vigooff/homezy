export interface Property {
  id: string;
  title: string;
  price: number;
  priceType: "month" | "sale";
  purpose: "for_sale" | "for_rent";
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

export interface PropertiesData {
  properties: Property[];
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}

export interface SearchResponse {
  success: boolean;
  data: Property[];
  pagination: PaginationMeta;
}