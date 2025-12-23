import { CommandItem } from "@/components/ui/command";
import { FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import { Product } from "@/app/_lib/types/product_types";

interface ProductItemProps {
  product: Product;
  onSelect: () => void;
}

export function ProductItem({ product, onSelect }: ProductItemProps) {
  const hasImage = product.images?.[0]?.url;
  const category = product.categories?.[0];

  return (
    <CommandItem
      value={product.title}
      onSelect={onSelect}
      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-accent"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Product Image */}
        {hasImage ? (
          <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={product.images![0].url}
              alt={product.images![0].name || product.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-md bg-accent flex items-center justify-center flex-shrink-0">
            <FaSearch className="h-4 w-4 text-muted-foreground" />
          </div>
        )}

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{product.title}</p>
          {(category || product.price) && (
            <p className="text-xs text-muted-foreground truncate">
              {category?.title}
              {category && product.price && " • "}
              {product.price && `$${product.price.toFixed(2)}`}
            </p>
          )}
        </div>

        <FaExternalLinkAlt className="h-3 w-3 text-muted-foreground ml-2 flex-shrink-0" />
      </div>
    </CommandItem>
  );
}