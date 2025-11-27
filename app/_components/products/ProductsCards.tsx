import { Product } from "@/app/_lib/types/product_types";
import Pagination from "../reusable/Pagination";
import ProductCard from "./ProductCard";

interface Props {
  productsData: {
    products : Product[],
    page: number,
    limit : number,
    total_pages: number,
    total_items: number,
    has_next: boolean,
    has_prev: boolean,
  };
}

function ProductsCards({ productsData }: Props) {
  const {products, page, total_pages, has_next, has_prev} = productsData;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={total_pages} hasPrev={has_prev} hasNext={has_next} />
    </>
  );
}

export default ProductsCards;
