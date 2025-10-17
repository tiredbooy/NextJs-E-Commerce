"use client";

import { Order } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OrderTableRowProps {
  order: Order;
}

function OrderTableRow({ order }: OrderTableRowProps) {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => router.push(`/account/orders/${order.order_id}`)}
    >
      <TableCell>
        <Link
          href={`/account/orders/${order.order_id}`}
          className="font-medium hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          #{order.order_id}
        </Link>
      </TableCell>
      <TableCell className="capitalize">{order.payment_method}</TableCell>
      <TableCell>${order.total_price.toLocaleString()}</TableCell>
      <TableCell>
        {new Date(order.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Badge
          variant={
            order.status === "paid"
              ? "default"
              : order.status === "completed"
              ? "default"
              : "secondary"
          }
          className={
            order.status === "completed"
              ? "bg-green-600 hover:bg-green-700"
              : order.status === "pending"
              ? "bg-yellow-600 hover:bg-yellow-700"
              : ""
          }
        >
          {order.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

export default OrderTableRow;