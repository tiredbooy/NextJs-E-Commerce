"use client"
import { Order } from "@/app/_lib/types/order_types";
import { formatDate } from "@/app/_lib/utils/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { FiEdit } from "react-icons/fi";
import {
  IoDownload,
  IoEllipsisVertical,
  IoEye,
  IoTrash,
} from "react-icons/io5";
import OrderActionBtns from "./OrderActionBtns";

interface Props {
  order: Order;
}

export default function OrderTableRow({
  order,
}: Props) {


  
  
  
  // Get status badge variant and styling
  const getStatusConfig = (status: Order["status"]) => {
    switch (status) {
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
  const statusConfig = getStatusConfig(order.status);

 

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
            {order.customer?.first_name} - {order.customer?.first_name}
          </span>
          <span className="text-xs text-muted-foreground">
            {order.customer?.email}
          </span>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">
        {order.customer?.phone}
      </TableCell>

      {/* Date */}
      <TableCell className="text-muted-foreground">
        {formatDate(order.created_at)}
      </TableCell>

      <TableCell className="font-semibold text-foreground">
        {Number(order?.items)}
      </TableCell>

      {/* Total Amount */}
      <TableCell className="font-semibold text-foreground">
        ${order.total_price.toFixed(2)}
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
        <OrderActionBtns orderId={order.id} />
      </TableCell>
    </TableRow>
  );
}
