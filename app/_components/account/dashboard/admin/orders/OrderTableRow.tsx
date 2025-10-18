"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IoEye,
  IoTrash,
  IoDownload,
  IoEllipsisVertical,
} from "react-icons/io5";
import { FiEdit, FiPackage, FiTruck } from "react-icons/fi";
import { AdminOrder } from "./OrdersTable";

interface Props {
  order: AdminOrder;
  onView?: (order: AdminOrder) => void;
  onEdit?: (order: AdminOrder) => void;
  onDelete?: (orderId: string) => void;
  onDownloadInvoice?: (orderId: string) => void;
}

export default function OrderTableRow({
  order,
  onView,
  onEdit,
  onDelete,
  onDownloadInvoice,
}: Props) {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status badge variant and styling
  const getStatusConfig = (status: AdminOrder["status"]) => {
    switch (status) {
      case "delivered":
        return {
          variant: "default" as const,
          className:
            "bg-success hover:bg-success-hover text-success-foreground",
        };
      case "shipped":
        return {
          variant: "default" as const,
          className: "bg-info hover:bg-info-hover text-info-foreground",
        };
      case "processing":
        return {
          variant: "default" as const,
          className:
            "bg-warning hover:bg-warning-hover text-warning-foreground",
        };
      case "pending":
        return {
          variant: "secondary" as const,
          className: "bg-secondary hover:bg-secondary-hover",
        };
      case "cancelled":
        return {
          variant: "destructive" as const,
          className: "",
        };
      default:
        return {
          variant: "secondary" as const,
          className: "",
        };
    }
  };

  // Get payment status badge
  const getPaymentStatusConfig = (
    paymentStatus: AdminOrder["paymentStatus"]
  ) => {
    switch (paymentStatus) {
      case "paid":
        return {
          variant: "default" as const,
          className:
            "bg-success hover:bg-success-hover text-success-foreground",
          label: "Paid",
        };
      case "pending":
        return {
          variant: "secondary" as const,
          className:
            "bg-warning hover:bg-warning-hover text-warning-foreground",
          label: "Pending",
        };
      case "failed":
        return {
          variant: "destructive" as const,
          className: "",
          label: "Failed",
        };
      default:
        return {
          variant: "secondary" as const,
          className: "",
          label: paymentStatus,
        };
    }
  };

  // Get payment method icon/label
  const getPaymentMethodLabel = (method: AdminOrder["paymentMethod"]) => {
    switch (method) {
      case "credit_card":
        return "Card";
      case "paypal":
        return "PayPal";
      case "cod":
        return "COD";
      default:
        return method;
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const paymentConfig = getPaymentStatusConfig(order.paymentStatus);

  return (
    <TableRow key={order.id} className="hover:bg-muted/50">
      {/* Order ID */}
      <TableCell className="font-mono font-medium text-primary">
        #{order.id}
      </TableCell>

      {/* Customer Name */}
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {order.customer.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {order.customer.email}
          </span>
        </div>
      </TableCell>

      {/* Date */}
      <TableCell className="text-muted-foreground">
        {formatDate(order.date)}
      </TableCell>

      {/* Items Count */}
      <TableCell>
        <div className="flex items-center gap-1">
          <FiPackage className="w-4 h-4 text-muted-foreground" />
          <span>
            {order.items} item{order.items !== 1 ? "s" : ""}
          </span>
        </div>
      </TableCell>

      {/* Total Amount */}
      <TableCell className="font-semibold text-foreground">
        ${order.total.toFixed(2)}
      </TableCell>

      {/* Payment Method & Status */}
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {getPaymentMethodLabel(order.paymentMethod)}
          </span>
          <Badge
            variant={paymentConfig.variant}
            className={`w-fit text-xs ${paymentConfig.className}`}
          >
            {paymentConfig.label}
          </Badge>
        </div>
      </TableCell>

      {/* Order Status */}
      <TableCell>
        <Badge
          variant={statusConfig.variant}
          className={`capitalize ${statusConfig.className}`}
        >
          {order.status}
        </Badge>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView?.(order)}
            className="h-8 w-8 text-primary hover:text-primary-hover hover:bg-primary/10"
          >
            <IoEye className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(order.id)}
            className="h-8 w-8 text-destructive hover:text-destructive-hover hover:bg-destructive/10"
          >
            <IoTrash className="w-4 h-4" />
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
              <DropdownMenuItem onClick={() => onView?.(order)}>
                <IoEye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(order)}>
                <FiEdit className="w-4 h-4 mr-2" />
                Edit Order
              </DropdownMenuItem>
              {order.trackingNumber && (
                <DropdownMenuItem>
                  <FiTruck className="w-4 h-4 mr-2" />
                  Track Shipment
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDownloadInvoice?.(order.id)}>
                <IoDownload className="w-4 h-4 mr-2" />
                Download Invoice
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(order.id)}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <IoTrash className="w-4 h-4 mr-2" />
                Delete Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
