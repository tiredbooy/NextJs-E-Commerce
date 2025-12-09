"use client"
import { CartItem as CartItemType } from "@/app/_lib/types";
import { CartItem } from "./CartItem";
import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";

interface Props {
  items: CartItemType[];
}

// Server Component - fetches data on the server
export function CartItems({ items }: Props) {
  const {syncCart} = useCart()

  useEffect(() => {
    syncCart(items.length)
  }, [items.length, syncCart]);

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border divide-y divide-divider">
        {items.length > 0 &&
          items?.map((item) => <CartItem key={item.id} item={item} />)}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {items.length} item{items.length !== 1 ? "s" : ""} in cart
        </span>
      </div>
    </div>
  );
}
