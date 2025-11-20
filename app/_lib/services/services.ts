import { QueryParams } from "../types";
import { OrdersResponse } from "../types/order_types";
import { buildQuery } from "../utils/utils";
import { authenticatedRequest } from "./authService";

type OrderQueryParam = Pick<
  QueryParams,
  "limit" | "page" | "status" | "total" | "user" | "from" | "to"
>;

type ProductQueryParam = Pick<
  QueryParams,
  | "limit"
  | "page"
  | "category"
  | "brand"
  | "search"
  | "minPrice"
  | "maxPrice"
  | "sortBy"
  | "sortOrder"
>;

export async function getOrders(
  params: OrderQueryParam = {}
): Promise<OrdersResponse> {
  try {
    const query = buildQuery(params);

    const data = await authenticatedRequest({
      method: "GET",
      url: `/api/admin/orders${query}`,
    });

    return data;
  } catch (e: any) {
    throw new Error(e.message || "Could not get Orders at this time.");
  }
}

export async function getProducts(params: ProductQueryParam = {}) {
  try {
    const query = buildQuery(params);

    const data = await authenticatedRequest({
      method: "GET",
      url: `/api/products${query}`,
    });

    return data;
  } catch (e: any) {
    throw new Error(e.message || "Could not get Orders at this time.");
  }
}
