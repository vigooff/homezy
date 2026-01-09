export interface Category {
  id: string;
  title: string;
  count: number;
  iconName: string;
}

export interface CategoriesData {
  categories: Category[];
}