"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { Product } from "@/app/_lib/types";

interface ProductOptionsProps {
  product: Product;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const isOutOfStock = product.stock_quantity === 0;

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(value, product.stock_quantity));
    setQuantity(newQuantity);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock_quantity) {
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
    white: "bg-white border-2 border-gray-300",
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
    // TODO: Implement server action or API call
    const cartData = {
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      
    };

    localStorage.setItem("cartBasket", JSON.stringify(cartData));

    console.log("Add to cart:", cartData);
    // await addToCartAction(cartData);
  };

  return (
    <>
      {/* Colors Section */}
      {product.colros.length > 0 && (
        <div className="flex flex-col gap-3 pb-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Color</h3>
            {selectedColor && (
              <span className="text-sm text-gray-600 capitalize">
                {selectedColor}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {product.colros.map((color) => {
              const isSelected = selectedColor === color.title;
              const colorClass =
                colorMap[color.title.toLowerCase()] || "bg-gray-400";

              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.title)}
                  disabled={isOutOfStock}
                  className={`
                    relative w-12 h-12 rounded-full transition-all
                    ${colorClass}
                    ${
                      isSelected
                        ? "ring-2 ring-offset-2 ring-gray-900"
                        : "ring-1 ring-gray-200"
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
                            ? "text-gray-900"
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
      {product.sizes.length > 0 && (
        <div className="flex flex-col gap-3 pb-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Size</h3>
            {selectedSize && (
              <span className="text-sm text-gray-600">{selectedSize}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sizeOption) => {
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
                    ${isSelected ? "" : "hover:bg-gray-100"}
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
          <h3 className="font-semibold text-gray-900">Quantity</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={isOutOfStock || quantity <= 1}
                className="h-12 w-12 rounded-none hover:bg-gray-100"
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
                max={product.stock_quantity}
                className="w-16 h-12 text-center border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-inset disabled:bg-gray-50 disabled:text-gray-500"
                aria-label="Quantity"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                disabled={isOutOfStock || quantity >= product.stock_quantity}
                className="h-12 w-12 rounded-none hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {product.stock_quantity > 0 && (
              <span className="text-sm text-gray-500">
                {product.stock_quantity} available
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={isOutOfStock || (product.sizes.length > 0 && !selectedSize)}
          className="w-full text-base font-semibold h-12"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>

        {product.sizes.length > 0 && !selectedSize && !isOutOfStock && (
          <p className="text-sm text-gray-500 text-center">
            Please select a size
          </p>
        )}
      </div>
    </>
  );
};

export default ProductOptions;
