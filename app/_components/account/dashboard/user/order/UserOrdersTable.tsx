// UserOrdersTable.tsx (Server Component)
import { Order } from "@/app/_lib/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderTableRow from "./UserOrderTable";

const orders: Order[] = [
  {
    id: 1,
    order_id: 1223,
    items: [
      {
        id: 1,
        name: "black T-shirt",
        price: 100,
        quantity: 3,
        subtotal: 300,
      },
    ],
    total_price: 475,
    user_id: 1,
    payment_method: "card",
    status: "completed",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    order_id: 1224,
    items: [
      {
        id: 1,
        name: "black suit",
        price: 865,
        quantity: 3,
        subtotal: 2540,
      },
    ],
    total_price: 2540,
    user_id: 1,
    payment_method: "card",
    status: "paid",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    order_id: 1225,
    items: [
      {
        id: 1,
        name: "Jean Paul Gaultier Le Beau",
        price: 2314,
        quantity: 1,
        subtotal: 2314,
      },
    ],
    total_price: 2314,
    user_id: 1,
    payment_method: "card",
    status: "pending",
    created_at: new Date().toISOString(),
  },
];

function UserOrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Id</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <OrderTableRow key={order.id} order={order} />
        ))}
      </TableBody>
    </Table>
  );
}

export default UserOrdersTable;
