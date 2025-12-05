import { serverApi } from "../server_api";
import { QueryParams } from "../types";
import { CreateProductRequest, Image } from "../types/product_types";
import { buildQuery } from "../utils/utils";
import { authenticatedRequest } from "./authService";

const BASE_URL = "http://localhost:8080";

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
  | "colors"
  | "sizes"
>;

// ---- PRODUCTS ----

export async function getProducts(params: ProductQueryParam = {}) {
  try {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const query = buildQuery(params);
    const res = await fetch(`${BASE_URL}/api/products${query}`, {
      next: {
        tags: ["products"],
        revalidate: 300,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return res.json();
  } catch (e: any) {
    throw new Error(e.message || "Could not get Products at this time.");
  }
}

export async function getProductById(id: number) {
  try {
    const res = await serverApi({
      method: "GET",
      url: `/api/products/${id}`,
    });

    return await res?.data;
  } catch (e: any) {
    throw new Error(e.message || "Something went wrong");
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
    throw new Error("Something went worng!", e.message);
  }
}

export async function deleteProductReq(id: number) {
  try {
    const response = await authenticatedRequest({
      method: "DELETE",
      url: `/api/admin/products/${id}`,
    });

    return response;
  } catch (e: any) {
    throw new Error("Something went worng!", e.message);
  }
}

export async function createProductImagesReq(images: Image[]) {
  try {
    const response = await authenticatedRequest({
      url: "/api/admin/images",
      method: "POST",
      data: JSON.stringify({ images }),
    });

    return response;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteProductImageReq(imageId: number) {
  try {
    const response = await authenticatedRequest({
      method: "DELETE",
      url: `/api/admin/images/${imageId}`,
    });

    return response;
  } catch (e: any) {
    throw new Error("Something went worng!", e.message);
  }
}

export async function editProductReq(req: CreateProductRequest, id: number) {
  try {
    const response = await authenticatedRequest({
      method: "PATCH",
      url: `/api/admin/products/${id}`,
      data: req,
    });

    return response;
  } catch (e: any) {
    throw new Error("Something went worng!", e.message);
  }
}

export async function getProductSingleImage(productId: number): Promise<Image> {
  try {
    const response = await serverApi.get(`/api/products/${productId}/image`);
    return response.data
  } catch (e: any) {
    throw new Error("Something went worng!", e.message);
  }
}

// ---- PRODUCTS ----

export async function getCategories() {
  try {
    // const response = await serverApi.get(`/api/categories`);
    const response = await fetch(`${BASE_URL}/api/categories`, {
      next: { tags: ["categories"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    return await response.json();
  } catch (e: any) {
    throw e;
  }
}

export async function createCategoryReq(title: string) {
  try {
    const response = await authenticatedRequest({
      url: "/api/admin/categories",
      method: "POST",
      data: { title },
    });
    if (response.status && (response.status < 200 || response.status >= 300)) {
      throw new Error(
        response.data?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to create category request.");
  }
}

export async function getColors() {
  try {
    const response = await fetch(`${BASE_URL}/api/colors`, {
      next: { tags: ["colors"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch colors: ${response.status}`);
    }

    return await response.json();
  } catch (e: any) {
    console.log("e:", e);
    throw e;
  }
}

export async function createColorReq(title: string, hex: string) {
  try {
    const response = await authenticatedRequest({
      url: "/api/admin/colors",
      method: "POST",
      data: { title, hex },
    });
    if (response.status && (response.status < 200 || response.status >= 300)) {
      throw new Error(
        response.data?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to create color request.");
  }
}

export async function getBrands() {
  try {
    // const response = await serverApi.get(`/api/brands`);

    const response = await fetch(`${BASE_URL}/api/brands`, {
      next: { tags: ["brands"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.status}`);
    }

    return await response.json();
  } catch (e: any) {
    throw e;
  }
}

export async function createBrandReq(title: string) {
  try {
    const response = await authenticatedRequest({
      url: "/api/admin/brands",
      method: "POST",
      data: { title },
    });
    if (response.status && (response.status < 200 || response.status >= 300)) {
      throw new Error(
        response.data?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to create brand request.");
  }
}

export async function getSizes() {
  try {
    // const response = await serverApi.get(`/api/sizes`);
    const response = await fetch(`${BASE_URL}/api/sizes`, {
      next: { tags: ["sizes"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sizes: ${response.status}`);
    }

    return await response.json();
  } catch (e: any) {
    throw e;
  }
}

export async function createSizeReq(size: string) {
  try {
    const response = await authenticatedRequest({
      url: "/api/admin/sizes",
      method: "POST",
      data: { size },
    });

    if (response.status && (response.status < 200 || response.status >= 300)) {
      throw new Error(
        response.data?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return response;
  } catch (e: any) {
    throw new Error(e.message || "Failed to create size request.");
  }
}
