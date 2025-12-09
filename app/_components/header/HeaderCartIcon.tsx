"use client"
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";

interface Props {
  // props here
}

export default function HeaderCartIcon ({  }: Props) {
    const {cartCount} = useCart()
  return (
    <Link href="/cart" className="relative">
        <FaShoppingBasket className="h-5 w-5 text-muted-foreground hover:text-foreground" />
        {cartCount > 1 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
  );
};
