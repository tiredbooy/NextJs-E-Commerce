import { getOrders, OrderQueryParam } from "@/app/_lib/services/services";
import OrdersTable from "./OrdersTable";
import Pagination from "@/app/_components/reusable/Pagination";

interface Props {
  // props here
  queries?: Omit<OrderQueryParam, "limit">;
}

export default async function OrdersContent({
  queries = { page: 1, status: "all" },
}: Props) {
  const { page, status = "all", from, to, user, total } = queries || {};
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
  const totalPages = ordersRes?.total_pages;

  return (
    <div className="flex flex-col gap-y-5">
      <OrdersTable orders={orders} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={ordersRes.has_next}
          hasPrev={ordersRes.has_prev}
        />
      )}
    </div>
  );
}
