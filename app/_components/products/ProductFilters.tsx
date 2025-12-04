import {
  getBrands,
  getCategories,
  getColors,
  getSizes,
} from "@/app/_lib/services/productsService";
import FilterBar from "./filter/FilterBar";

interface Props {
  params: {
    categoryParam: string;
    brandParam: string;
    sizesParam: string[];
    colorsParam: string[];
    search: string;
    minPrice: number;
    maxPrice: number;
  };
}

export default async function ProductFilters({ params }: Props) {
  const [categories, sizes, colors, brands] = await Promise.all([
    getCategories(),
    getSizes(),
    getColors(),
    getBrands(),
  ]);

  const selectedCategory = params.categoryParam
    ? categories.find(
        (c: any) =>
          c.title?.toLowerCase() === params.categoryParam.toLowerCase()
      )
    : undefined;

  const selectedBrand = params.brandParam
    ? brands.find(
        (b: any) => b.title?.toLowerCase() === params.brandParam.toLowerCase()
      )
    : undefined;

  const selectedColors = params.colorsParam
    .map((colorParam: string) =>
      colors.find(
        (c: any) => c.title?.toLowerCase() === colorParam.toLowerCase()
      )
    )
    .filter(Boolean);

  const selectedSizes = params.sizesParam
    .map((sizeParam: string) =>
      sizes.find((s: any) => s.size?.toLowerCase() === sizeParam.toLowerCase())
    )
    .filter(Boolean);

  const initialFilters = {
    search: params.search,
    categories: selectedCategory ? [selectedCategory] : [],
    brands: selectedBrand ? [selectedBrand] : [],
    colors: selectedColors,
    sizes: selectedSizes,
    priceRange: { min: params.minPrice, max: params.maxPrice },
  };
  return (
    <FilterBar
      availableCategories={categories}
      availableBrands={brands}
      availableColors={colors}
      availableSizes={sizes}
      initialFilters={initialFilters}
    />
  );
}
