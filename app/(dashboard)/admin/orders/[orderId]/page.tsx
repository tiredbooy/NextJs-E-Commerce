import OrderDetails from "@/app/_components/account/dashboard/admin/orders/order-details/OrderDetail";
import OrderLayout from "@/app/_components/account/dashboard/admin/orders/order-details/OrderLayout";
import { Breadcrumb } from "@/app/_components/reusable/BreadCrump";
import { getOrder } from "@/app/_lib/services/orderServices";
import { getAddress, getUserById } from "@/app/_lib/services/userService";
import { Order } from "@/app/_lib/types/order_types";

interface Props {
  params: { orderId: string };
}

export default async function page({ params }: Props) {
  const { orderId } = await params;
  const order: Order = await getOrder(Number(orderId));

  const [address, user] = await Promise.all([
    order.shipping_address_id ? getAddress(order.shipping_address_id) : null,
    order.user_id ? getUserById(order.user_id) : null,
  ]);
  return (
    <>
      <Breadcrumb />
      <OrderLayout title={`Order #${order.id}`}>
        <OrderDetails
          order={order}
          address={address || undefined}
          user={user || undefined}
          viewMode="admin"
        />
      </OrderLayout>
    </>
  );
}
