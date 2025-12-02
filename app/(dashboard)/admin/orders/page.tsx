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

export default async function page({ searchParams }: Props) {
  const { page, status, from, to, total, user } = await searchParams;
  const queries: OrderQueryParam = {
    page: Number(page) ?? 1,
    status,
    from,
    to,
    total: total ,
    user: user
  };
  return <OrderManagment queries={queries} />;
}
