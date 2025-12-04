"use server"
import { revalidatePath } from "next/cache";
import { createCouponReq, createOrderReq } from "../services/orderServices";
import { CreateCouponReq, CreateOrderReq } from "../types/order_types";
import { redirect } from "next/navigation";


export async function createOrder(req: CreateOrderReq) {
    console.log('req:', req);
    try {
        const result = await createOrderReq(req);
        return {success: true, message: "Order Created.", orderID: result.id}
    }
    catch(e: any) {
        return {success: false, message: e.message || "Failed to create order"}
    }
}

export async function createCoupon(req: CreateCouponReq) {
    try {
        const result = await createCouponReq(req);

        revalidatePath("/admin/coupons/")
        return result
    }
    catch(e: any) {
        throw new Error(e.message || "Failed to create Coupon")
    }
}