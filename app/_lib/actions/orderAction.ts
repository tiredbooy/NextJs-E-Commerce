"use server"
import { createOrderReq } from "../services/orderServices";
import { CreateOrderReq } from "../types/order_types";


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