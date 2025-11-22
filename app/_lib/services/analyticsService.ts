import { PopularChartItem } from "../types";
import { EndpointStat, StatData } from "../types/analytics_types";
import { authenticatedRequest, getCurrentSession } from "./authService";

export async function getRevenueStats(): Promise<StatData> {
  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/revenue",
  });

  const data = await response;

  return { value: data?.current_revenue, change: data?.change_percent };
}

export async function getOrderStats(): Promise<StatData> {
  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/orders",
  });

  const data = await response;

  return { value: data?.current_count, change: data?.change_percent };
}

export async function getCustomerGrowthStats(): Promise<StatData> {
  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/users",
  });

  const data = await response;

  return { value: data?.current_count, change: data?.change_percent };
}

export async function getSalesStats(): Promise<StatData> {
  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/sales",
  });

  const data = await response;

  return { value: data?.current_count, change: data?.change_percent };
}

export async function getPopularCategories(): Promise<PopularChartItem[]> {
  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/categories?limit=5",
  });

  const data: { title: string; sales: number }[] = await response;

  return data?.map((item) => ({ name: item.title, value: item.sales }));
}

export async function getPopularProducts(): Promise<PopularChartItem[]> {
  const response = await authenticatedRequest({
    method: "GET",
    url: "/api/admin/analytics/products?limit=5",
  });

  const data: { product_name: string; current_sold: number }[] = await response;

  return data?.map((item) => ({
    name: item.product_name,
    value: item.current_sold,
  }));
}

export async function getApiEndPointsAnalytics(): Promise<EndpointStat[]> {
  try {
    const res = await authenticatedRequest({
      method: "GET",
      url: "/api/admin/analytics/endpoints",
    });

    return res.data;
  } catch (e: any) {
    throw new Error(e.message || "Could not fetch Endpoints analytics.");
  }
}

export async function getApiDailyTrends() {
  try {
    const res = await authenticatedRequest({
      method: "GET",
      url: "/api/admin/analytics/trends",
    });
    return res.data;
  } catch (e: any) {
    throw new Error(e.message || "Could not fetch Endpoints analytics.");
  }
}
