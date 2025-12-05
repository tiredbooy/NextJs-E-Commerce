"use client";
import { FiCalendar, FiClock } from "react-icons/fi";
import { orderHelpers } from "@/app/_lib/utils/orderHelpers";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Order } from "@/app/_lib/types/order_types";

interface OrderHeaderProps {
  order: Order;
  viewMode: "user" | "admin";
  onStatusChange?: (newStatus: string) => void;
}


export function OrderHeader({
  order,
  viewMode,
  onStatusChange,
}: OrderHeaderProps) {
  const isAdmin = viewMode === "admin";

  return (
    <div className="bg-card border rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4" />
              Placed: {orderHelpers.formatDate(order.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="w-4 h-4" />
              Updated: {orderHelpers.formatDate(order.updated_at)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          {isAdmin && onStatusChange && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(order.status)}
            >
              Update Status
            </Button>
          )}
        </div>
      </div>

      {isAdmin && (
        <div className="pt-4 border-t text-sm text-muted-foreground">
          <span className="font-medium">Order ID:</span> {order.id} |
          <span className="font-medium ml-3">User ID:</span> {order.user_id} |
          <span className="font-medium ml-3">Address ID:</span>{" "}
          {order.shipping_address_id}
        </div>
      )}
    </div>
  );
}
