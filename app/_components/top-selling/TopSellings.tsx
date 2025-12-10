import { getProductsAction } from "@/app/_lib/actions/productsAction";
import TopSellingSection from "./TopSellingSection";

interface Props {
  // props here
}

export default async function TopSellings({}: Props) {
  const productsData = await getProductsAction({
    limit: 15,
    isFeatured: "true",
  });
  const products = productsData?.products || [];

  return <TopSellingSection products={products} />;
}
