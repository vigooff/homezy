import { NextRequest, NextResponse } from "next/server";
import type { Property, PropertiesData, SearchResponse, PaginationMeta } from "../../../types/properties";
import propertiesDataJson from "../../../data/properties";

const propertiesData = propertiesDataJson as PropertiesData;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // ── Search params sesuai feedback mentor ──────────────────────────────
  const location       = searchParams.get("location")?.toLowerCase()  || "";
  const price          = searchParams.get("price")                     || "";
  const type           = searchParams.get("type")?.toLowerCase()       || "";
  const purpose        = searchParams.get("purpose")                   || "";
  const category       = searchParams.get("category")?.toLowerCase()   || "";
  const bedroom        = searchParams.get("bedroom");
  const bathroom       = searchParams.get("bathroom");
  const minFloorArea   = searchParams.get("min_floor_area");
  const maxFloorArea   = searchParams.get("max_floor_area");
  const minYear        = searchParams.get("min_year");
  const maxYear        = searchParams.get("max_year");
  const minPrice       = searchParams.get("min_price");
  const maxPrice       = searchParams.get("max_price");
  const featured       = searchParams.get("featured");

  // ── Pagination ────────────────────────────────────────────────────────
  const page    = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "10"));

  let filtered: Property[] = [...propertiesData.properties];

  // ── Filter: location ──────────────────────────────────────────────────
  if (location) {
    filtered = filtered.filter(
      (p) =>
        p.city.toLowerCase().includes(location) ||
        p.state.toLowerCase().includes(location) ||
        p.address.toLowerCase().includes(location)
    );
  }

  // ── Filter: purpose (for_sale / for_rent) ─────────────────────────────
  if (purpose === "for_sale" || purpose === "for_rent") {
    filtered = filtered.filter((p) => p.purpose === purpose);
  }

  // ── Filter: type (property type) ──────────────────────────────────────
  if (type && type !== "any type") {
    filtered = filtered.filter(
      (p) =>
        p.design.toLowerCase().includes(type) ||
        p.title.toLowerCase().includes(type)
    );
  }

  // ── Filter: category (design style) ───────────────────────────────────
  if (category) {
    filtered = filtered.filter((p) => p.design.toLowerCase() === category);
  }

  // ── Filter: price dari search card (range string) ────────────────────
  if (!minPrice && !maxPrice && price && price !== "any price") {
    const rangeMatch = price.match(/\$?([\d,]+)\s*[-–—]\s*\$?([\d,]+)/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1].replace(/,/g, ""));
      const max = parseInt(rangeMatch[2].replace(/,/g, ""));
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    } else if (price.includes("5000+") || price.includes("$5000+")) {
      filtered = filtered.filter((p) => p.price >= 5000);
    }
  }

  // ── Filter: min_price / max_price dari popup filter ───────────────────
  if (minPrice) {
    const min = parseInt(minPrice);
    if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
  }
  if (maxPrice) {
    const max = parseInt(maxPrice);
    if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);
  }

  // ── Filter: bedroom ───────────────────────────────────────────────────
  if (bedroom) {
    const count = parseInt(bedroom);
    if (!isNaN(count)) filtered = filtered.filter((p) => p.bedrooms === count);
  }

  // ── Filter: bathroom ──────────────────────────────────────────────────
  if (bathroom) {
    const count = parseInt(bathroom);
    if (!isNaN(count)) filtered = filtered.filter((p) => p.bathrooms === count);
  }

  // ── Filter: min_floor_area / max_floor_area ───────────────────────────
  if (minFloorArea) {
    const min = parseInt(minFloorArea);
    if (!isNaN(min)) filtered = filtered.filter((p) => p.squareArea >= min);
  }
  if (maxFloorArea) {
    const max = parseInt(maxFloorArea);
    if (!isNaN(max)) filtered = filtered.filter((p) => p.squareArea <= max);
  }

  // ── Filter: min_year ──────────────────────────────────────────────────
  // PERBAIKAN LOGIC: Pastikan memfilter 'yearBuilt' bukan 'squareArea'
  if (minYear) {
    const year = parseInt(minYear);
    if (!isNaN(year)) filtered = filtered.filter((p) => p.yearBuilt >= year);
  }

  // ── Filter: max_year ──────────────────────────────────────────────────
  if (maxYear) {
    const year = parseInt(maxYear);
    if (!isNaN(year)) filtered = filtered.filter((p) => p.yearBuilt <= year);
  }

  // ── Filter: featured (backward compatibility) ─────────────────────────
  if (featured === "true") {
    filtered = filtered.filter((p) => p.isFeatured === true);
  }

  // ── Build pagination ──────────────────────────────────────────────────
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage   = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * perPage;
  const endIndex   = startIndex + perPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  const pagination: PaginationMeta = {
    current_page: safePage,
    per_page: perPage,
    total_items: totalItems,
    total_pages: totalPages,
  };

  const response: SearchResponse = {
    success: true,
    data: paginatedData,
    pagination,
  };

  return NextResponse.json(response);
}