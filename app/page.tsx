import BrandSwiper from "./_components/BrandSwiper";
import CategorySection from "./_components/categry-section/CategorySection";
import HeroSection from "./_components/hero/HeroSection";
import NewArrivals from "./_components/new-arrivals/NewArrivals";
import TopSellingSection from "./_components/top-selling/TopSellingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandSwiper />
      <NewArrivals />
      <TopSellingSection />
      <CategorySection />
    </>
  );
}
