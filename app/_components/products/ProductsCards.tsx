"use client";
import { useSearchParams } from "next/navigation";
import { products } from "../new-arrivals/NewArrivals";
import Pagination from "../reusable/Pagination";
import ProductCard from "./ProductCard";

async function ProductsCards({}) {
  // searchParams
  // console.log('searchParams:', searchParams);
  // const page = Number(searchParams?.page) || 1;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  console.log("page:", page);
  const totalPages = 12;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}

export default ProductsCards;
