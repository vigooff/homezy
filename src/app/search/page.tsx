import React from "react";
import { SearchTemplate } from "../../templates/SearchTemplate";
import { propertiesData } from "../../data/properties";

export default function SearchPage() {

  const properties = propertiesData;
  return (
    <main className="w-full h-screen overflow-hidden">
      <SearchTemplate properties={properties} />
    </main>
  );
}