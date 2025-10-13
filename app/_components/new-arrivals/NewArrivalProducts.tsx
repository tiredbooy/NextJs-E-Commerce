"use client";
import { Product } from "@/app/_lib/types";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductSlideCards from "./ProductSlideCards";

interface Props {
  products: Product[];
  usage? : string
}

const SwiperProducts: React.FC<Props> = ({ products, usage }) => {
  // Duplicate products multiple times to ensure smooth infinite loop
  const duplicatedProducts = [
    ...products,
    ...products,
    ...products,
    ...products,
  ];

  return (
    <Swiper
      modules={[Autoplay]}
      speed={4000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        reverseDirection: false,
      }}
      slidesPerView="auto"
      spaceBetween={20}
      loop={true}
      loopAdditionalSlides={products.length * 2}
      centeredSlides={false}
      allowTouchMove={true}
      grabCursor={true}
      freeMode={true}
      className="select-none w-full h-fit pb-16 "
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        375: {
          slidesPerView: 1.4,
          spaceBetween: 14,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2.4,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2.6,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.4,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 4.1,
          spaceBetween: 28,
        },
        1536: {
          slidesPerView: 4.8,
          spaceBetween: 32,
        },
      }}
    >
      {duplicatedProducts.map((p, index) => (
        <SwiperSlide
          key={`${p.id || index}-${index}`}
          className="flex justify-center items-center"
        >
          <ProductSlideCards product={p} usage={usage} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperProducts;
