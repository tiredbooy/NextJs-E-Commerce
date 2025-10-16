"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { CartItemType } from "./CartItems";
import QuantitySelector from "./QuantitySelector";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) return;
    setQuantity(newQuantity);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
  };

  const subtotal = item.price * quantity;
  const savings = item.originalPrice
    ? (item.originalPrice - item.price) * quantity
    : 0;

  return (
    <div
      className={`p-6 transition-opacity ${
        isRemoving ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex gap-6 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative w-full sm:w-32 h-48 sm:h-32 bg-muted rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {!item.inStock && (
              <div className="absolute inset-0 bg-modal-overlay flex items-center justify-center">
                <Badge className="bg-stock-out text-destructive-foreground px-3 py-1 rounded text-sm font-semibold shadow-xl">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                {item.name}
              </h3>

              {/* Attributes */}
              {item.attributes && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {Object.entries(item.attributes).map(([key, value]) => (
                    <span key={key} className="text-sm text-muted-foreground">
                      {key}: <span className="text-foreground">{value}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-bold text-price">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice && (
                  <>
                    <span className="text-sm text-price-original line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Actions - Mobile */}
              <div className="flex items-center gap-4 sm:hidden">
                <QuantitySelector
                  quantity={quantity}
                  onChange={handleQuantityChange}
                  disabled={!item.inStock}
                />
                <button
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="text-sm text-destructive hover:text-destructive-hover font-medium transition-colors disabled:opacity-50"
                >
                  <IoMdTrash className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Subtotal - Desktop */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xl font-bold text-foreground">
                ${subtotal.toFixed(2)}
              </span>
              {savings > 0 && (
                <span className="text-sm text-success font-medium">
                  Save ${savings.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden sm:flex items-center gap-4 mt-4">
            <QuantitySelector
              quantity={quantity}
              onChange={handleQuantityChange}
              disabled={!item.inStock}
            />
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-sm text-destructive hover:text-destructive-hover font-medium transition-colors disabled:opacity-50"
            >
              <IoMdTrash className="w-6 h-6" />
            </button>
            {!item.inStock && (
              <span className="text-sm text-stock-out font-medium ml-auto">
                Currently unavailable
              </span>
            )}
          </div>

          {/* Subtotal - Mobile */}
          <div className="flex justify-between items-center mt-4 sm:hidden pt-4 border-t border-divider">
            <span className="text-sm text-muted-foreground">Subtotal:</span>
            <div className="text-right">
              <span className="text-xl font-bold text-foreground">
                ${subtotal.toFixed(2)}
              </span>
              {savings > 0 && (
                <div className="text-sm text-success font-medium">
                  Save ${savings.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
