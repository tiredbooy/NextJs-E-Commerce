
import { StatsSkeletonCard, TableSkeleton } from "@/app/_components/reusable/SkeletonCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import { FaBoxes } from "react-icons/fa";
import ProductsContent from "./ProductsContent";

interface Props {
  page?: number;
}

export default async function ManageProducts({ page }: Props) {
  return (
    <Card className="px-10 py-8 border-border bg-card">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1 items-center">
          <FaBoxes />
          <h1 className="font-semibold text-base md:text-3xl">
            Manage Products
          </h1>
        </div>
        <Link href={"/admin/products/new"}>
          <Button className="font-semibold text-background cursor-pointer">
            Add Product
          </Button>
        </Link>
      </div>

      <Suspense
        fallback={
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <StatsSkeletonCard key={i} />
              ))}
            </div>
            <TableSkeleton rowCount={4} />
          </>
        }
      >
      <ProductsContent page={page} />
      </Suspense>
    </Card>
  );
}
