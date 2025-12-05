import { Order } from "@/app/_lib/types/order_types";
import { formatDate } from "@/app/_lib/utils/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import OrderActionBtns from "./OrderActionBtns";
import { StatusBadge } from "./order-details/StatusBadge";

interface Props {
  order: Order;
}

export default function OrderTableRow({
  order,
}: Props) {

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
            {order.customer?.first_name} - {order.customer?.last_name}
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

      <TableCell className="font-semibold text-foreground">
        ${order.total_price.toFixed(2)}
      </TableCell>

      <TableCell>
        <StatusBadge status={order.status} />
      </TableCell>

      <TableCell>
        <OrderActionBtns currentStatus={order.status} orderId={order.id} />
      </TableCell>
    </TableRow>
  );
}
