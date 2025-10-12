"use client";
import { Product } from "@/app/_lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

const ProductSlideCards: React.FC<Props> = ({ product }) => {
  return (
    <Link href="">
      <article
        key={product.id}
        className="p-4 flex flex-col bg-card group hover:bg-card-hover gap-4 md:p-8 rounded-xl shadow-lg text-white"
      >
        <div className="aspect-square h-48 relative rounded-xl">
          <Image
            fill
            src={product?.images![0].url}
            alt={product.title as string}
            className="object-cover rounded-md"
          />
        </div>
        <h2 className="font-semibold text-foreground">{product.title}</h2>
        <p className="text-muted-foreground">{product.description}</p>
        {product.discount_price && product.discount_price > 0 ? (
          <div className="flex flex-row gap-5">
            <p className="text-price font-semibold">
              ${product.discount_price}
            </p>
            <span className="text-muted-foreground line-through">
              ${product.price}
            </span>
          </div>
        ) : (
          <p className="text-price font-semibold">${product.price}</p>
        )}

        <button className="bg-primary text-background font-semibold py-2 rounded-md cursor-pointer hover:bg-primary-hover">
          View Details
        </button>
      </article>
    </Link>
  );
};

export default ProductSlideCards;
