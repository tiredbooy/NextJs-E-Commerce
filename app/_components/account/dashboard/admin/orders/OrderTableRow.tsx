import { Order } from "@/app/_lib/types/order_types";
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

interface Props {
  order: Order;
  onView?: (order: Order) => void;
  onEdit?: (order: Order) => void;
  onDelete?: (orderId: number) => void;
  onDownloadInvoice?: (orderId: number) => void;
}

export default function OrderTableRow({
  order,
  onView,
  onEdit,
  onDelete,
  onDownloadInvoice,
}: Props) {


  
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
