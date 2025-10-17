import BrandSwiper from "./_components/BrandSwiper";
import CategorySection from "./_components/categry-section/CategorySection";
import Header from "./_components/header/Header";
import MobileNavigations from "./_components/header/MobileNavigations";
import HeroSection from "./_components/hero/HeroSection";
import NewArrivals from "./_components/new-arrivals/NewArrivals";
import Footer from "./_components/reusable/Footer";
import TopSellingSection from "./_components/top-selling/TopSellingSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <BrandSwiper />
      <NewArrivals />
      <TopSellingSection />
      <CategorySection />
      <Footer />
      <MobileNavigations />
    </>
  );
}
