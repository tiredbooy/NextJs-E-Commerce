"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { Color, Product, Size } from "@/app/_lib/types/product_types";
import Loading from "../../reusable/Loading";
import { Spinner } from "@/components/ui/spinner";
import { CartItemReq } from "@/app/_lib/types";
import { addCartItem } from "@/app/_lib/actions/userActions";
import { toast } from "sonner";

interface ProductOptionsProps {
  product: Product;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ product }) => {
  const [isPending, startTransition] = useTransition();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const isOutOfStock = product.stock === 0;

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(value, product.stock));
    setQuantity(newQuantity);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Color mapping for visual display
  const colorMap: Record<string, string> = {
    black: "bg-black",
    white: "bg-white border-2 border-divider",
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    pink: "bg-pink-500",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
    orange: "bg-orange-500",
  };

  const handleAddToCart = async () => {
    const cartData: CartItemReq = {
      product_id: product.id,
      size_id: Number(selectedSize),
      color_id: Number(selectedColor),
      quantity: quantity,
    };

    startTransition(async () => {
      try {
        const result = await addCartItem(cartData);
        toast.success(result.message);
      } catch (e: any) {
        toast.error(e.message || "Failed to add product to cart");
      }
    });

    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  return (
    <>
      {/* Colors Section */}
      {product?.colors && product?.colors?.length > 0 && (
        <div className="flex flex-col gap-3 pb-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Color</h3>
            {selectedColor && (
              <span className="text-sm text-muted-foreground capitalize">
                {selectedColor}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {product?.colors &&
              product?.colors.map((color: Color) => {
                const isSelected = selectedColor === color.title;
                // const colorClass =
                //   colorMap[color.title.toLowerCase()] || "bg-gray-400";
                // // ${colorClass}
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.title)}
                    disabled={isOutOfStock}
                    style={{ backgroundColor: `#${color?.hex}` }}
                    className={`
                    relative w-12 h-12 rounded-full transition-all
                    
                    ${
                      isSelected
                        ? "ring-2 ring-offset-2 ring-foreground"
                        : "ring-1 ring-muted"
                    }
                    ${
                      isOutOfStock
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:scale-110"
                    }
                  `}
                    aria-label={`Select ${color.title} color`}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check
                          className={`w-6 h-6 ${
                            color.title.toLowerCase() === "white"
                              ? "text-foreground"
                              : "text-white"
                          }`}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Sizes Section */}
      {product?.sizes && product?.sizes.length > 0 && (
        <div className="flex flex-col gap-3 pb-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Size</h3>
            {selectedSize && (
              <span className="text-sm text-muted-foreground">
                {selectedSize}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product?.sizes &&
              product?.sizes.map((sizeOption: Size) => {
                const isSelected = selectedSize === sizeOption.size;

                return (
                  <Button
                    key={sizeOption.id}
                    variant={isSelected ? "default" : "outline"}
                    size="lg"
                    onClick={() => setSelectedSize(sizeOption.size)}
                    disabled={isOutOfStock}
                    className={`
                    min-w-[4rem] font-semibold
                    ${isSelected ? "" : "hover:bg-divider"}
                  `}
                  >
                    {sizeOption.size}
                  </Button>
                );
              })}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart Section */}
      <div className="flex flex-col gap-3">
        {/* Quantity Selector */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-foreground">Quantity</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-divider rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={isOutOfStock || quantity <= 1}
                className="h-12 w-12 rounded-none hover:bg-divider"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                disabled={isOutOfStock}
                min="1"
                max={product.stock}
                className="w-16 h-12 text-center border-x border-divider focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-inset disabled:bg-gray-50 disabled:text-gray-500"
                aria-label="Quantity"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                disabled={isOutOfStock || quantity >= product.stock}
                className="h-12 w-12 rounded-none hover:bg-divider"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-sm  text-muted-foreground">
                Only {product.stock} Lefts
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={
            isPending ||
            isOutOfStock ||
            (product.sizes && product.sizes.length > 0 && !selectedSize)
          }
          className={`w-full text-background font-semibold h-12 ${
            isOutOfStock ? "cursor-not-allowed" : ""
          } ${isPending ? "bg-muted-foreground scale-95 cursor-progress" : ""}`}
        >
          {isPending ? (
            <Spinner className="text-background" />
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </>
          )}
        </Button>

        {product.sizes &&
          product.sizes.length > 0 &&
          !selectedSize &&
          !isOutOfStock && (
            <p className="text-sm text-muted-foreground text-center">
              Please select a size
            </p>
          )}
      </div>
    </>
  );
};

export default ProductOptions;
