import { serverApi } from "../server_api";
import { QueryParams } from "../types";
import { CreateProductRequest, Image } from "../types/product_types";
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
      method: "POST",
      url: "/api/admin/products",
      data: req,
    });

    return response;
  } catch (e: any) {
    console.log("e:", e);
    throw new Error("Something went worng!", e.message);
  }
}

export async function getCategories() {
  try {
    const response = await serverApi.get(`/api/categories`);

    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('response:', response);
    return await response?.data;
  } catch (e: any) {
    console.log("e:", e);
    throw e;
  }
}

export async function getColors() {
  try {
    const response = await serverApi.get(`/api/colors`);

    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.data;
  } catch (e: any) {
    console.log("e:", e);
    throw e;
  }
}

export async function getBrands() {
  try {
    const response = await serverApi.get(`/api/brands`);

    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.data;
  } catch (e: any) {
    console.log("e:", e);
    throw e;
  }
}

export async function getSizes() {
  try {
    const response = await serverApi.get(`/api/sizes`);

    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await await response.data;
  } catch (e: any) {
    console.log("e:", e);
    throw e;
  }
}

export async function createProductImagesReq(images: Image[]) {
  try {
    const response = await authenticatedRequest({
      url : "/api/admin/images",
      method: "POST",
      data : JSON.stringify({ images })
    })

    return response
  }
  catch(e: any) {
    throw new Error(e)
  }  
}