import { Image as ImageType, Product } from "@/app/_lib/types/product_types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import ProductOverlayBtns from "./ProductOverlayBtns";

interface Props {
  product: Product;
  usage?: "New" | "Sale" | "Featured";
}

const ProductCard: React.FC<Props> = ({ product, usage }) => {
  const {
    id,
    slug,
    images,
    title,
    description,
    discount_price,
    price,
    is_featured,
    created_at,
  } = product;
  const image: ImageType | undefined = images?.[0];


  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const isOnSale =  discount_price ? true : false

  return (
    <Link href={`products/${id}`}>
      <article
        key={id}
        aria-label={`product ${title}`}
        className="p-4 flex flex-col bg-card group hover:bg-card-hover gap-4 md:p-8 rounded-xl shadow-lg text-white relative overflow-hidden"
      >
        {/* Badges */}
        {usage === "New" || 
          (new Date(created_at) > oneMonthAgo && !is_featured && (
            <Badge className="absolute bg-new-badge top-2 left-2 text-background z-10 font-semibold">
              New
            </Badge>
          ))}
        {usage === "Featured" ||
          (is_featured &&  !isOnSale && (
            <Badge className="absolute top-2 left-2 z-10 bg-featured-badge text-featured-badge-foreground font-semibold">
              Featured
            </Badge>
          ))}
        {usage === "Sale" || isOnSale && (
          <Badge className="absolute top-2 left-2 z-10 bg-sale-badge text-background font-semibold">
            Sale
          </Badge>
        )}

        {/* Image Container with Overlay */}
        <div className="aspect-square h-48 relative rounded-xl overflow-hidden">
          <Image
            fill
            src={image?.url ?? ""}
            alt={image?.name || title}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized={image?.url?.startsWith("http://localhost")}
            className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <ProductOverlayBtns productId={id}/>
          </div>
        </div>

        {/* Product Info */}
        <h2 className="font-semibold text-foreground">{title}</h2>
        <p className="text-muted-foreground line-clamp-2 leading-tight h-10">
          {description}
        </p>

        {/* Pricing */}
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
