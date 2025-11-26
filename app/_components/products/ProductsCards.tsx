"use client";
import { useSearchParams } from "next/navigation";
// import { products } from "../new-arrivals/NewArrivals";
import Pagination from "../reusable/Pagination";
import ProductCard from "./ProductCard";
import { Product } from "@/app/_lib/types/product_types";

interface Props {
  productsData: {
    products : Product[],
    page: number,
    limit : number
  };
}

function ProductsCards({ productsData }: Props) {
  const searchParams = useSearchParams();
  const products = productsData.products
  const page = Number(searchParams.get("page")) || 1;
  console.log("page:", page);
  const totalPages = 12;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}

export default ProductsCards;
