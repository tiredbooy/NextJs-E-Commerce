import { headers } from "next/headers";
import BrandSwiper from "./_components/BrandSwiper";
import Header from "./_components/header/Header";
import HeroSection from "./_components/hero/HeroSection";
import MobileNavigations from "@/app/_components/header/MobileNavigations";
import NewArrivals from "./_components/new-arrivals/NewArrivals";
import TopSellingSection from "./_components/top-selling/TopSellingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandSwiper />
      <NewArrivals />
      <TopSellingSection />
    </>
  );
}
