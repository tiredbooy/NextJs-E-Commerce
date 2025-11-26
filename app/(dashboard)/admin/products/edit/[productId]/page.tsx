import ProductForm from "@/app/_components/account/dashboard/admin/products/ProductForm";
import {
  getBrands,
  getCategories,
  getColors,
  getProductById,
  getSizes,
} from "@/app/_lib/services/productsService";
import { Category, Color, Size } from "@/app/_lib/types/product_types";

interface Props {
  params: {
    productId: number;
  };
}

export default async function page({ params }: Props) {
  const { productId } = await params;

  const [product, categories, brands, sizes, colors] = await Promise.all([
    getProductById(productId),
    getCategories(),
    getBrands(),
    getSizes(),
    getColors(),
  ]);

  const transformedData = {
    ...product,
    category_ids: product?.categories?.map((cat: Category) => cat.id) || [],
    color_ids: product?.colors?.map((color: Color) => color.id) || [],
    size_ids: product?.sizes?.map((size: Size) => size.id) || [],
  };

  return (
    <ProductForm
      mode="edit"
      initialData={transformedData}
      initialOptions={{ categories, brands, sizes, colors }}
    />
  );
}
