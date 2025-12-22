import { Product } from "@/app/_lib/types/product_types";
import Pagination from "../reusable/Pagination";
import ProductCard from "./ProductCard";
import { getProducts } from "@/app/_lib/services/productsService";

interface Props {
  queryObj: {
    limit: number;
    page: number;
    category: string;
    brand: string;
    sale: string;
    search: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
    sortOrder: string;
    sizes: string;
    colors: string;
  };
}

async function ProductsCards({ queryObj }: Props) {
  const productsData = await getProducts(queryObj);
  const { products, page, total_pages, has_next, has_prev } = productsData;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {products?.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {total_pages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={total_pages}
          hasPrev={has_prev}
          hasNext={has_next}
        />
      )}
    </>
  );
}

export default ProductsCards;
