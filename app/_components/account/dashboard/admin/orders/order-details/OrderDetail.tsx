import { OrderHeader } from "./OrderHeader";
import { Order } from "@/app/_lib/types/order_types";
import { Address, User } from "@/app/_lib/types/user_types";
import { OrderItemsSection } from "./OrderItemsSection";
import { AddressSection } from "./AddressSection";
import { OrderSummary } from "./OrderSummary";
import { CustomerSection } from "./CustomerSection";

interface OrderDetailsProps {
  order: Order;
  address?: Address;
  user?: User;
  viewMode: "user" | "admin";
}

export default function OrderDetails({
  order,
  address,
  user,
  viewMode,
}: OrderDetailsProps) {
  const isAdmin = viewMode === "admin";

  return (
    <div className="space-y-6">
      {/* Header Section - Always visible */}
      <OrderHeader
        order={order}
        viewMode={viewMode}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsSection items={order.items || []} />

          {address && <AddressSection address={address} />}
        </div>

        {/* Right Column - Summary & Admin Info */}
        <div className="space-y-6">
          <OrderSummary order={order} />

          {/* Admin-only: Customer Information */}
          {isAdmin && user && <CustomerSection user={user} />}
        </div>
      </div>
    </div>
  );
}
