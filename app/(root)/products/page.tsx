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

interface Props {
  // props here
  searchParams: SearchParams;
}

const page: React.FC<Props> = async ({ searchParams }) => {
  const [productsData, categories, sizes, colors, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getSizes(),
    getColors(),
    getBrands(),
  ]);

  return (
    <>
      <ProductsHeader />
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          {/* FilterBar handles its own mobile/desktop display */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <FilterBar availableCategories={categories} availableBrands={brands} availableColors={colors} availableSizes={sizes} />
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
