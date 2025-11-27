"use client"

import { Button } from "@/components/ui/button";
import { FiEye, FiHeart, FiShoppingCart } from "react-icons/fi";

interface Props {
  // props here
}

// const handleAddToFavorites = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // Add to favorites logic here
  //   console.log("Add to favorites:", product.id);
  // };

  // const handleQuickView = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // Quick view logic here
  //   console.log("Quick view:", product.id);
  // };


export default function ProductOverlayBtns({}: Props) {
  return (
    <>
      <Button
        // onClick={handleQuickView}
        className="bg-background/70 backdrop-blur-2xl text-primary p-3 rounded-full hover:bg-progress-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
        aria-label="Quick view"
      >
        <FiEye size={20} />
      </Button>

      <Button
        // onClick={handleAddToCart}
        className="bg-background/70 backdrop-blur-2xl text-success p-3 rounded-full hover:bg-progress-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
        aria-label="Add to cart"
      >
        <FiShoppingCart size={20} />
      </Button>

      <Button
        // onClick={handleAddToFavorites}
        className="bg-background/70 backdrop-blur-2xl text-destructive p-3 rounded-full hover:bg-progress-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150"
        aria-label="Add to favorites"
      >
        <FiHeart size={20} />
      </Button>
    </>
  );
}
