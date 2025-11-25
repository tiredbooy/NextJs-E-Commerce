import { AdminOrder, CustomerDataForAdminOrder, QueryParams } from "../types";
import { OrdersResponse } from "../types/order_types";
import { PaginatedUserResponse, User } from "../types/user_types";
import { buildQuery } from "../utils/utils";
import { authenticatedRequest } from "./authService";

export type OrderQueryParam = Pick<
  QueryParams,
  "limit" | "page" | "status" | "total" | "user" | "from" | "to"
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
    console.log('e:', e);
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

export async function getUser(userId: number): Promise<User> {
  try {
    const data = await authenticatedRequest({
      method : "GET",
      url : `/api/admin/users/${userId}`
    })

    return data
  }
  catch(e : any) {
    throw new Error(e.message || "Could not get user at this time.")
  }
}