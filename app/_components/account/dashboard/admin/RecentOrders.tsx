import { getOrders } from "@/app/_lib/services/services";
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

const RecentOrders: React.FC<Props> = async ({}) => {
  const ordersData = await getOrders({ limit: 10, page: 1 });
  const orders = ordersData?.orders || [];

  if (orders.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              Recent Orders
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
              <TableHead>UserName</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow className="cursor-pointer" key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell className="first-letter:uppercase">{}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="">${order.total_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentOrders;
