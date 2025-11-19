import { getSession } from "../auth";
import { StatData } from "../types/analytics_types";
import { authenticatedRequest } from "./authService";

export async function getRevenueStats(): Promise<StatData> {
  const session = await getSession();

  if (!session || !session.access) {
    return { value: 0, change: 0 };
  }

  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/revenue",
  });

  const data = await response;

  return { value: data?.current_revenue, change: data?.change_percent };
}

export async function getOrderStats(): Promise<StatData> {
  const session = await getSession();

  if (!session || !session.access) {
    return { value: 0, change: 0 };
  }

  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/orders",
  });

  const data = await response;

  return { value: data?.current_count, change: data?.change_percent };
}

export async function getCustomerGrowthStats(): Promise<StatData> {
  const session = await getSession();

  if (!session || !session.access) {
    return { value: 0, change: 0 };
  }

  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/users",
  });

  const data = await response;

  return { value: data?.current_count, change: data?.change_percent };
}

export async function getSalesStats(): Promise<StatData> {
  const session = await getSession();

  if (!session || !session.access) {
    return { value: 0, change: 0 };
  }

  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/sales",
  });

  const data = await response;

  return { value: data?.current_count, change: data?.change_percent };
}
