import {
  Coupon,
  CreateCouponReq,
  CreateOrderReq,
  OrderStatus,
} from "../types/order_types";
import { authenticatedRequest } from "./authService";

export async function createOrderReq(req: CreateOrderReq) {
  try {
    const response = await authenticatedRequest({
      method: "POST",
      url: "/api/orders",
      data: req,
    });

    return response;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getOrder(id: number) {
  try {
    const response = await authenticatedRequest({
      method: "GET",
      url: `/api/orders/${id}`,
    });
    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to get Order");
  }
}

export async function updateOrderStatusReq(id: number, status: OrderStatus) {
  try {
    const response = await authenticatedRequest({
      method: "PATCH",
      url: `/api/admin/orders/${id}`,
      data: { status },
    });
    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to update order status");
  }
}

export async function cancelOrderReq(id: number) {
  try {
    const response = await authenticatedRequest({
      method: "PATCH",
      url: `/api/orders/${id}`,
    });
    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to Cancel Order");
  }
}

export async function getCoupons(): Promise<Coupon[]> {
  try {
    const response = await authenticatedRequest({
      method: "GET",
      url: "/api/admin/coupons",
    });
    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed To Fetch Coupons");
  }
}

export async function getCouponReq(code: string): Promise<Coupon> {
  const respone = await authenticatedRequest({
    method: "GET",
    url: `/api/coupons/${code}`,
  });
  return respone.coupon;
}

export async function createCouponReq(req: CreateCouponReq) {
  try {
    const response = await authenticatedRequest({
      method: "POST",
      url: "/api/admin/coupons",
      data: req,
    });
    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to Create Coupon");
  }
}
