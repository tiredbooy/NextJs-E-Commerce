import { QueryParams } from "../types";
import { OrdersResponse } from "../types/order_types";
import { PaginatedUserResponse } from "../types/user_types";
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

type UserQueryParam = Pick<
  QueryParams,
  "page" | "limit" | "search" | "sortBy" | "orderBy" | "joined"
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

export async function getUserOrders(
  params: OrderQueryParam = {}
): Promise<OrdersResponse> {
  try {
    const query = buildQuery(params);

    const data = await authenticatedRequest({
      method: "GET",
      url: `/api/orders${query}`,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Could not get Orders at this time.");
  }
}

export async function getProducts(params: ProductQueryParam = {}) {
  try {
    const query = buildQuery(params);
    await new Promise((res) => {
      setTimeout(() => res,5000)
    })

    const data = await authenticatedRequest({
      method: "GET",
      url: `/api/products${query}`,
    });

    return data;
  } catch (e: any) {
    throw new Error(e.message || "Could not get Products at this time.");
  }
}

export async function getUsers(
  params: UserQueryParam
): Promise<PaginatedUserResponse> {
  try {
    const query = buildQuery(params);

    const data = await authenticatedRequest({
      method: "GET",
      url: `/api/admin/users${query}`,
    });

    return data;
  } catch (e: any) {
    throw new Error(e.message || "Could not get Users at this time.");
  }
}
