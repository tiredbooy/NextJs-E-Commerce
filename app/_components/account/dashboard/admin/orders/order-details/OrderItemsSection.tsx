import { FiPackage } from "react-icons/fi";
import { InfoCard } from "./InfoCard";
import { OrderDetailItem } from "@/app/_lib/types/order_types";
import { OrderItemCard } from "./OrderItemCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonGrid } from "@/app/_components/reusable/SkeletonCard";

interface OrderItemsSectionProps {
  items: OrderDetailItem[];
  className?: string;
}

export function OrderItemsSection({
  items,
  className = "",
}: OrderItemsSectionProps) {
  if (!items || items.length === 0) {
    return (
      <InfoCard title="Order Items" icon={<FiPackage />} className={className}>
        <div className="text-center py-8 text-muted-foreground">
          <FiPackage className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No items found in this order</p>
        </div>
      </InfoCard>
    );
  }

  return (
    <InfoCard
      title="Order Items"
      icon={<FiPackage />}
      className={className}
      headerAction={
        <span className="text-sm text-muted-foreground font-normal">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      }
    >
      <div className="space-y-3">
        {items.map((item) => (
          <Suspense
            fallback={<SkeletonGrid columns={1} count={3} variant="list" />}
          >
            <OrderItemCard key={item.id} item={item} />
          </Suspense>
        ))}
      </div>
    </InfoCard>
  );
}
