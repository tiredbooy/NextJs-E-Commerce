"use client";

import {
  addCartItem,
  addProductToFavorites,
} from "@/app/_lib/actions/userActions";
import { CartItemReq } from "@/app/_lib/types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FiEye, FiHeart, FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";

interface Props {
  // props here
  productId: number;
  slug: string;
}

export default function ProductOverlayBtns({ productId, slug }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const cartItem: CartItemReq = {
    product_id: productId,
    quantity: 1,
    size_id: 1,
    color_id: 1,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      try {
        const res = await addCartItem(cartItem);
        if (res.success) {
          toast.success(res.message);
        }
      } catch (e: any) {
        console.log("e.message:", e.message);
      }
    });
  };

  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      try {
        const res = await addProductToFavorites(productId);
        console.log('res:', res);
        if (res.success) {
          toast.success(res.message);
        }
      } catch (e: any) {
        console.log("e.message:", e.message);
      }
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${slug}`);
  };
  return (
    <>
      <Button
        disabled={isPending}
        onClick={handleQuickView}
        className="bg-background/70 backdrop-blur-2xl text-primary p-3 rounded-full hover:bg-progress-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
        aria-label="Quick view"
      >
        {isPending ? <Spinner /> : <FiEye size={20} />}
      </Button>

      <Button
        disabled={isPending}
        onClick={handleAddToCart}
        className="bg-background/70 backdrop-blur-2xl text-success p-3 rounded-full hover:bg-progress-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
        aria-label="Add to cart"
      >
        {isPending ? <Spinner /> : <FiShoppingCart size={20} />}
      </Button>

      <Button
        disabled={isPending}
        onClick={handleAddToFavorites}
        className="bg-background/70 backdrop-blur-2xl text-destructive p-3 rounded-full hover:bg-progress-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150"
        aria-label="Add to favorites"
      >
        {isPending ? <Spinner /> : <FiHeart size={20} />}
      </Button>
    </>
  );
}
