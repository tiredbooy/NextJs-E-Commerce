import { CartItemReq } from "../types";
import { authenticatedRequest } from "./authService";

export async function getUserCart() {
  try {
    const result = await authenticatedRequest({
      method: "GET",
      url: "/api/cart",
    });

    return await result;
  } catch (e: any) {
    throw new Error(e.message || "Something went worng!");
  }
}

export async function addCartItemReq(req: CartItemReq) {
  try {
    const response = await authenticatedRequest({
      method: "POST",
      url: "/api/cart/items",
      data: req,
    });

    return response;
  } catch (e: any) {
    throw new Error("Something went worng!", e.message);
  }
}

export async function addProductToFavoriteReq(productId: number) {
    try {
        const response = await authenticatedRequest({
            method: "POST",
            url: "/api/favorites",
            data: {product_id: productId}
        })

        return response;
    }
    catch(e: any) {
        throw new Error( e.message)
    }
}