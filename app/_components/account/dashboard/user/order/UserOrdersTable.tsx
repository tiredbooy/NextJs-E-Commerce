import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderTableRow from "./UserOrderTableRow";
import { getUserOrders, OrderQueryParam } from "@/app/_lib/services/services";
import { Order } from "@/app/_lib/types/order_types";

interface Props {
  queries?: Omit<OrderQueryParam, "limit">;
}

export default async function UserOrdersTable({ queries }: Props) {
  const ordersData = await getUserOrders(queries);
  
  const orders = ordersData.orders || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order Id</TableHead>
          <TableHead>Total Items</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: Order) => (
          <OrderTableRow key={order.id} order={order} />
        ))}
      </TableBody>
    </Table>
  );
}
