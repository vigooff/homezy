export interface City {
  id: string;
  name: string;
  state: string;
  count: number;
  image?: string;
}

export interface CitiesData {
  cities: City[];
}