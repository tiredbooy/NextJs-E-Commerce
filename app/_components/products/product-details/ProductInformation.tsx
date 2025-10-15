import { Badge } from "@/components/ui/badge";
import ProductOptions from "./ProductOptions";
import { Product } from "@/app/_lib/types";

interface Props {
  product: Product;
}

// Server Component - ProductInformation
const ProductInformation: React.FC<Props> = ({ product }) => {
  const hasDiscount =
    product.discount_price && product.discount_price < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product?.discount_price ?? 0)) / product.price) * 100
      )
    : 0;

  const isOutOfStock = product.stock_quantity === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 pb-6 border-b">
        {/* Categories */}
        {product.category.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {product.category.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="text-xs">
                {cat.title}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-bold text-3xl lg:text-4xl text-gray-900">
          {product.title}
        </h1>

        {/* Price Section */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">
            $
            {hasDiscount
              ? product.discount_price?.toFixed(2)
              : product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
              <Badge variant="destructive" className="text-sm">
                {discountPercentage}% OFF
              </Badge>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          {isOutOfStock ? (
            <Badge variant="destructive">Out of Stock</Badge>
          ) : product.stock_quantity <= 5 ? (
            <Badge
              variant="outline"
              className="text-orange-600 border-orange-600"
            >
              Only {product.stock_quantity} left in stock
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-green-600 border-green-600"
            >
              In Stock
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Client Component for Interactive Parts */}
      <ProductOptions product={product} />

      {/* Additional Info */}
      {product.sales > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
          <span>{product.sales} sold</span>
        </div>
      )}
    </div>
  );
};

export default ProductInformation;
