import { Order } from "@/app/_lib/types/order_types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoWarning } from "react-icons/io5";
import OrderTableRow from "./OrderTableRow";

type Props = {
  orders: Order[];
};

export default async function OrdersTable({ orders }: Props) {
  return (
    <>
      {orders && orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
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
      ) : (
        <div className="bg-destructive text-background px-4 py-2 rounded-md font-semibold flex flex-row gap-2 items-center justify-center">
          <IoWarning />
          <span>There is No Orders At this time.</span>
        </div>
      )}
    </>
  );
}
