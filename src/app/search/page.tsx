import { SearchTemplate } from "../../templates/SearchTemplate";
import { propertiesData } from "../../data/properties";
export default function SearchPage() {
  return (
    <SearchTemplate properties={propertiesData} />
  );
}