// components/StatusBadge.tsx
import { OrderStatus } from "@/app/_lib/types/order_types";
import { orderHelpers } from "@/app/_lib/utils/orderHelpers";
import { CgSandClock } from "react-icons/cg";
import { FaCheckCircle, FaTimesCircle, FaTruck, FaTruckLoading } from "react-icons/fa";

interface StatusBadgeProps {
  status: OrderStatus;
  showIcon?: boolean;
  className?: string;
}

/**
 * Presenter Component: Displays order status with consistent styling
 * Single Responsibility: Only handles status visualization
 */
export function StatusBadge({
  status,
  showIcon = true,
  className = "",
}: StatusBadgeProps) {
  const colorClass = orderHelpers.getStatusColor(status);
  let icon;
  switch(status) {
    case "pending" :
      icon = <CgSandClock />
      break;
    case "processing" : 
      icon = <FaTruckLoading />
      break;
    case "completed" : 
      icon = <FaCheckCircle />
      break;
    case "shipped" : 
      icon = <FaTruck />
      break;
    case "cancelled" : 
      icon = <FaTimesCircle />
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${colorClass} ${className}`}
    >
      {showIcon && <span className="text-base">{icon}</span>}
      <span className="capitalize">{status}</span>
    </span>
  );
}
