import { getOrders, OrderQueryParam } from "@/app/_lib/services/services";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import { FaBoxes } from "react-icons/fa";
import ProductsContent from "../products/ProductsContent";
import {
  SkeletonGrid,
  StatsSkeletonCard,
} from "@/app/_components/reusable/SkeletonCard";
import OrdersContent from "./OrdersContent";

interface Props {
  queries?: Omit<OrderQueryParam, "limit">;
}

export default async function OrderManagment({
  queries
}: Props) {

  return (
    <Card className="px-10 py-8 border-border bg-card">
      <div className="flex flex-row gap-1 items-center">
        <FaBoxes />
        <h1 className="font-semibold text-base md:text-3xl">Manage Orders</h1>
      </div>

      <Suspense
        fallback={
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <StatsSkeletonCard key={i} />
              ))}
            </div>
            <SkeletonGrid variant="list" count={4} columns={1} />
          </>
        }
      >
        <OrdersContent queries={queries} />
      </Suspense>
    </Card>
  );
}
