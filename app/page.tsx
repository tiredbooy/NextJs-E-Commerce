import { headers } from "next/headers";
import BrandSwiper from "./_components/BrandSwiper";
import Header from "./_components/header/Header";
import HeroSection from "./_components/hero/HeroSection";
import MobileNavigations from "@/app/_components/header/MobileNavigations";
import NewArrivals from "./_components/new-arrivals/NewArrivals";

export default function Home() {
  const userAgent = headers().get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  return (
    <>
      {!isMobile && <Header />}
      <HeroSection />
      <BrandSwiper />
      <NewArrivals />
      <MobileNavigations />
    </>
  );
}
