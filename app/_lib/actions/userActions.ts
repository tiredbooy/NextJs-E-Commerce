"use server";
import { revalidatePath } from "next/cache";
import {
  addCartItemReq,
  addProductToFavoriteReq,
  removeCartItemReq,
  removeFromFavoritesReq,
  updateAddressReq,
  updateQuantityReq,
  updateUserReq,
} from "../services/userService";
import { CartItemReq } from "../types";
import { Address, UpdateUserReq } from "../types/user_types";

export async function updateUserProfile( data: UpdateUserReq) {
  try {
    const result = await updateUserReq(data)

    revalidatePath("/account/profile")
    return {success: true, message: "Profile Updated Successfully!", username: result?.first_name}
  }
  catch(e: any) {
    return {success: false, message: "Failed to update Profile"}
  }
}

export async function updateAddress(id: number, data: Partial<Address>) {
  try {
    const result = await updateAddressReq(id, data)

    revalidatePath("/account/profile")
    return {success: true, message: "Profile Updated Successfully!"}
  }
  catch(e: any) {
    return {success: false, message: "Failed to update Profile"}
  }
}

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

export async function removeCartItem(id: number) {
  try {
    const result = await removeCartItemReq(id)

    revalidatePath("/cart")
    return {success: true, message: result}
  }catch(e: any) {
    return {success: false, message: e.message || "somethign went wrong"}
  }
}

export async function updateQuantity(id: number, quantity: number) {
  try {
    const result = await updateQuantityReq(id, quantity)

    revalidatePath("/cart")
    return {success: true, message: result}
  }catch(e: any) {
    return {success: false, message: e.message || "somethign went wrong"}
  }
}

export async function removeFavoriteProduct(id: number) {
  try {
    const result = await removeFromFavoritesReq(id)
    revalidatePath("/account/favorites")
    return {success:  true, message: "Product Removed From Favorites"}
  }
  catch(e: any) {
    return {success : false, message: e.message || "Failed To Remove Product From Favorites"}
  }
}