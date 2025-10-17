import { RecentOrder } from "@/app/_lib/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
  // props here
}

const recentOrders: RecentOrder[] = [
  {
    id: 1,
    orderId: 2314,
    status: "paid",
    payment_method: "card",
    amount: 3456.99,
  },
  {
    id: 2,
    orderId: 2315,
    status: "paid",
    payment_method: "card",
    amount: 114,
  },
  {
    id: 3,
    orderId: 2316,
    status: "pending",
    payment_method: "card",
    amount: 1754,
  },
  {
    id: 4,
    orderId: 2317,
    status: "completed",
    payment_method: "card",
    amount: 1754,
  },
  {
    id: 5,
    orderId: 2317,
    status: "completed",
    payment_method: "card",
    amount: 1754,
  },
  {
    id: 6,
    orderId: 2317,
    status: "completed",
    payment_method: "card",
    amount: 1754,
  },
  {
    id: 7,
    orderId: 2317,
    status: "completed",
    payment_method: "card",
    amount: 1754,
  },
  {
    id: 9,
    orderId: 2317,
    status: "completed",
    payment_method: "card",
    amount: 1754,
  },
];

const RecentOrders: React.FC<Props> = ({}) => {
  return (
    <Table>
      <TableCaption>Recent Orders List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#Order ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.slice(0, 8).map((order) => (
          <TableRow className="cursor-pointer" key={order.id}>
            <TableCell className="font-medium">#{order.orderId}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell className="first-letter:uppercase">
              {order.payment_method}
            </TableCell>
            <TableCell className="">${order.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentOrders;
