import { Suspense } from "react";
import BrandSwiper from "../_components/BrandSwiper";
import CategorySection from "../_components/categry-section/CategorySection";
import HeroSection from "../_components/hero/HeroSection";
import NewArrivals from "../_components/new-arrivals/NewArrivals";
import SectionHeader from "../_components/new-arrivals/SectionHeader";
import {
  SkeletonGrid
} from "../_components/reusable/SkeletonCard";
import TopSellings from "../_components/top-selling/TopSellings";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandSwiper />
      <Suspense
        fallback={
          <div className="w-full max-w-screen h-screen bg-background flex flex-col py-8 md:py-20 px-4 md:px-8 ">
            <SectionHeader />
            <SkeletonGrid variant="product" count={4} columns={4} />
          </div>
        }
      >
        <NewArrivals />
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full max-w-screen h-screen bg-background flex flex-col py-8 md:py-20 px-4 md:px-8 ">
            <SectionHeader
              badge="Hot Right Now"
              description="The items our customers love most this season."
              header="Top Selling"
            />
            <SkeletonGrid variant="product" count={4} columns={4} />
          </div>
        }
      >
        <TopSellings />
      </Suspense>
      <CategorySection />
    </>
  );
}
