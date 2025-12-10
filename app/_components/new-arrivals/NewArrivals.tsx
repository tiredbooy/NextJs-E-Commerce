import { getProductsAction } from "@/app/_lib/actions/productsAction";
import { Product } from "@/app/_lib/types/product_types";
import SwiperProducts from "./NewArrivalProducts";
import NewArrivalHeader from "./SectionHeader";

const NewArrivals: React.FC = async ({}) => {
  const productsData = (await getProductsAction({ limit: 15 })) || [];
  const products: Product[] = productsData?.products || []
  return (
    <section className="w-full max-w-screen h-screen bg-background flex flex-col py-8 md:py-20 px-4 md:px-8 items-center">
      <NewArrivalHeader />

      <SwiperProducts products={products} usage="New" />
    </section>
  );
};

export default NewArrivals;
