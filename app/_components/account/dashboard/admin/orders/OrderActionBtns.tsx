"use client";
import { cancelOrder } from "@/app/_lib/actions/orderAction";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { IoEllipsisVertical, IoEye, IoTrash, IoPencil } from "react-icons/io5";
import { toast } from "sonner";
import { OrderStatus } from "@/app/_lib/types/order_types";
import { orderStatusUtils } from "@/app/_lib/utils/orderHelpers";
import { useOrderStatusUpdate } from "@/app/_lib/hooks/useOrderStatusUpdate";

interface Props {
  orderId: number;
  currentStatus: OrderStatus;
  role?: "admin" | "user";
}

export default function OrderActionBtns({
  orderId: id,
  currentStatus,
  role = "admin",
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { updateStatus, isPending: isUpdating } = useOrderStatusUpdate();

  const disableCancelOrder = currentStatus !== "pending";
  const canChangeStatus = orderStatusUtils.canChangeStatus(currentStatus);
  const nextStatus = orderStatusUtils.getNextStatus(currentStatus);

  function onView(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const route = role === "admin" ? "/admin/" : "/account/"
    router.push(`${route}orders/${id}`);
  }

  function onDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (disableCancelOrder) {
      toast.error("You Can't Cancel Order Now!");
      return;
    }

    startTransition(async () => {
      const result = await cancelOrder(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  function onUpdateStatus(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (nextStatus) {
      updateStatus(id, nextStatus);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {/* Quick Actions */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onView}
        className="h-8 w-8 text-primary hover:text-primary-hover hover:bg-primary/10"
      >
        <IoEye className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={isPending}
        className={`h-8 w-8 text-destructive hover:text-destructive-hover hover:bg-destructive/10 ${
          disableCancelOrder ? "text-destructive/50" : ""
        } `}
      >
        {isPending ? <Spinner /> : <IoTrash className="w-4 h-4" />}
      </Button>

      {/* More Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-muted"
          >
            <IoEllipsisVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer hover:bg-muted"
            onClick={onView}
          >
            <IoEye className="w-4 h-4 mr-1" />
            View Details
          </DropdownMenuItem>
          {canChangeStatus && nextStatus && role === "admin" && (
            <DropdownMenuItem
              className="text-warning cursor-pointer hover:bg-warning/5"
              onClick={onUpdateStatus}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Spinner className="w-4 h-4 mr-1" />
              ) : (
                <IoPencil className="w-4 h-4 mr-1 text-warning" />
              )}
              Update Status
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending || currentStatus !== "pending"}
            className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer hover:bg-destructive/5"
          >
            <IoTrash className="w-4 h-4 mr-1 text-destructive" />
            Cancel Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
