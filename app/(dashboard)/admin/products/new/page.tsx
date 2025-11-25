import ProductForm from "@/app/_components/account/dashboard/admin/products/ProductForm";
import {
  getBrands,
  getCategories,
  getColors,
  getSizes,
} from "@/app/_lib/services/productsService";

interface Props {
  // props here
}

export default async function page({}: Props) {
  const [categories, brands, sizes, colors] = await Promise.all([
    getCategories(),
    getBrands(),
    getSizes(),
    getColors(),
  ]);

  return <ProductForm initialOptions={{ categories, brands, sizes, colors }} />;
}
