import { getProducts } from "@/app/_lib/services/services";
import ProductsInformation from "./ProductsInformation";
import ProductsTable from "./ProductsTable";

interface Props {
  // props here
  page?: number
}

export default async function ProductsContent({page = 1}: Props) {
  const productData = await getProducts({limit: 10, page});
  const products = productData.products;
  return (
    <>
      <ProductsInformation totalProducts={productData?.total_items} />
      <ProductsTable products={products} />
    </>
  );
}
