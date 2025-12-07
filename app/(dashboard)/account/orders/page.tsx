import UserOrderManagment from "@/app/_components/account/dashboard/user/order/UserOrderManagment";

interface Props {
  searchParams: {
    page: string;
    status: string;
    total: string;
    from: string;
    to: string;
  };
}

async function page({ searchParams }: Props) {
  const { page, status, total, from, to } = await searchParams;
  const fixedStatus = status === "all" ? "" : status;

  const queries = {
    page: Number(page),
    status: fixedStatus,
    total: Number(total),
    from,
    to,
  };

  return <UserOrderManagment queries={queries} />;
}

export default page;
