import { SearchParams } from "next/dist/server/request/search-params";
import FilterBar from "@/app/_components/products/filter/FilterBar";
import ProductsCards from "@/app/_components/products/ProductsCards";
import ProductsHeader from "@/app/_components/products/ProductsHeader";
import SortBy from "@/app/_components/products/SortBy";
import {
  getBrands,
  getCategories,
  getColors,
  getProducts,
  getSizes,
} from "@/app/_lib/services/productsService";
import { filtersToQueryString } from "@/app/_lib/utils/utils";

interface Props {
  searchParams: SearchParams;
}

const page: React.FC<Props> = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage =
    typeof params.search === "string" ? Number(params.page) : 1;
  const search = typeof params.search === "string" ? params.search : "";

  const categoryParam =
    typeof params.category === "string"
      ? params.category
      : typeof params.categories === "string"
      ? params.categories
      : "";

  const brandParam =
    typeof params.brand === "string"
      ? params.brand
      : typeof params.brands === "string"
      ? params.brands
      : "";

  const parseMultipleParams = (
    param: string | string[] | undefined
  ): string[] => {
    if (Array.isArray(param)) {
      return param;
    }
    if (typeof param === "string") {
      return param.includes(",")
        ? param.split(",").map((s) => s.trim())
        : [param];
    }
    return [];
  };

  const colorsParam = parseMultipleParams(params.colors);
  const queryColors = colorsParam.join(",");

  const sizesParam = parseMultipleParams(params.sizes);
  const querySizes = sizesParam.join(",");

  // Price range
  const minPrice =
    typeof params.minPrice === "string" ? parseInt(params.minPrice) : 0;
  const maxPrice =
    typeof params.maxPrice === "string" ? parseInt(params.maxPrice) : 20000;

  // // Boolean filters
  // removed onSale and inStock for now api api dosen't support
  // const inStock = params.inStock === "true";
  // const onSale = params.onSale === "true";

  const sortBy =
    typeof params.sortBy === "string" ? params.sortBy : "createdAt";
  const orderBy = typeof params.orderBy === "string" ? params.orderBy : "desc";

  const [productsData, categories, sizes, colors, brands] = await Promise.all([
    getProducts({
      limit: 10,
      page: Number(currentPage) || 0,
      category: categoryParam,
      brand: brandParam,
      search,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      sortBy,
      sortOrder: orderBy,
      sizes: querySizes,
      colors: queryColors,
    }),
    getCategories(),
    getSizes(),
    getColors(),
    getBrands(),
  ]);

  const selectedCategory = categoryParam
    ? categories.find(
        (c: any) => c.title?.toLowerCase() === categoryParam.toLowerCase()
      )
    : undefined;

  const selectedBrand = brandParam
    ? brands.find(
        (b: any) => b.title?.toLowerCase() === brandParam.toLowerCase()
      )
    : undefined;

  const selectedColors = colorsParam
    .map((colorParam) =>
      colors.find(
        (c: any) => c.title?.toLowerCase() === colorParam.toLowerCase()
      )
    )
    .filter(Boolean);

  const selectedSizes = sizesParam
    .map((sizeParam) =>
      sizes.find((s: any) => s.size?.toLowerCase() === sizeParam.toLowerCase())
    )
    .filter(Boolean);

  // Prepare initial filters for FilterBar
  const initialFilters = {
    search,
    categories: selectedCategory ? [selectedCategory] : [],
    brands: selectedBrand ? [selectedBrand] : [],
    colors: selectedColors,
    sizes: selectedSizes,
    priceRange: { min: minPrice, max: maxPrice },
    // inStock,
    // onSale,
  };

  // const query = filtersToQueryString(initialFilters);

  return (
    <>
      <ProductsHeader />
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <FilterBar
              availableCategories={categories}
              availableBrands={brands}
              availableColors={colors}
              availableSizes={sizes}
              initialFilters={initialFilters}
            />
          </aside>

          <section className="flex flex-col gap-4 sm:gap-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <SortBy />
            </div>
            <ProductsCards productsData={productsData} />
          </section>
        </div>
      </main>
    </>
  );
};

export default page;
