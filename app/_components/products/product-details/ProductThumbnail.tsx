"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { ProductImage } from "@/app/_lib/types";

interface Props {
  images: ProductImage[];
  productTitle: string;
}

const ProductThumbnail: React.FC<Props> = ({ images, productTitle }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [direction, setDirection] = useState(0);

  const hasMultipleImages = images.length > 1;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setSelectedIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col gap-4 w-full ">
      {/* Main Image Display */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={selectedIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={hasMultipleImages ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[selectedIndex].url}
              alt={`${productTitle} - Image ${selectedIndex + 1}`}
              fill
              className="object-cover"
              priority={selectedIndex === 0}
              quality={85}
              unoptimized={images[selectedIndex]?.url?.startsWith(
                "http://localhost"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 cursor-pointer hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 cursor-pointer hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>
          </>
        )}

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 z-10 bg-white/90 cursor-pointer hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Toggle zoom"
        >
          <Maximize2 className="w-5 h-5 text-gray-900" />
        </button>

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 z-10 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {hasMultipleImages && (
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`
                relative aspect-square rounded-md overflow-hidden cursor-pointer
                transition-all duration-200
                ${
                  selectedIndex === index
                    ? "ring-3 ring-info"
                    : "ring-1 ring-muted hover:muted-foreground/60"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={`${productTitle} thumbnail ${index + 1}`}
                fill
                className={`
                  object-cover transition-opacity duration-200
                  ${
                    selectedIndex === index
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }
                `}
                quality={85}
                unoptimized={images[selectedIndex]?.url?.startsWith(
                  "http://localhost"
                )}
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].url}
                alt={`${productTitle} - Zoomed view`}
                fill
                className="object-contain"
                quality={85}
                unoptimized={images[selectedIndex]?.url?.startsWith(
                  "http://localhost"
                )}
                sizes="100vw"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 bg-foreground/80 hover:bg-foreground p-3 rounded-full shadow-lg cursor-pointer"
                aria-label="Close zoom"
              >
                <X  className="text-background " />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductThumbnail;
