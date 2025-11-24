"use server";

import { z } from "zod";

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
  meta_description: z.string().max(160).optional(),
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
  console.log("validatedData:", validatedData);

  // Save to database here

  return { success: true, message: "Product created successfully" };
}
