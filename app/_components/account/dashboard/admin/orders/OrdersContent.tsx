import { getOrders, OrderQueryParam } from "@/app/_lib/services/services";
import OrdersTable from "./OrdersTable";

interface Props {
  // props here
  queries?: Omit<OrderQueryParam, "limit">;
}

export default async function OrdersContent({
  queries = { page: 1, status: "all" },
}: Props) {
  const { page = 1, status = "all", from, to, user, total } = queries || {};
  const currentPage = page ? page : 1;

  const fixedStatus = status === "all" ? "" : status;

  const ordersRes = await getOrders({
    limit: 10,
    page: currentPage,
    status: fixedStatus,
    from,
    to,
    user,
    total,
  });
  const orders = ordersRes?.orders;

  return (
    <div className="">
      <OrdersTable orders={orders} />
    </div>
  );
}
