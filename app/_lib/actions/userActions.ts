"use server";
import { revalidatePath } from "next/cache";
import {
  addCartItemReq,
  addProductToFavoriteReq,
} from "../services/userService";
import { CartItemReq } from "../types";

export async function addCartItem(req: CartItemReq) {
  try {
    const result = await addCartItemReq(req);
    if (!result.id) throw new Error("failed to add item to cart");

    revalidatePath("/cart");
    return { success: true, message: "Item Added to cart" };
  } catch (e: any) {
    console.error("Error in adding cart item action:", e.message);
    return { success: false, message: "Failed to Item Added to cart" };
  }
}

export async function addProductToFavorites(productId: number) {
  try {
    const result = await addProductToFavoriteReq(productId);
    console.log("result:", result);

    if (result.message) {
      return { success: true, message: result.message };
    }
    return { success: true, message: "Product Added to favorites" };
  } catch (e: any) {
    console.log('e:', e.message);
    return { success: false, message: "Failed to Add Product to favorites!" };
  }
}
