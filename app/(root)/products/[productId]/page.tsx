import ProductDetailLayout from "@/app/_components/products/product-details/ProductDetailLayout";
import { getProductById } from "@/app/_lib/services/productsService";

interface Props {
  // props here
  params: { productId: number };
}

const page: React.FC<Props> = async ({ params }) => {
  const { productId } = await params;

  const product = await getProductById(productId);
  return <ProductDetailLayout product={product} />;
};

export default page;
