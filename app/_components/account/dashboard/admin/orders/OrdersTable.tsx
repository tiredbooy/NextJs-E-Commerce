import { getOrders } from "@/app/_lib/services/services";
import { Order } from "@/app/_lib/types/order_types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderTableRow from "./OrderTableRow";

type Props = {
  orders: Order[]
}

export default async function OrdersTable({ orders}: Props) {
 
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order: Order) => (
          <OrderTableRow order={order} key={order.id} />
        ))}
      </TableBody>
    </Table>
  );
}
