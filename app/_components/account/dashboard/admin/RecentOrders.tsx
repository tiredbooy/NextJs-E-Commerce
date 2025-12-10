import { getOrders } from "@/app/_lib/services/services";
import { formatDate } from "@/app/_lib/utils/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderActionBtns from "./orders/OrderActionBtns";
import { StatusBadge } from "./orders/order-details/StatusBadge";

interface Props {
  // props here
}

const RecentOrders: React.FC<Props> = async ({}) => {
  const ordersData = await getOrders({ limit: 10, page: 1, status : "pending" });
  const orders = ordersData?.orders || [];

  if (orders.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              Recent Pending Orders
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5">
              Latest orders from your customers
            </p>
          </div>
          <button className="text-xs font-medium text-primary hover:underline">
            View All
          </button>
        </div>
      </div>
      <div className="p-6 pt-0">
        <Table>
          <TableCaption>Recent Orders List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#Order ID</TableHead>
              <TableHead>username</TableHead>
              <TableHead>phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow className="cursor-pointer" key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell className="first-letter:uppercase">
                  {order?.customer?.first_name}-{order?.customer?.last_name}
                </TableCell>
                <TableCell>{order.customer.phone}</TableCell>
                <TableCell><StatusBadge status={order.status} /></TableCell>
                <TableCell>${Number(order.total_price).toLocaleString()}</TableCell>
                <TableCell>
                  {formatDate(order.created_at)} -{" "}
                  {new Date(order.created_at).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  <OrderActionBtns currentStatus={order.status} orderId={order.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default RecentOrders;
