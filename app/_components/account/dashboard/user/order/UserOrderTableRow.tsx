"use client";

import { Order } from "@/app/_lib/types/order_types";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderActionBtns from "../../admin/orders/OrderActionBtns";
import { StatusBadge } from "../../admin/orders/order-details/StatusBadge";

interface OrderTableRowProps {
  order: Order;
}

function OrderTableRow({ order }: OrderTableRowProps) {
  const {id, items, total_price, created_at, status} = order
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => router.push(`/account/orders/${id}`)}
    >
      <TableCell>
        <Link
          href={`/account/orders/${id}`}
          className="font-medium hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          #{id}
        </Link>
      </TableCell>
      <TableCell className="capitalize">{}2</TableCell>
      <TableCell>${total_price.toLocaleString()}</TableCell>
      <TableCell>
        {new Date(created_at).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <StatusBadge status={status} />
      </TableCell>
      <TableCell className="capitalize"><OrderActionBtns orderId={id} currentStatus={status} role="user" /></TableCell>
    </TableRow>
  );
}

export default OrderTableRow;