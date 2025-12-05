import { OrderStatus } from "../types/order_types";

export const orderHelpers = {
  formatDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  formatPrice: (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  },

  getStatusColor: (status: OrderStatus): string => {
    const colors: Record<OrderStatus, string> = {
      pending: "bg-warning/10 text-warning border-warning/20",
      processing: "bg-info/10 text-info border-info/20",
      shipped: "bg-primary/10 text-primary border-primary/20",
      completed: "bg-success/10 text-success border-success/20",
      cancelled: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return colors[status] || colors.pending;
  },

  calculateSubtotal: (
    items: Array<{ quantity: number; price_at_purchase: number }>
  ): number => {
    return items.reduce(
      (sum, item) => sum + item.quantity * item.price_at_purchase,
      0
    );
  },

  formatFullName: (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`.trim();
  },

  formatAddress: (address: {
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }): string => {
    return `${address.address}, ${address.city}, ${address.state} ${address.postal_code}, ${address.country}`;
  },
};

export const orderStatusUtils = {
  /**
   * Get the next status in the order lifecycle
   */
  getNextStatus(currentStatus: OrderStatus): OrderStatus | null {
    const statusFlow: Record<OrderStatus, OrderStatus | null> = {
      pending: "processing",
      processing: "shipped",
      shipped: "completed",
      completed: null,
      cancelled: null,
    };

    return statusFlow[currentStatus];
  },

  /**
   * Check if an order status can be changed
   */
  canChangeStatus(status: OrderStatus): boolean {
    return status !== "completed" && status !== "cancelled";
  },

  /**
   * Get all possible status transitions for a given status
   */
  getPossibleTransitions(currentStatus: OrderStatus): OrderStatus[] {
    const transitions: Record<OrderStatus, OrderStatus[]> = {
      pending: ["processing", "cancelled"],
      processing: ["shipped", "cancelled"],
      shipped: ["completed"],
      completed: [],
      cancelled: [],
    };

    return transitions[currentStatus] || [];
  },

  /**
   * Get status display information
   */
  getStatusInfo(status: OrderStatus) {
    const statusInfo: Record<OrderStatus, { label: string; variant: string }> =
      {
        pending: { label: "Pending", variant: "warning" },
        processing: { label: "Processing", variant: "info" },
        shipped: { label: "Shipped", variant: "default" },
        completed: { label: "Completed", variant: "success" },
        cancelled: { label: "Cancelled", variant: "destructive" },
      };

    return statusInfo[status];
  },
};
