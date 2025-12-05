import { FiDollarSign } from "react-icons/fi";

import { orderHelpers } from "@/app/_lib/utils/orderHelpers";
import { InfoCard } from "./InfoCard";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/app/_lib/types/order_types";

interface OrderSummaryProps {
  order: Order;
  className?: string;
}

/**
 * Presenter Component: Displays order financial summary
 * Single Responsibility: Calculates and shows pricing breakdown
 */
export function OrderSummary({ order, className = "" }: OrderSummaryProps) {
  const subtotal = order.items
    ? orderHelpers.calculateSubtotal(order?.items)
    : order.total_price;

  const discount = order.discount_applied || 0;
  const total = order.total_price;

  return (
    <InfoCard
      title="Order Summary"
      icon={<FiDollarSign />}
      className={className}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">
            {orderHelpers.formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium text-green-600">
              -{orderHelpers.formatPrice(discount)}
            </span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-semibold text-base">Total</span>
          <span className="font-bold text-xl">
            {orderHelpers.formatPrice(total)}
          </span>
        </div>
      </div>
    </InfoCard>
  );
}
