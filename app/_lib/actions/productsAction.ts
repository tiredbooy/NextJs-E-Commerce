"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import {
  createBrandReq,
  createCategoryReq,
  createColorReq,
  createProductImagesReq,
  createProductReq,
  createSizeReq,
  deleteProductImageReq,
  deleteProductReq,
  editProductReq,
  getProducts,
  getProductSingleImage,
  ProductQueryParam,
} from "../services/productsService";
import { Image } from "../types/product_types";

const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000, "Description too long"),
  category_ids: z.array(z.number()).min(1, "Category is required"),
  color_ids: z.array(z.number()),
  size_ids: z.array(z.number()).min(1, "size is required"),
  brand: z.number().positive(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
  price: z.number().positive("Please enter a valid price"),
  include_tax: z.boolean(),
  stock: z.number().int().nonnegative(),
  meta_description: z.string().max(160),
  meta_tags: z.array(z.string()),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

export async function createProduct(data: unknown) {
  const dataResult = productSchema.safeParse(data);

  if (!dataResult.success) {
    console.log("Validation errors:", dataResult.error);
    return {
      success: false,
      message: dataResult.error.message,
    };
  }

  const validatedData = dataResult.data;

  try {
    const res = await createProductReq(validatedData);
    revalidatePath("/admin/products");
    revalidatePath("/admin/products/new");
    return {
      success: true,
      message: "Product created successfully",
      productId: res?.product?.id,
    };
  } catch (e: any) {
    return { success: false, message: e.message || "Failed to create product" };
  }
}

export async function editProduct(data: unknown, id: number) {
  const dataResult = productSchema.safeParse(data);

  if (!dataResult.success) {
    console.log("Validation errors:", dataResult.error);
    return {
      success: false,
      message: dataResult.error.message,
    };
  }

  const validatedData = dataResult.data;

  try {
    const res = await editProductReq(validatedData, id);
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/edit/${id}`);
    return {
      success: true,
      message: "Product edited successfully",
      productId: res?.product?.id,
    };
  } catch (e: any) {
    return { success: false, message: e.message || "Failed to edit product" };
  }
}

export async function createProductImages(images: Image[]) {
  try {
    const results = await createProductImagesReq(images);

    return { success: true, message: "Image Saved successfully." };
  } catch (e) {
    return { success: false, message: "Failed to save images" };
  }
}

export async function getProductsAction(params: ProductQueryParam = {}) {
  const products = await getProducts(params);
  return products;
}

export async function createBrand(title: string) {
  try {
    const results = await createBrandReq(title);

    if (!results?.brand?.id) {
      console.error(
        "Brand creation succeeded but no brand data was returned:",
        results
      );
      throw new Error("Brand created, but failed to retrieve data.");
    }

    const brand = results.brand;

    revalidatePath("/admin/products/new");
    return brand;
  } catch (e: any) {
    console.error("Error in createBrand action:", e.message);
    throw new Error(e.message || "An unknown error occurred.");
  }
}

export async function createCategory(title: string) {
  try {
    const results = await createCategoryReq(title);

    if (!results?.category?.id) {
      throw new Error("Brand created, but failed to retrieve data.");
    }

    const category = results.category;

    revalidatePath("/admin/products/new");
    // revalidateTag("categories", "default");
    return category;
  } catch (e: any) {
    throw new Error(e.message || "An unknown error occurred.");
  }
}

export async function createSize(size: string) {
  try {
    const results = await createSizeReq(size);

    if (!results?.size?.id) {
      throw new Error("size created, but failed to retrieve data.");
    }

    const sizeResult = results.size;

    revalidatePath("/admin/products/new");
    return sizeResult;
  } catch (e: any) {
    throw new Error(e.message || "An unknown error occurred.");
  }
}

export async function createColor(title: string, hex: string) {
  try {
    const results = await createColorReq(title, hex);

    if (!results?.color?.id) {
      throw new Error("Color created, but failed to retrieve data.");
    }

    const color = results.color;

    revalidatePath("/admin/products/new");
    return color;
  } catch (e: any) {
    throw new Error(e.message || "An unknown error occurred.");
  }
}

export async function deleteProduct(id: number) {
  try {
    const result = await deleteProductReq(id);
    if (!result) throw new Error("something went wrong!");
    console.log("result:", result);

    revalidatePath("/admin/products");
    return result;
  } catch (e: any) {
    throw new Error(e.message || "Could not delete product");
  }
}

export async function deleteProductImage(id: number, productId: number) {
  try {
    const result = await deleteProductImageReq(id);
    if (!result) throw new Error("something went wrong!");
    console.log("result:", result);

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/edit/${productId}`);
    return result;
  } catch (e: any) {
    throw new Error(e.message || "Could not delete image");
  }
}

export async function getProductImage(id: number): Promise<Image> {
  try {
    const result = await getProductSingleImage(id);
    if (!result) throw new Error("Failed to Get the product Image");

    return result;
  } catch (e: any) {
    throw new Error(e.message || "Something went wrong!");
  }
}
