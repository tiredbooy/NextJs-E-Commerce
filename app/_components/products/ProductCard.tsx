
import { Image as ImageType, Product } from "@/app/_lib/types/product_types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Props {
  // props here
  product: Product;
  usage?: "New" | "Sale" | "Featured";
}

const ProductCard: React.FC<Props> = ({ product, usage }) => {
  const {id, slug, images, title, description, discount_price, price} = product
  const image: ImageType | undefined = images?.[0] 

  return (
    <Link href={`products/${slug}`}>
      <article
        key={id}
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
            src={image?.url ?? ""}
            alt={image?.name || title}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            // loading={index < 4 ? "eager" : "lazy"}
            quality={85}
            unoptimized={image?.url?.startsWith("http://localhost")}
            className="object-cover rounded-md"
          />
        </div>
        <h2 className="font-semibold text-foreground">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        {discount_price && discount_price > 0 ? (
          <div className="flex flex-row gap-5 items-center">
            <p className="text-price font-semibold text-md">
              ${discount_price}
            </p>
            <span className="text-muted-foreground line-through text-sm">
              ${price}
            </span>
          </div>
        ) : (
          <p className="text-price font-semibold">${price}</p>
        )}

        <button className="bg-primary text-background font-semibold py-2 rounded-md cursor-pointer hover:bg-primary-hover">
          View Details
        </button>
      </article>
    </Link>
  );
};

export default ProductCard;
