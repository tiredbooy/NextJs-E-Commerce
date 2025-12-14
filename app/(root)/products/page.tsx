import SortBy from "@/app/_components/products/filter/SortBy";
import ProductFilters from "@/app/_components/products/ProductFilters";
import ProductsCards from "@/app/_components/products/ProductsCards";
import ProductsHeader from "@/app/_components/products/ProductsHeader";
import {
  FilterBarSkeletonMinimal,
  SkeletonGrid,
} from "@/app/_components/reusable/SkeletonCard";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";

interface Props {
  searchParams: SearchParams;
}

const page: React.FC<Props> = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = typeof params.page === "string" ? Number(params.page) : 1;

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
  // const inStock = params.inStock === "true";
  const sale = params.onSale === "true" ? "true" : "";

  const sortBy =
    typeof params.sortBy === "string" ? params.sortBy : "createdAt";
  const orderBy = typeof params.orderBy === "string" ? params.orderBy : "desc";

  const queryObj = {
    limit: 10,
    page: Number(currentPage) || 1,
    category: categoryParam,
    brand: brandParam,
    search,
    sale,
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
    sortBy,
    sortOrder: orderBy,
    sizes: querySizes,
    colors: queryColors,
  };

  const filterParams = {
    categoryParam,
    brandParam,
    sizesParam,
    colorsParam,
    search,
    minPrice,
    maxPrice,
  };

  return (
    <>
      <ProductsHeader />
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <Suspense fallback={<FilterBarSkeletonMinimal />}>
              <ProductFilters params={filterParams} />
            </Suspense>
          </aside>

          <section className="flex flex-col gap-4 sm:gap-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <SortBy />
            </div>
            <Suspense
              fallback={
                <SkeletonGrid count={6} columns={3} variant="product" />
              }
            >
              <ProductsCards queryObj={queryObj} />
            </Suspense>
          </section>
        </div>
      </main>
    </>
  );
};

export default page;
