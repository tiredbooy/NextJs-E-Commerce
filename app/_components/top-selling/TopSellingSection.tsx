"use client";
import { FaFire } from "react-icons/fa";
import SwiperProducts from "../new-arrivals/NewArrivalProducts";
import SectionHeader from "../new-arrivals/SectionHeader";
import { Product } from "@/app/_lib/types/product_types";

interface Props {
  products: Product[];
}

function TopSellingSection({ products }: Props) {
  return (
    <section className="w-full max-w-[100vw] h-screen bg-muted flex flex-col py-8 md:py-20 px-4 md:px-8 items-center">
      <SectionHeader
        badge="Hot Right Now"
        description="The items our customers love most this season."
        header="Top Selling"
        badgeIcon={FaFire}
      />
      <SwiperProducts products={products} usage="Featured" />
    </section>
  );
}

export default TopSellingSection;
