import { QueryParams } from "../types";
import { CreateProductRequest } from "../types/product_types";
import { buildQuery } from "../utils/utils";
import { authenticatedRequest } from "./authService";

type ProductQueryParam = Pick<
  QueryParams,
  | "limit"
  | "page"
  | "category"
  | "brand"
  | "search"
  | "minPrice"
  | "maxPrice"
  | "sortBy"
  | "sortOrder"
>;

export async function getProducts(params: ProductQueryParam = {}) {
  try {
    const query = buildQuery(params);

    const data = await authenticatedRequest({
      method: "GET",
      url: `/api/products${query}`,
    });

    return data;
  } catch (e: any) {
    throw new Error(e.message || "Could not get Products at this time.");
  }
}

export async function createProductReq(req: CreateProductRequest) {
    try {
        const response = await authenticatedRequest({
            method : "POST",
            url: "/api/admin/products"
        })

        if (!response.ok) throw new Error("Could not Create Product")

        return response

    }
    catch(e: any) {
        throw new Error("Something went worng!", e.message)
    }
}
