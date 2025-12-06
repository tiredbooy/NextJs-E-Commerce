import { useTransition } from "react";
import { toast } from "sonner";
import { updateOrderStatus } from "@/app/_lib/actions/orderAction";
import { OrderStatus } from "@/app/_lib/types/order_types";

export function useOrderStatusUpdate() {
  const [isPending, startTransition] = useTransition();

  const updateStatus = (orderId: number, newStatus: OrderStatus) => {
    startTransition(async () => {
      try {
        const result = await updateOrderStatus(orderId, newStatus);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message || "Failed to update status");
        }
      } catch (e: any) {
        toast.error(e.message || "An error occurred");
      }
    });
  };

  return { updateStatus, isPending };
}
