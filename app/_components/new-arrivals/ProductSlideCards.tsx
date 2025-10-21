"use client";
import { Product } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
  usage?: "New" | "Sale" | "Featured";
}

const ProductSlideCards: React.FC<Props> = ({ product, usage }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <article
        key={product.id}
        className="p-4 flex flex-col bg-card group hover:bg-card-hover gap-4 md:p-8 rounded-xl shadow-lg text-white relative"
      >
        {usage === "New" && (
          <Badge className="absolute bg-new-badge top-2 left-2 text-background z-10 font-semibold">
            New{" "}
          </Badge>
        )}
        {usage === "Featured" && (
          <Badge className="absolute top-2 left-2 z-10 bg-featured-badge text-featured-badge-foreground font-semibold">
            Featured
          </Badge>
        )}
        {usage === "Sale" && (
          <Badge className="absolute top-2 left-2 z-10 bg-sale-badge text-background font-semibold">
            Sale
          </Badge>
        )}
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
          <div className="flex flex-row gap-5 items-center">
            <p className="text-price font-semibold text-md">
              ${product.discount_price}
            </p>
            <span className="text-muted-foreground line-through text-sm">
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
