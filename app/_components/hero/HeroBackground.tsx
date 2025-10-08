"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Hero slides data
const heroSlides = [
  {
    id: 1,
    image: "/hero-suits.jpg", // Replace with your actual image paths
    badge: "Premium Collection 2025",
    title: "Elevate Your",
    titleAccent: "Style Statement",
    description:
      "Discover our exquisite collection of handcrafted suits tailored for the modern gentleman",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "/hero-2.jpg", // Add your second image
    badge: "New Arrivals",
    title: "Timeless Elegance",
    titleAccent: "Meets Comfort",
    description:
      "Experience luxury fabrics and impeccable craftsmanship in every stitch",
    cta: "Explore Collection",
  },
  {
    id: 3,
    image: "/hero.jpg", // Add your third image
    badge: "Limited Edition",
    title: "Where Tradition",
    titleAccent: "Meets Innovation",
    description:
      "Bold designs that redefine sophistication for the contemporary wardrobe",
    cta: "View Details",
  },
];

function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-full">
      {/* Swiper Background Images */}
      <Swiper
        modules={[Autoplay, Pagination]}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/50",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="!absolute !inset-0 !w-full !h-full"
        style={{ zIndex: 0 }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
                quality={90}
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Simple Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 z-20">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left space-y-4 sm:space-y-6 md:space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-primary border border-white/20 backdrop-blur-md pointer-events-auto"
              >
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-white/90">
                  {heroSlides[activeIndex].badge}
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight"
              >
                {heroSlides[activeIndex].title}
                <span className="block mt-2 text-gradient-primary bg-gradient-to-r from-white via-primary/80 to-secondary/80 bg-clip-text text-transparent">
                  {heroSlides[activeIndex].titleAccent}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80  mx-auto lg:mx-0 leading-relaxed"
              >
                {heroSlides[activeIndex].description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pointer-events-auto"
              >
                <button className="group relative cursor-pointer px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg glow-primary">
                  <span className="relative z-10">
                    {heroSlides[activeIndex].cta}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button className="px-6 sm:px-8 cursor-pointer py-3 sm:py-4 bg-secondary  border border-white/30 text-primary font-semibold rounded-lg text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:text-secondary">
                  Learn More
                </button>
              </motion.div>

              {/* Social Proof or Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-4 sm:gap-8 justify-center lg:justify-start pt-4 sm:pt-8"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    10K+
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    500+
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
                    Premium Products
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    4.9★
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
                    Average Rating
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs font-medium">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </motion.div>
        </div>
      </motion.div>

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 2rem !important;
          z-index: 30 !important;
        }
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          width: 32px !important;
          border-radius: 6px !important;
        }
        @media (max-width: 640px) {
          .swiper-pagination {
            bottom: 1rem !important;
          }
          .swiper-pagination-bullet {
            width: 8px !important;
            height: 8px !important;
          }
          .swiper-pagination-bullet-active {
            width: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default HeroBackground;
