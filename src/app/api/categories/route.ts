import { NextRequest, NextResponse } from "next/server";
import { Category, CategoriesData } from "../../../types/category";
import categoriesDataJson from "../../../data/categories.json";

const categoriesData = (categoriesDataJson as unknown) as CategoriesData;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const title = searchParams.get("title")?.toLowerCase();
  const iconName = searchParams.get("iconName")?.toLowerCase();
  const minCount = searchParams.get("minCount");
  const maxCount = searchParams.get("maxCount");
  const search = searchParams.get("search")?.toLowerCase();

  let filteredCategories: Category[] = [...categoriesData.categories];

  if (search) {
    filteredCategories = filteredCategories.filter(
      (category: Category) =>
        category.title.toLowerCase().includes(search) ||
        category.iconName.toLowerCase().includes(search)
    );
  }

  if (title) {
    filteredCategories = filteredCategories.filter(
      (category: Category) => category.title.toLowerCase().includes(title)
    );
  }

  if (iconName) {
    filteredCategories = filteredCategories.filter(
      (category: Category) => category.iconName.toLowerCase() === iconName
    );
  }

  if (minCount) {
    const min = parseInt(minCount);
    filteredCategories = filteredCategories.filter(
      (category: Category) => category.count >= min
    );
  }

  if (maxCount) {
    const max = parseInt(maxCount);
    filteredCategories = filteredCategories.filter(
      (category: Category) => category.count <= max
    );
  }

  return NextResponse.json({
    success: true,
    count: filteredCategories.length,
    data: filteredCategories,
  });
}
