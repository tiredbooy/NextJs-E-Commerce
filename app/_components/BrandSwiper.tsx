"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Brand {
  id: number;
  title: string;
}

const brands: Brand[] = [
  { id: 1, title: "Versace" },
  { id: 2, title: "Zara" },
  { id: 3, title: "Gucci" },
  { id: 4, title: "Prada" },
  { id: 5, title: "Calvin Klein" },
  { id: 6, title: "Dolce & Gabbana" },
  { id: 7, title: "Balenciaga" },
];

const BrandSwiper: React.FC = () => {
  const [direction, setDirection] = React.useState<"left" | "right">("left");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === "left" ? "right" : "left"));
    }, 8000); // change direction every 8s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-foreground py-8 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: direction === "right",
        }}
        slidesPerView="auto"
        spaceBetween={40}
        centeredSlides
        allowTouchMove={false}
        className="select-none"
      >
        {[...brands, ...brands].map((brand, index) => (
          <SwiperSlide
            key={index}
            className="!w-auto flex items-center justify-center"
          >
            <span
              className="
                text-background text-4xl md:text-5xl font-serif tracking-widest uppercase 
                transition-all duration-300 hover:opacity-70
              "
            >
              {brand.title}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSwiper;
