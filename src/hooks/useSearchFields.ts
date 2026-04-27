import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Property } from "../types/properties";

export const PRICE_OPTIONS = ["Any Price", "$500-$1500", "$1500-$2500", "$2500-$5000", "$5000+"];
export const TYPE_OPTIONS = ["Any Type", "Apartment", "House", "Villa", "Townhouse"];

interface UseSearchFieldsProps {
  properties: Property[];
  mode: "hero" | "search-page";
  onSearch?: (params: { location: string; price: string; type: string }) => void;
}

export const useSearchFields = ({ properties, mode, onSearch }: UseSearchFieldsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("loc") || "Any Location");
  const [price, setPrice] = useState(searchParams.get("price") || "Any Price");
  const [type, setType] = useState(searchParams.get("type") || "Any Type");

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  useEffect(() => {
    setLocation(searchParams.get("loc") || "Any Location");
    setPrice(searchParams.get("price") || "Any Price");
    setType(searchParams.get("type") || "Any Type");
  }, [searchParams]);

  useEffect(() => {
    const closeAll = () => {
      setIsLocationOpen(false);
      setIsPriceOpen(false);
      setIsTypeOpen(false);
    };
    window.addEventListener("click", closeAll);
    return () => window.removeEventListener("click", closeAll);
  }, []);

  const locationOptions = useMemo(() => {
    const cities = Array.from(new Set(properties.map((p) => p.city)));
    return ["Any Location", ...cities];
  }, [properties]);

  const toggleLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLocationOpen(!isLocationOpen);
    setIsPriceOpen(false);
    setIsTypeOpen(false);
  };

  const togglePrice = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPriceOpen(!isPriceOpen);
    setIsLocationOpen(false);
    setIsTypeOpen(false);
  };

  const toggleType = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTypeOpen(!isTypeOpen);
    setIsLocationOpen(false);
    setIsPriceOpen(false);
  };

  const handleBrowse = () => {
    const params = new URLSearchParams();

    if (location !== "Any Location") params.set("loc", location);
    if (price !== "Any Price") params.set("price", price);
    if (type !== "Any Type") params.set("type", type);

    const queryString = params.toString();
    const path = `/search${queryString ? `?${queryString}` : ""}`;

    if (mode === "hero") {
      router.push(path);
    } else {
      router.replace(path, { scroll: false });
    }
  };

  return {
    location, setLocation, isLocationOpen, setIsLocationOpen, toggleLocation,
    price, setPrice, isPriceOpen, setIsPriceOpen, togglePrice,
    type, setType, isTypeOpen, setIsTypeOpen, toggleType,
    locationOptions, handleBrowse
  };
};