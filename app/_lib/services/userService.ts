import { CartItemReq } from "../types";
import {
  Address,
  CreateAddressReq,
  Favorites,
  UpdateUserReq,
  User,
} from "../types/user_types";
import { authenticatedRequest } from "./authService";

export async function getUserById(id: number): Promise<User> {
  try {
    const result = await authenticatedRequest({
      method: "GET",
      url: `/api/admin/users/${id}`,
    });
    return result;
  } catch (e: any) {
    throw new Error(e.message || "Failed to get user");
  }
}

export async function updateUserReq(data: UpdateUserReq): Promise<User> {
  try {
    const response = await authenticatedRequest({
      method: "PATCH",
      url: `/api/auth/profile`,
      data,
    });
    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to update user profile");
  }
}

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
      data: { product_id: productId },
    });

    return response;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getUserFavorites(): Promise<Favorites[]> {
  try {
    const result = await authenticatedRequest({
      method: "GET",
      url: "/api/favorites",
    });

    return await result;
  } catch (e: any) {
    throw new Error(e.message || "Something went worng!");
  }
}

export async function removeFromFavoritesReq(id: number) {
   try {
    const result = await authenticatedRequest({
      method: "DELETE",
      url: `/api/favorites/${id}`,
    });

    return await result;
  } catch (e: any) {
    throw new Error(e.message || "Something went worng!");
  }
}

export async function removeCartItemReq(id: number) {
  try {
    const result = await authenticatedRequest({
      method: "DELETE",
      url: `/api/cart/items/${id}`,
    });

    return result.message;
  } catch (e: any) {
    throw new Error("Could not remove item");
  }
}

export async function clearCart() {
  try {
    const result = await authenticatedRequest({
      method: "DELETE",
      url: `/api/cart/`,
    });

    return result.message;
  } catch (e: any) {
    throw new Error("Could not remove item");
  }
}

export async function updateQuantityReq(id: number, quantity: number) {
  try {
    const result = await authenticatedRequest({
      method: "PATCH",
      url: `/api/cart/items/${id}`,
      data: { quantity },
    });

    return result.message;
  } catch (e: any) {
    throw new Error("Could not remove item");
  }
}

export async function getAddress(id: number): Promise<Address> {
  try {
    const result = await authenticatedRequest({
      method: "GET",
      url: `/api/addresses/${id}`,
    });
    return result;
  } catch (e: any) {
    throw new Error("Could not Get Address at this time");
  }
}

export async function getUserAddress(): Promise<Address> {
  try {
    const result = await authenticatedRequest({
      method: "GET",
      url: "/api/addresses",
    });

    return result?.[0] || [];
  } catch (e: any) {
    throw new Error(e.message || "Failed to Get Address");
  }
}

export async function updateAddressReq(
  id: number,
  data: Partial<Address>
): Promise<Address> {
  try {
    const result = await authenticatedRequest({
      method: "PATCH",
      url: `/api/addresses/${id}`,
      data,
    });
    return result;
  } catch (e: any) {
    throw new Error("Could not update Address at this time");
  }
}

export async function createAddress(
  data: Partial<CreateAddressReq>
): Promise<Address> {
  try {
    const result = await authenticatedRequest({
      method: "POST",
      url: `/api/addresses/`,
      data,
    });
    return result;
  } catch (e: any) {
    throw new Error("Could not create Address at this time");
  }
}
