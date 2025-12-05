"use client";
import { FiCalendar, FiClock } from "react-icons/fi";
import { orderHelpers } from "@/app/_lib/utils/orderHelpers";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/app/_lib/types/order_types";
import { useTransition } from "react";
import { updateOrderStatus } from "@/app/_lib/actions/orderAction";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface OrderHeaderProps {
  order: Order;
  viewMode: "user" | "admin";
}

export function OrderHeader({ order, viewMode }: OrderHeaderProps) {
  const [isPending, startTransition] = useTransition();
  const isAdmin = viewMode === "admin";
  const canChangeStatus =
    order.status !== "completed" && order.status !== "cancelled";
  let newStatus: OrderStatus;

  switch (order.status) {
    case "pending":
      newStatus = "processing";
      break;
    case "processing":
      newStatus = "shipped";
      break;
    case "shipped":
      newStatus = "completed";
      break;
  }

  function handleStatus() {
    startTransition(async () => {
      try {
        console.log("newStatus:", newStatus);
        const result = await updateOrderStatus(order.id, newStatus);
        if (result.success) toast.success(result.message);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  }

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
          {isAdmin && canChangeStatus && (
            <Button disabled={isPending || canChangeStatus} variant="outline" onClick={handleStatus} size="sm">
              {isPending ? <Spinner /> : "Update Status"}
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
