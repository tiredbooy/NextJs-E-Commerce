import { CreateOrderReq } from "../types/order_types";
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
