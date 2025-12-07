import {
  SkeletonGrid,
  StatsSkeletonCard,
} from "@/app/_components/reusable/SkeletonCard";
import ToggleGroupFilter, {
  ToggleOption,
} from "@/app/_components/reusable/ToggleGroup";
import { OrderQueryParam } from "@/app/_lib/services/services";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import { FaBoxes } from "react-icons/fa";
import OrdersContent from "./OrdersContent";

interface Props {
  queries?: Omit<OrderQueryParam, "limit">;
}

export default async function OrderManagment({ queries }: Props) {
  const statusOptions: ToggleOption[] = [
    { id: "all", title: "All", value: "all" },
    { id: "pending", title: "Pending", value: "pending" },
    { id: "processing", title: "Processing", value: "processing" },
    {
      id: "completed",
      title: "Completed",
      value: "completed",
    },
    {
      id: "cancelled",
      title: "Cancelled",
      value: "cancelled",
    },
  ];

  return (
    <Card className="px-10 py-8 border-border bg-card">
      <div className="flex flex-col gap-5 lg:flex-row justify-between items-center">
        <div className="flex flex-row gap-1 items-center">
          <FaBoxes />
          <h1 className="font-semibold text-base md:text-2xl">Manage Orders</h1>
        </div>
        <ToggleGroupFilter
          paramName="status"
          options={statusOptions}
          defaultValue="all"
        />
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
