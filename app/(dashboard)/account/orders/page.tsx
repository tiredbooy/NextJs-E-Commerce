import UserOrdersTable from "@/app/_components/account/dashboard/user/order/UserOrdersTable";

function page ({  }) {
  return (
    <div className="flex flex-col gap-5 px-6 py-4">
      <h1 className="font-semibold text-3xl">Orders</h1>
      <UserOrdersTable />
    </div>
  );
};

export default page;