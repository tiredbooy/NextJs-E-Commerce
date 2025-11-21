import OrderManagment from "@/app/_components/account/dashboard/admin/orders/OrderManagment";
import { OrderQueryParam } from "@/app/_lib/services/services";

interface Props {
  // props here
  searchParams: {
    page: number;
    status: string;
    from: string;
    to: string;
    total: number;
    user: number;
  };
}

export default function page({ searchParams }: Props) {
  const { page, status, from, to, total, user } = searchParams;
  const queries: OrderQueryParam = {
    page: Number(page) ?? 1,
    status,
    from,
    to,
    total: total ? Number(total) : 0,
    user: user ? Number(user) : 0,
  };
  return <OrderManagment queries={queries} />;
}
