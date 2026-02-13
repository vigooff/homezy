import { Property } from "../types/properties";

export interface FilterOptions {
  status: "Sale" | "Rent";
  category: string;
  bedrooms: string;
  bathrooms: string;
  priceRange: string;
  minYear: string;
  maxYear: string;
}

/**
 * Get unique design types from properties array
 */
export const getUniqueDesignTypes = (properties: Property[]): string[] => {
  const designs = properties.map(prop => prop.design);
  return Array.from(new Set(designs));
};

/**
 * Filter properties based on filter options
 */
export const filterProperties = (
  properties: Property[],
  filters: FilterOptions
): Property[] => {
  return properties.filter(property => {
    // Filter by status (Sale/Rent)
    const matchesStatus = 
      (filters.status === "Sale" && property.priceType === "sale") ||
      (filters.status === "Rent" && property.priceType === "month");
    
    if (!matchesStatus) return false;

    // Filter by category (design type)
    if (filters.category !== "Category") {
      if (property.design !== filters.category) return false;
    }

    // Filter by bedrooms
    if (filters.bedrooms !== "Select") {
      const bedroomCount = parseInt(filters.bedrooms.split(" ")[0]);
      if (property.bedrooms !== bedroomCount) return false;
    }

    // Filter by bathrooms
    if (filters.bathrooms !== "Select") {
      const bathroomCount = parseInt(filters.bathrooms.split(" ")[0]);
      if (property.bathrooms !== bathroomCount) return false;
    }

    // Filter by price range
    if (filters.priceRange !== "Select") {
      const isRent = filters.status === "Rent";
      const price = property.price;

      if (isRent) {
        // Rent price ranges
        if (filters.priceRange.includes("Low")) {
          if (price < 1500 || price > 3000) return false;
        } else if (filters.priceRange.includes("Mid")) {
          if (price < 3000 || price > 5000) return false;
        } else if (filters.priceRange.includes("High")) {
          if (price < 5000) return false;
        }
      } else {
        // Sale price ranges
        if (filters.priceRange.includes("Low")) {
          if (price < 9000 || price > 10000) return false;
        } else if (filters.priceRange.includes("Mid")) {
          if (price < 10000 || price > 12000) return false;
        } else if (filters.priceRange.includes("High")) {
          if (price < 12000) return false;
        }
      }
    }

    // Filter by year range
    if (filters.minYear !== "Min Year") {
      const minYear = parseInt(filters.minYear);
      if (property.yearBuilt < minYear) return false;
    }

    if (filters.maxYear !== "Max Year") {
      const maxYear = parseInt(filters.maxYear);
      if (property.yearBuilt > maxYear) return false;
    }

    return true;
  });
};
