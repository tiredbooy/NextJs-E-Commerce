"use server";
import { revalidatePath } from "next/cache";
import {
  cancelOrderReq,
  createCouponReq,
  createOrderReq,
  getCouponReq,
  updateOrderStatusReq,
} from "../services/orderServices";
import {
  CreateCouponReq,
  CreateOrderReq,
  OrderStatus,
} from "../types/order_types";
import { clearCart } from "../services/userService";

export async function createOrder(req: CreateOrderReq) {
  try {
    await createOrderReq(req);

    await clearCart();
    revalidatePath("/cart");
    revalidatePath("/admin/orders");
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, message: "Order Created."};
  } catch (e: any) {
    return { success: false, message: e.message || "Failed to create order" };
  }
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
  try {
    const result = await updateOrderStatusReq(id, status);

    revalidatePath(`/admin/orders`);
    revalidatePath(`/admin/orders/${id}`);
    return { success: true, message: "Order Status Updated", result };
  } catch (e: any) {
    return {
      success: false,
      message: e.message || "Failed to update order status",
    };
  }
}

export async function cancelOrder(id: number) {
  try {
    const result = await cancelOrderReq(id);
    revalidatePath("/admin/orders");
    revalidatePath("/account/orders");
    return { success: true, message: "Order Cancelled" };
  } catch (e: any) {
    return { success: false, message: e.message || "Failed to cancel Order" };
  }
}

export async function createCoupon(req: CreateCouponReq) {
  try {
    const result = await createCouponReq(req);

    revalidatePath("/admin/coupons/");
    return result;
  } catch (e: any) {
    throw new Error(e.message || "Failed to create Coupon");
  }
}

export async function getCoupon(code: string) {
  try {
    const result = await getCouponReq(code);
    return { success: true, result };
  } catch (e: any) {
    return { success: false, message: "Coupon is Invalid" };
  }
}
