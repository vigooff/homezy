import { Suspense } from "react";
import { SearchTemplate } from "../../templates/SearchTemplate";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-[#FBFAFF] animate-pulse" />}>
      <SearchTemplate />
    </Suspense>
  );
}