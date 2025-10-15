"use client";
import { useSearchParams } from "next/navigation";
import { products } from "../new-arrivals/NewArrivals";
import Pagination from "../reusable/Pagination";
import ProductCard from "./ProductCard";

function ProductsCards({}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  console.log("page:", page);
  const totalPages = 12;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}

export default ProductsCards;
