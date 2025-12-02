import Pagination from "@/app/_components/reusable/Pagination";
import { getProducts } from "@/app/_lib/services/productsService";
import ProductsInformation from "./ProductsInformation";
import ProductsTable from "./ProductsTable";

interface Props {
  // props here
  page?: number;
}

export default async function ProductsContent({ page }: Props) {
  const currentPage = page || 1;
  const productData = await getProducts({ limit: 10, page: currentPage });
  const products = productData?.products;
  const totalPages = productData?.total_pages;
  return (
    <>
      <ProductsInformation totalProducts={productData?.total_items} />
      <ProductsTable products={products} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={productData.has_next}
          hasPrev={productData.has_prev}
        />
      )}
    </>
  );
}
