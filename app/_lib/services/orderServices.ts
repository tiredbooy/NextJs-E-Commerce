import { Coupon, CreateCouponReq, CreateOrderReq } from "../types/order_types";
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
